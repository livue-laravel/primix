<?php

use Illuminate\Http\Request;
use Primix\MultiTenant\Facades\Tenancy;
use Primix\MultiTenant\Middleware\InitializeTenancyByDomain;
use Primix\MultiTenant\Models\Domain;
use Primix\MultiTenant\Models\Tenant;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

it('initializes tenancy for valid domain', function () {
    $tenant = Tenant::create();
    Domain::create(['domain' => 'acme.test', 'tenant_id' => $tenant->id]);

    $middleware = new InitializeTenancyByDomain();
    $request = Request::create('http://acme.test/dashboard');

    $middleware->handle($request, function () use ($tenant) {
        expect(Tenancy::initialized())->toBeTrue();
        expect(Tenancy::tenant()->getTenantKey())->toBe($tenant->getTenantKey());

        return new \Illuminate\Http\Response();
    });
});

it('throws 404 for unknown domain', function () {
    $middleware = new InitializeTenancyByDomain();
    $request = Request::create('http://unknown.test/dashboard');

    $middleware->handle($request, fn () => null);
})->throws(NotFoundHttpException::class);

it('ends tenancy on terminate', function () {
    $tenant = Tenant::create();
    Domain::create(['domain' => 'acme.test', 'tenant_id' => $tenant->id]);

    $middleware = new InitializeTenancyByDomain();
    $request = Request::create('http://acme.test/dashboard');

    $response = $middleware->handle($request, fn () => new \Illuminate\Http\Response());

    $middleware->terminate($request, $response);

    expect(Tenancy::initialized())->toBeFalse();
});
