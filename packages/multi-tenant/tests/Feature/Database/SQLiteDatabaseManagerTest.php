<?php

use Primix\MultiTenant\Database\Managers\SQLiteDatabaseManager;
use Primix\MultiTenant\Models\Tenant;

it('creates sqlite database file', function () {
    $tenant = Tenant::create();
    $manager = new SQLiteDatabaseManager();

    config(['multi-tenant.database.prefix' => 'test_tenant_']);
    config(['multi-tenant.database.suffix' => '']);

    $result = $manager->createDatabase($tenant);

    expect($result)->toBeTrue();
    expect($manager->databaseExists($tenant))->toBeTrue();

    // Cleanup
    $manager->deleteDatabase($tenant);
});

it('deletes sqlite database file', function () {
    $tenant = Tenant::create();
    $manager = new SQLiteDatabaseManager();

    config(['multi-tenant.database.prefix' => 'test_tenant_']);
    config(['multi-tenant.database.suffix' => '']);

    $manager->createDatabase($tenant);
    $result = $manager->deleteDatabase($tenant);

    expect($result)->toBeTrue();
    expect($manager->databaseExists($tenant))->toBeFalse();
});

it('returns false for non-existent database', function () {
    $tenant = Tenant::create();
    $manager = new SQLiteDatabaseManager();

    config(['multi-tenant.database.prefix' => 'test_tenant_']);
    config(['multi-tenant.database.suffix' => '']);

    expect($manager->databaseExists($tenant))->toBeFalse();
});

it('returns connection config with database path', function () {
    $tenant = Tenant::create();
    $manager = new SQLiteDatabaseManager();

    config(['multi-tenant.database.prefix' => 'test_tenant_']);
    config(['multi-tenant.database.suffix' => '']);

    $config = $manager->makeConnectionConfig($tenant);

    expect($config['database'])->toContain('test_tenant_' . $tenant->id . '.sqlite');
});
