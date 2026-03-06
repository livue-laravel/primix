<?php

use Illuminate\Http\Request;
use Primix\MultiTenant\Models\Domain;
use Primix\MultiTenant\Models\Tenant;
use Primix\MultiTenant\Resolvers\DomainTenantResolver;

it('resolves tenant by domain', function () {
    $tenant = Tenant::create();
    Domain::create(['domain' => 'acme.test', 'tenant_id' => $tenant->id]);

    $resolver = new DomainTenantResolver();
    $request = Request::create('http://acme.test/dashboard');

    $resolved = $resolver->resolve($request);

    expect($resolved)->not->toBeNull();
    expect($resolved->getTenantKey())->toBe($tenant->getTenantKey());
});

it('returns null for unknown domain', function () {
    $resolver = new DomainTenantResolver();
    $request = Request::create('http://unknown.test/dashboard');

    expect($resolver->resolve($request))->toBeNull();
});
