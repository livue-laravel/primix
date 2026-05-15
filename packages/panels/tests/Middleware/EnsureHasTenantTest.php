<?php

use Illuminate\Auth\GenericUser;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Route;
use Illuminate\Routing\RouteCollection;
use Illuminate\Support\Facades\Auth;
use Primix\Http\Middleware\EnsureHasTenant;
use Primix\MultiTenant\Routing\TenantPanelRouteRegistrar;
use Primix\Panel;
use Primix\PanelRegistry;

class PanelEnsureHasTenantRelationFake
{
    public function __construct(protected bool $exists)
    {
    }

    public function exists(): bool
    {
        return $this->exists;
    }
}

class PanelEnsureHasTenantUserFake extends GenericUser
{
    public function __construct(array $attributes, protected bool $hasTenant)
    {
        parent::__construct($attributes);
    }

    public function tenants(): PanelEnsureHasTenantRelationFake
    {
        return new PanelEnsureHasTenantRelationFake($this->hasTenant);
    }
}

beforeEach(function () {
    app('router')->setRoutes(new RouteCollection());
    app()->instance(PanelRegistry::class, new PanelRegistry());
    session()->start();
});

afterEach(function () {
    Auth::forgetGuards();
    session()->flush();
});

it('passes through when no authenticated user is available', function () {
    registerPanelEnsureHasTenantPanel();

    $middleware = new EnsureHasTenant();
    $request = makePanelEnsureHasTenantRequest('http://localhost/admin/dashboard', 'admin');

    $response = $middleware->handle($request, fn () => new Response('next'));

    expect($response->getContent())->toBe('next');
});

it('redirects authenticated users without tenants to tenant creation', function () {
    registerPanelEnsureHasTenantPanel();

    Auth::guard('web')->setUser(new PanelEnsureHasTenantUserFake([
        'id' => 1,
        'email' => 'no-tenant@example.com',
        'remember_token' => null,
    ], false));

    $middleware = new EnsureHasTenant();
    $request = makePanelEnsureHasTenantRequest('http://localhost/admin/dashboard', 'admin');

    $response = $middleware->handle($request, fn () => new Response('next'));

    expect($response->isRedirect())->toBeTrue()
        ->and($response->headers->get('Location'))->toBe(url('admin/create-tenant'));
});

it('allows authenticated users that already belong to a tenant', function () {
    registerPanelEnsureHasTenantPanel();

    Auth::guard('web')->setUser(new PanelEnsureHasTenantUserFake([
        'id' => 2,
        'email' => 'member@example.com',
        'remember_token' => null,
    ], true));

    $middleware = new EnsureHasTenant();
    $request = makePanelEnsureHasTenantRequest('http://localhost/admin/dashboard', 'admin');

    $response = $middleware->handle($request, fn () => new Response('next'));

    expect($response->getContent())->toBe('next');
});

function registerPanelEnsureHasTenantPanel(): void
{
    $panel = Panel::make('admin')
        ->path('admin')
        ->authGuard('web')
        ->login()
        ->tenant(\Primix\MultiTenant\Models\Tenant::class)
        ->tenantCreation();

    app(PanelRegistry::class)->register($panel);

    (new TenantPanelRouteRegistrar())->registerAuthRoutes($panel);
    app('router')->getRoutes()->refreshNameLookups();
}

function makePanelEnsureHasTenantRequest(string $uri, string $panelId): Request
{
    $request = Request::create($uri);
    $route = new Route('GET', parse_url($uri, PHP_URL_PATH) ?: '/', fn () => null);
    $route->defaults('_panel', $panelId);
    $route->bind($request);

    $request->setRouteResolver(fn () => $route);
    $request->setLaravelSession(app('session.store'));

    return $request;
}
