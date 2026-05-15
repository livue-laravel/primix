<?php

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Routing\RouteCollection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Primix\Http\Middleware\Authenticate;
use Primix\MultiTenant\Concerns\HasTenantRelationship;
use Primix\MultiTenant\Middleware\EnsureHasTenant as TenantAccessMiddleware;
use Primix\MultiTenant\Middleware\InitializeTenancyByPath;
use Primix\MultiTenant\Models\Tenant;
use Primix\MultiTenant\Routing\TenantPanelRouteRegistrar;
use Primix\Panel;

class TenantPanelRouteRegistrarAuthUser extends Authenticatable
{
    use HasTenantRelationship;

    protected $table = 'users';

    protected $guarded = [];

    public $timestamps = true;
}

class TenantPanelRouteRegistrarDummyPage
{
    public static function getRouteUri(): string
    {
        return 'dashboard';
    }

    public static function getSlug(): string
    {
        return 'dashboard';
    }
}

beforeEach(function () {
    app('router')->setRoutes(new RouteCollection());
    config(['multi-tenant.tenant_model' => Tenant::class]);
});

afterEach(function () {
    Auth::guard('web')->logout();
});

it('redirects guests from the central landing route to the panel login page', function () {
    $panel = makeTenantAuthPanel();

    (new TenantPanelRouteRegistrar())->registerAuthRoutes($panel);
    app('router')->getRoutes()->refreshNameLookups();

    $response = $this->get('/admin');

    $response->assertRedirect(url('admin/login'));
});

it('redirects authenticated users to their first tenant from the central landing route', function () {
    $panel = makeTenantAuthPanel();
    $user = TenantPanelRouteRegistrarAuthUser::create([
        'name' => 'Claudio',
        'email' => 'claudio@example.com',
    ]);
    $tenant = Tenant::create([
        'name' => 'Acme',
        'slug' => 'acme',
    ]);

    $user->tenants()->attach($tenant);

    (new TenantPanelRouteRegistrar())->registerAuthRoutes($panel);
    app('router')->getRoutes()->refreshNameLookups();

    $response = $this->actingAs($user, 'web')->get('/admin');

    $response->assertRedirect(url($tenant->getKey() . '/admin'));
});

it('redirects authenticated users without tenants to the tenant creation page', function () {
    $panel = makeTenantAuthPanel()->tenantCreation();
    $user = TenantPanelRouteRegistrarAuthUser::create([
        'name' => 'No Tenant',
        'email' => 'no-tenant@example.com',
    ]);

    (new TenantPanelRouteRegistrar())->registerAuthRoutes($panel);
    app('router')->getRoutes()->refreshNameLookups();

    $response = $this->actingAs($user, 'web')->get('/admin');

    $response->assertRedirect(url('admin/create-tenant'));
});

it('registers tenant-scoped login routes without authenticate middleware', function () {
    $panel = makeTenantAuthPanel();

    (new TenantPanelRouteRegistrar())->registerAuthRoutes($panel);
    app('router')->getRoutes()->refreshNameLookups();

    $loginRoute = collect(Route::getRoutes()->getRoutes())
        ->first(fn ($route) => $route->uri() === '{tenant}/admin/login' && in_array('GET', $route->methods(), true));

    expect($loginRoute)->not->toBeNull()
        ->and($loginRoute->gatherMiddleware())->toContain('web', InitializeTenancyByPath::class)
        ->and($loginRoute->gatherMiddleware())->not->toContain(Authenticate::class);
});

it('registers path-based panel routes with tenancy before authentication', function () {
    $panel = makeTenantAuthPanel()
        ->pages([TenantPanelRouteRegistrarDummyPage::class]);

    (new TenantPanelRouteRegistrar())->registerPanelRoutes($panel);
    app('router')->getRoutes()->refreshNameLookups();

    $pageRoute = collect(Route::getRoutes()->getRoutes())
        ->first(fn ($route) => $route->uri() === '{tenant}/admin/dashboard' && in_array('GET', $route->methods(), true));

    expect($pageRoute)->not->toBeNull();

    $middleware = array_values($pageRoute->gatherMiddleware());

    expect(array_search(InitializeTenancyByPath::class, $middleware, true))
        ->toBeLessThan(array_search(Authenticate::class, $middleware, true))
        ->and(array_search(TenantAccessMiddleware::class, $middleware, true))
        ->toBeGreaterThan(array_search(Authenticate::class, $middleware, true));
});

function makeTenantAuthPanel(): Panel
{
    return Panel::make('admin')
        ->path('admin')
        ->authGuard('web')
        ->login()
        ->tenant(Tenant::class)
        ->tenantIdentification('path');
}
