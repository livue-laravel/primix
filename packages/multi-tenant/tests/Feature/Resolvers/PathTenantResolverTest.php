<?php

use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Primix\MultiTenant\Models\Tenant;
use Primix\MultiTenant\Resolvers\PathTenantResolver;

it('resolves tenant by route parameter', function () {
    $tenant = Tenant::create();

    $resolver = new PathTenantResolver();

    $request = Request::create('/' . $tenant->id . '/admin/dashboard');
    $route = new Route('GET', '/{tenant}/admin/dashboard', fn () => null);
    $route->bind($request);
    $request->setRouteResolver(fn () => $route);

    $resolved = $resolver->resolve($request);

    expect($resolved)->not->toBeNull();
    expect($resolved->getTenantKey())->toBe($tenant->getTenantKey());
});

it('returns null when route parameter is missing', function () {
    $resolver = new PathTenantResolver();

    $request = Request::create('/admin/dashboard');
    $route = new Route('GET', '/admin/dashboard', fn () => null);
    $route->bind($request);
    $request->setRouteResolver(fn () => $route);

    expect($resolver->resolve($request))->toBeNull();
});

it('returns null for non-existent tenant', function () {
    $resolver = new PathTenantResolver();

    $request = Request::create('/999/admin/dashboard');
    $route = new Route('GET', '/{tenant}/admin/dashboard', fn () => null);
    $route->bind($request);
    $request->setRouteResolver(fn () => $route);

    expect($resolver->resolve($request))->toBeNull();
});
