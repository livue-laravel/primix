<?php

use Primix\MultiTenant\Facades\Tenancy;
use Primix\MultiTenant\Models\Tenant;

it('is not initialized by default', function () {
    expect(Tenancy::initialized())->toBeFalse();
    expect(Tenancy::tenant())->toBeNull();
});

it('can initialize tenancy', function () {
    $tenant = Tenant::create();

    Tenancy::initialize($tenant);

    expect(Tenancy::initialized())->toBeTrue();
    expect(Tenancy::tenant()->getTenantKey())->toBe($tenant->getTenantKey());

    Tenancy::end();
});

it('can end tenancy', function () {
    $tenant = Tenant::create();

    Tenancy::initialize($tenant);
    Tenancy::end();

    expect(Tenancy::initialized())->toBeFalse();
    expect(Tenancy::tenant())->toBeNull();
});

it('ends previous tenancy when initializing new one', function () {
    $tenant1 = Tenant::create();
    $tenant2 = Tenant::create();

    Tenancy::initialize($tenant1);
    Tenancy::initialize($tenant2);

    expect(Tenancy::tenant()->getTenantKey())->toBe($tenant2->getTenantKey());

    Tenancy::end();
});

it('can run for multiple tenants', function () {
    $tenant1 = Tenant::create();
    $tenant2 = Tenant::create();

    $visited = [];

    Tenancy::runForMultiple([$tenant1, $tenant2], function ($tenant) use (&$visited) {
        $visited[] = $tenant->getTenantKey();
    });

    expect($visited)->toBe([$tenant1->getTenantKey(), $tenant2->getTenantKey()]);
    expect(Tenancy::initialized())->toBeFalse();
});

it('restores previous tenant after runForMultiple', function () {
    $tenant1 = Tenant::create();
    $tenant2 = Tenant::create();
    $tenant3 = Tenant::create();

    Tenancy::initialize($tenant1);

    Tenancy::runForMultiple([$tenant2, $tenant3], function () {});

    expect(Tenancy::tenant()->getTenantKey())->toBe($tenant1->getTenantKey());

    Tenancy::end();
});

it('does nothing when ending uninitialized tenancy', function () {
    Tenancy::end();

    expect(Tenancy::initialized())->toBeFalse();
});
