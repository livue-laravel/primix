<?php

use Primix\MultiTenant\Bootstrappers\CacheTenancyBootstrapper;
use Primix\MultiTenant\Models\Tenant;

it('prefixes cache with tenant key on bootstrap', function () {
    $originalPrefix = config('cache.prefix');
    $tenant = Tenant::create();

    $bootstrapper = new CacheTenancyBootstrapper();
    $bootstrapper->bootstrap($tenant);

    expect(config('cache.prefix'))->toBe($originalPrefix . '_tenant_' . $tenant->getTenantKey());

    $bootstrapper->revert();
});

it('restores original cache prefix on revert', function () {
    $originalPrefix = config('cache.prefix');
    $tenant = Tenant::create();

    $bootstrapper = new CacheTenancyBootstrapper();
    $bootstrapper->bootstrap($tenant);
    $bootstrapper->revert();

    expect(config('cache.prefix'))->toBe($originalPrefix);
});
