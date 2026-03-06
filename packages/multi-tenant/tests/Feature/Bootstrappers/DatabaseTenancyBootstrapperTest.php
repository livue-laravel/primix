<?php

use Illuminate\Support\Facades\DB;
use Primix\MultiTenant\Bootstrappers\DatabaseTenancyBootstrapper;
use Primix\MultiTenant\Models\Tenant;

it('switches default connection on bootstrap', function () {
    $tenant = Tenant::create();

    config(['multi-tenant.database.strategy' => 'multi']);
    config(['multi-tenant.database.tenant_connection' => 'tenant']);
    config(['multi-tenant.database.template_connection' => 'testing']);
    config(['multi-tenant.database.prefix' => 'tenant_']);
    config(['multi-tenant.database.suffix' => '']);

    $bootstrapper = new DatabaseTenancyBootstrapper();
    $bootstrapper->bootstrap($tenant);

    expect(DB::getDefaultConnection())->toBe('tenant');

    $bootstrapper->revert();
});

it('restores central connection on revert', function () {
    $tenant = Tenant::create();

    config(['multi-tenant.database.strategy' => 'multi']);
    config(['multi-tenant.database.tenant_connection' => 'tenant']);
    config(['multi-tenant.database.template_connection' => 'testing']);

    $bootstrapper = new DatabaseTenancyBootstrapper();
    $bootstrapper->bootstrap($tenant);
    $bootstrapper->revert();

    expect(DB::getDefaultConnection())->toBe('testing');
});
