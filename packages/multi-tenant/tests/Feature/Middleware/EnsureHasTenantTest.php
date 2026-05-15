<?php

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Auth;
use Primix\MultiTenant\Concerns\HasTenantRelationship;
use Primix\MultiTenant\Facades\Tenancy;
use Primix\MultiTenant\Middleware\EnsureHasTenant;
use Primix\MultiTenant\Models\Tenant;
use Primix\Panel;
use Primix\PanelRegistry;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class MultiTenantEnsureHasTenantAuthUser extends Authenticatable
{
    use HasTenantRelationship;

    protected $table = 'users';

    protected $guarded = [];

    public $timestamps = true;
}

beforeEach(function () {
    config(['multi-tenant.tenant_model' => Tenant::class]);

    $registry = new PanelRegistry();
    $registry->register(
        Panel::make('admin')
            ->path('admin')
            ->authGuard('web')
            ->tenant(Tenant::class)
    );

    app()->instance(PanelRegistry::class, $registry);
});

afterEach(function () {
    Tenancy::end();
    Auth::forgetGuards();
});

it('passes through when there is no authenticated user', function () {
    $tenant = Tenant::create([
        'name' => 'Acme',
        'slug' => 'acme',
    ]);

    Tenancy::initialize($tenant);

    $middleware = new EnsureHasTenant();
    $request = makeMultiTenantEnsureHasTenantRequest('admin');

    $response = $middleware->handle($request, fn () => new Response('next'));

    expect($response->getContent())->toBe('next');
});

it('denies access when the authenticated user does not belong to the current tenant', function () {
    $tenant = Tenant::create([
        'name' => 'Acme',
        'slug' => 'acme',
    ]);
    $user = MultiTenantEnsureHasTenantAuthUser::create([
        'name' => 'External User',
        'email' => 'external@example.com',
    ]);

    Auth::guard('web')->setUser($user);
    Tenancy::initialize($tenant);

    $middleware = new EnsureHasTenant();
    $request = makeMultiTenantEnsureHasTenantRequest('admin');

    expect(fn () => $middleware->handle($request, fn () => new Response('next')))
        ->toThrow(function (AccessDeniedHttpException $exception) {
            expect($exception->getMessage())->toBe('You do not have access to this tenant.');
        });
});

it('allows authenticated users that belong to the current tenant', function () {
    $tenant = Tenant::create([
        'name' => 'Acme',
        'slug' => 'acme',
    ]);
    $user = MultiTenantEnsureHasTenantAuthUser::create([
        'name' => 'Member User',
        'email' => 'member@example.com',
    ]);

    $user->tenants()->attach($tenant);

    Auth::guard('web')->setUser($user);
    Tenancy::initialize($tenant);

    $middleware = new EnsureHasTenant();
    $request = makeMultiTenantEnsureHasTenantRequest('admin');

    $response = $middleware->handle($request, fn () => new Response('next'));

    expect($response->getContent())->toBe('next');
});

function makeMultiTenantEnsureHasTenantRequest(string $panelId): Request
{
    $request = Request::create('http://localhost/admin/dashboard');
    $route = new Route('GET', '/admin/dashboard', fn () => null);
    $route->defaults('_panel', $panelId);
    $route->bind($request);

    $request->setRouteResolver(fn () => $route);

    return $request;
}
