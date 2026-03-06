<?php

use Illuminate\Support\Facades\Event;
use Primix\MultiTenant\Events\Tenancy\EndingTenancy;
use Primix\MultiTenant\Events\Tenancy\InitializingTenancy;
use Primix\MultiTenant\Events\Tenancy\TenancyBootstrapped;
use Primix\MultiTenant\Events\Tenancy\TenancyEnded;
use Primix\MultiTenant\Events\Tenancy\TenancyInitialized;
use Primix\MultiTenant\Events\Tenant\CreatingTenant;
use Primix\MultiTenant\Events\Tenant\TenantCreated;
use Primix\MultiTenant\Facades\Tenancy;
use Primix\MultiTenant\Models\Tenant;

it('dispatches tenancy lifecycle events on initialize', function () {
    Event::fake([
        InitializingTenancy::class,
        TenancyInitialized::class,
        TenancyBootstrapped::class,
    ]);

    $tenant = Tenant::create();
    Tenancy::initialize($tenant);

    Event::assertDispatched(InitializingTenancy::class);
    Event::assertDispatched(TenancyInitialized::class);
    Event::assertDispatched(TenancyBootstrapped::class);

    Tenancy::end();
});

it('dispatches tenancy lifecycle events on end', function () {
    $tenant = Tenant::create();
    Tenancy::initialize($tenant);

    Event::fake([EndingTenancy::class, TenancyEnded::class]);

    Tenancy::end();

    Event::assertDispatched(EndingTenancy::class);
    Event::assertDispatched(TenancyEnded::class);
});

it('dispatches model events on tenant create', function () {
    Event::fake([CreatingTenant::class, TenantCreated::class]);

    Tenant::create();

    Event::assertDispatched(CreatingTenant::class);
    Event::assertDispatched(TenantCreated::class);
});

it('event carries tenant reference', function () {
    Event::fake([TenancyInitialized::class]);

    $tenant = Tenant::create();
    Tenancy::initialize($tenant);

    Event::assertDispatched(TenancyInitialized::class, function ($event) use ($tenant) {
        return $event->tenant->getTenantKey() === $tenant->getTenantKey();
    });

    Tenancy::end();
});
