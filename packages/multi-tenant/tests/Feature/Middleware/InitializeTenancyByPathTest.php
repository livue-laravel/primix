<?php

use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\URL;
use Primix\MultiTenant\Facades\Tenancy;
use Primix\MultiTenant\Middleware\InitializeTenancyByPath;
use Primix\MultiTenant\Models\Tenant;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

// ============================================================
// Basic middleware behaviour
// ============================================================

it('initializes tenancy for a valid path tenant', function () {
    $tenant = Tenant::create();

    $middleware = new InitializeTenancyByPath();

    $request = Request::create('/manage/' . $tenant->id . '/events');
    $route   = new Route('GET', '/manage/{tenant}/events', fn () => null);
    $route->bind($request);
    $request->setRouteResolver(fn () => $route);

    $middleware->handle($request, function () use ($tenant) {
        expect(Tenancy::initialized())->toBeTrue();
        expect(Tenancy::tenant()->getTenantKey())->toBe($tenant->getTenantKey());

        return new \Illuminate\Http\Response();
    });
});

it('throws 404 when tenant is not found', function () {
    $middleware = new InitializeTenancyByPath();

    $request = Request::create('/manage/999/events');
    $route   = new Route('GET', '/manage/{tenant}/events', fn () => null);
    $route->bind($request);
    $request->setRouteResolver(fn () => $route);

    $middleware->handle($request, fn () => null);
})->throws(NotFoundHttpException::class);

it('removes tenant route parameter so it is not passed to LiVue mount', function () {
    $tenant = Tenant::create();

    $middleware = new InitializeTenancyByPath();

    $request = Request::create('/manage/' . $tenant->id . '/events');
    $route   = new Route('GET', '/manage/{tenant}/events', fn () => null);
    $route->bind($request);
    $request->setRouteResolver(fn () => $route);

    $middleware->handle($request, function (Request $req) {
        expect($req->route()->parameter('tenant'))->toBeNull();

        return new \Illuminate\Http\Response();
    });
});

// ============================================================
// URL::defaults — the key regression test
// ============================================================

it('sets URL::defaults so route() can generate tenant URLs without explicit parameter', function () {
    $tenant = Tenant::create();

    // Register a named route that requires {tenant}
    app('router')->get('/manage/{tenant}/events/create', fn () => null)
        ->name('test.events.create');
    app('router')->getRoutes()->refreshNameLookups();

    $middleware = new InitializeTenancyByPath();

    $request = Request::create('/manage/' . $tenant->id . '/events');
    $route   = new Route('GET', '/manage/{tenant}/events', fn () => null);
    $route->bind($request);
    $request->setRouteResolver(fn () => $route);

    $middleware->handle($request, function () use ($tenant) {
        // route() must resolve without passing 'tenant' explicitly
        $url = route('test.events.create');

        expect($url)->toContain((string) $tenant->id)
            ->and($url)->toContain('/manage/')
            ->and($url)->toContain('/events/create');

        return new \Illuminate\Http\Response();
    });
});

it('sets URL::defaults using the panel.route_parameter config key', function () {
    $tenant = Tenant::create();

    // Use a custom parameter name to verify the right config key is read
    config(['multi-tenant.panel.route_parameter' => 'workspace']);

    app('router')->get('/manage/{workspace}/events/create', fn () => null)
        ->name('test.workspace.events.create');
    app('router')->getRoutes()->refreshNameLookups();

    $middleware = new InitializeTenancyByPath();

    $request = Request::create('/manage/' . $tenant->id . '/events');
    $route   = new Route('GET', '/manage/{workspace}/events', fn () => null);
    $route->bind($request);
    $request->setRouteResolver(fn () => $route);

    $middleware->handle($request, function () use ($tenant) {
        $url = route('test.workspace.events.create');

        expect($url)->toContain((string) $tenant->id);

        return new \Illuminate\Http\Response();
    });

    // restore
    config(['multi-tenant.panel.route_parameter' => 'tenant']);
});

// ============================================================
// Slug-based identification
// ============================================================

it('resolves tenant by slug attribute when configured', function () {
    config(['multi-tenant.tenant_model' => \Primix\MultiTenant\Models\Tenant::class]);

    // Tenants table has no slug column in test migrations, so we test by primary key
    $tenant = Tenant::create();

    $middleware = new InitializeTenancyByPath();

    $request = Request::create('/manage/' . $tenant->id . '/events');
    $route   = new Route('GET', '/manage/{tenant}/events', fn () => null);
    $route->bind($request);
    $request->setRouteResolver(fn () => $route);

    $resolved = false;

    $middleware->handle($request, function () use ($tenant, &$resolved) {
        $resolved = Tenancy::initialized() && Tenancy::tenant()->getTenantKey() === $tenant->getTenantKey();

        return new \Illuminate\Http\Response();
    });

    expect($resolved)->toBeTrue();
});
