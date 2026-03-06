<?php

use Illuminate\Http\Request;
use Primix\MultiTenant\Models\Domain;
use Primix\MultiTenant\Models\Tenant;
use Primix\MultiTenant\Resolvers\SubdomainTenantResolver;

it('resolves tenant by subdomain', function () {
    config(['multi-tenant.central_domains' => ['example.com']]);

    $tenant = Tenant::create();
    Domain::create(['domain' => 'acme', 'tenant_id' => $tenant->id]);

    $resolver = new SubdomainTenantResolver();
    $request = Request::create('http://acme.example.com/dashboard');

    $resolved = $resolver->resolve($request);

    expect($resolved)->not->toBeNull();
    expect($resolved->getTenantKey())->toBe($tenant->getTenantKey());
});

it('returns null for central domain without subdomain', function () {
    config(['multi-tenant.central_domains' => ['example.com']]);

    $resolver = new SubdomainTenantResolver();
    $request = Request::create('http://example.com/dashboard');

    expect($resolver->resolve($request))->toBeNull();
});

it('returns null when host does not match any central domain', function () {
    config(['multi-tenant.central_domains' => ['example.com']]);

    $resolver = new SubdomainTenantResolver();
    $request = Request::create('http://other.net/dashboard');

    expect($resolver->resolve($request))->toBeNull();
});

it('returns null for unknown subdomain', function () {
    config(['multi-tenant.central_domains' => ['example.com']]);

    $resolver = new SubdomainTenantResolver();
    $request = Request::create('http://unknown.example.com/dashboard');

    expect($resolver->resolve($request))->toBeNull();
});
