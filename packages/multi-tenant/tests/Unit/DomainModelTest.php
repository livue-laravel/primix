<?php

use Primix\MultiTenant\Contracts\DomainContract;
use Primix\MultiTenant\Models\Domain;
use Primix\MultiTenant\Models\Tenant;

it('can be created', function () {
    $tenant = Tenant::create();
    $domain = Domain::create(['domain' => 'acme.test', 'tenant_id' => $tenant->id]);

    expect($domain)->toBeInstanceOf(Domain::class);
    expect($domain->domain)->toBe('acme.test');
});

it('implements DomainContract', function () {
    $tenant = Tenant::create();
    $domain = Domain::create(['domain' => 'acme.test', 'tenant_id' => $tenant->id]);

    expect($domain)->toBeInstanceOf(DomainContract::class);
});

it('belongs to a tenant', function () {
    $tenant = Tenant::create();
    $domain = Domain::create(['domain' => 'acme.test', 'tenant_id' => $tenant->id]);

    expect($domain->tenant)->toBeInstanceOf(Tenant::class);
    expect($domain->tenant->id)->toBe($tenant->id);
});

it('enforces unique domain', function () {
    $tenant = Tenant::create();
    Domain::create(['domain' => 'unique.test', 'tenant_id' => $tenant->id]);

    Domain::create(['domain' => 'unique.test', 'tenant_id' => $tenant->id]);
})->throws(\Illuminate\Database\QueryException::class);
