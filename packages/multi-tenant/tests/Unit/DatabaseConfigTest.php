<?php

use Primix\MultiTenant\Database\DatabaseConfig;
use Primix\MultiTenant\Models\Tenant;

it('generates database name with prefix and suffix', function () {
    config(['multi-tenant.database.prefix' => 'tenant_']);
    config(['multi-tenant.database.suffix' => '_db']);

    $tenant = Tenant::create();

    expect(DatabaseConfig::getDatabaseName($tenant))->toBe('tenant_' . $tenant->id . '_db');
});

it('generates schema name same as database name', function () {
    config(['multi-tenant.database.prefix' => 'schema_']);
    config(['multi-tenant.database.suffix' => '']);

    $tenant = Tenant::create();

    expect(DatabaseConfig::getSchemaName($tenant))->toBe('schema_' . $tenant->id);
});

it('returns central connection name', function () {
    config(['multi-tenant.database.central_connection' => 'testing']);

    expect(DatabaseConfig::getCentralConnection())->toBe('testing');
});

it('returns tenant connection name', function () {
    config(['multi-tenant.database.tenant_connection' => 'tenant']);

    expect(DatabaseConfig::getTenantConnection())->toBe('tenant');
});

it('falls back to central connection in single strategy when tenant connection is missing', function () {
    config(['multi-tenant.database.strategy' => 'single']);
    config(['multi-tenant.database.central_connection' => 'testing']);
    config(['multi-tenant.database.tenant_connection' => 'tenant_missing']);

    expect(DatabaseConfig::getTenantConnection())->toBe('testing');
});

it('builds multi-db config with database name', function () {
    config(['multi-tenant.database.strategy' => 'multi']);
    config(['multi-tenant.database.template_connection' => 'testing']);
    config(['multi-tenant.database.prefix' => 'tenant_']);
    config(['multi-tenant.database.suffix' => '']);

    $tenant = Tenant::create();
    $config = DatabaseConfig::getTenantConnectionConfig($tenant);

    expect($config['database'])->toBe('tenant_' . $tenant->id);
});

it('builds schema config with search_path', function () {
    config(['multi-tenant.database.strategy' => 'schema']);
    config(['multi-tenant.database.template_connection' => 'testing']);
    config(['multi-tenant.database.prefix' => 'tenant_']);
    config(['multi-tenant.database.suffix' => '']);

    $tenant = Tenant::create();
    $config = DatabaseConfig::getTenantConnectionConfig($tenant);

    expect($config['search_path'])->toBe('tenant_' . $tenant->id);
});

it('does not modify config for single-db strategy', function () {
    config(['multi-tenant.database.strategy' => 'single']);
    config(['multi-tenant.database.template_connection' => 'testing']);

    $tenant = Tenant::create();
    $baseConfig = config('database.connections.testing');
    $config = DatabaseConfig::getTenantConnectionConfig($tenant);

    expect($config)->toBe($baseConfig);
});
