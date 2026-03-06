<?php

use Illuminate\Http\Request;
use Primix\MultiTenant\Models\Tenant;
use Primix\MultiTenant\Resolvers\RequestDataTenantResolver;

it('resolves tenant by header', function () {
    $tenant = Tenant::create();

    $resolver = new RequestDataTenantResolver();
    $request = Request::create('/api/data');
    $request->headers->set('X-Tenant-ID', (string) $tenant->id);

    $resolved = $resolver->resolve($request);

    expect($resolved)->not->toBeNull();
    expect($resolved->getTenantKey())->toBe($tenant->getTenantKey());
});

it('resolves tenant by query parameter', function () {
    $tenant = Tenant::create();

    $resolver = new RequestDataTenantResolver();
    $request = Request::create('/api/data?tenant_id=' . $tenant->id);

    $resolved = $resolver->resolve($request);

    expect($resolved)->not->toBeNull();
    expect($resolved->getTenantKey())->toBe($tenant->getTenantKey());
});

it('prefers header over query parameter', function () {
    $tenant1 = Tenant::create();
    $tenant2 = Tenant::create();

    $resolver = new RequestDataTenantResolver();
    $request = Request::create('/api/data?tenant_id=' . $tenant2->id);
    $request->headers->set('X-Tenant-ID', (string) $tenant1->id);

    $resolved = $resolver->resolve($request);

    expect($resolved->getTenantKey())->toBe($tenant1->getTenantKey());
});

it('returns null when no tenant data provided', function () {
    $resolver = new RequestDataTenantResolver();
    $request = Request::create('/api/data');

    expect($resolver->resolve($request))->toBeNull();
});
