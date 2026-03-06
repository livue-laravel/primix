<?php

use Primix\MultiTenant\Contracts\TenantContract;
use Primix\MultiTenant\Facades\Tenancy;
use Primix\MultiTenant\Models\Tenant;

it('can be created', function () {
    $tenant = Tenant::create();

    expect($tenant)->toBeInstanceOf(Tenant::class);
    expect($tenant->id)->not->toBeNull();
});

it('implements TenantContract', function () {
    $tenant = Tenant::create();

    expect($tenant)->toBeInstanceOf(TenantContract::class);
});

it('returns tenant key', function () {
    $tenant = Tenant::create();

    expect($tenant->getTenantKey())->toBe($tenant->id);
});

it('returns tenant key name', function () {
    $tenant = Tenant::create();

    expect($tenant->getTenantKeyName())->toBe('id');
});

it('stores data in json column', function () {
    $tenant = Tenant::create(['data' => ['name' => 'Acme Corp']]);

    expect($tenant->getInternal('name'))->toBe('Acme Corp');
});

it('can set and get internal attributes', function () {
    $tenant = Tenant::create();
    $tenant->setInternal('plan', 'premium');
    $tenant->save();

    $tenant->refresh();

    expect($tenant->getInternal('plan'))->toBe('premium');
});

it('has domains relationship', function () {
    $tenant = Tenant::create();

    expect($tenant->domains())->toBeInstanceOf(\Illuminate\Database\Eloquent\Relations\HasMany::class);
});

it('runs callback in tenant context', function () {
    $tenant = Tenant::create();

    $result = $tenant->run(function ($t) {
        return Tenancy::initialized();
    });

    expect($result)->toBeTrue();
    expect(Tenancy::initialized())->toBeFalse();
});

it('restores previous tenant after run', function () {
    $tenant1 = Tenant::create();
    $tenant2 = Tenant::create();

    Tenancy::initialize($tenant1);

    $tenant2->run(function () use ($tenant2) {
        expect(Tenancy::tenant()->getTenantKey())->toBe($tenant2->getTenantKey());
    });

    expect(Tenancy::tenant()->getTenantKey())->toBe($tenant1->getTenantKey());

    Tenancy::end();
});
