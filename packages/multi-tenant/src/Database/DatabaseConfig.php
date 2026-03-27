<?php

namespace Primix\MultiTenant\Database;

use Primix\MultiTenant\Contracts\TenantContract;

class DatabaseConfig
{
    public static function getDatabaseName(TenantContract $tenant): string
    {
        $prefix = config('multi-tenant.database.prefix', 'tenant_');
        $suffix = config('multi-tenant.database.suffix', '');

        return $prefix . $tenant->getTenantKey() . $suffix;
    }

    public static function getSchemaName(TenantContract $tenant): string
    {
        return static::getDatabaseName($tenant);
    }

    public static function getTenantConnectionConfig(TenantContract $tenant): array
    {
        $templateConnection = config('multi-tenant.database.template_connection', 'tenant');
        $baseConfig = config("database.connections.{$templateConnection}", []);
        $strategy = config('multi-tenant.database.strategy', 'single');

        if ($strategy === 'multi') {
            $baseConfig['database'] = static::getDatabaseName($tenant);
        } elseif ($strategy === 'schema') {
            $baseConfig['search_path'] = static::getSchemaName($tenant);
        }

        return $baseConfig;
    }

    public static function getCentralConnection(): string
    {
        return config('multi-tenant.database.central_connection', config('database.default'));
    }

    public static function getTenantConnection(): string
    {
        $tenantConnection = config('multi-tenant.database.tenant_connection', 'tenant');
        $strategy = config('multi-tenant.database.strategy', 'single');

        if ($strategy !== 'single') {
            return $tenantConnection;
        }

        $connectionConfig = config("database.connections.{$tenantConnection}");

        if (is_array($connectionConfig)) {
            return $tenantConnection;
        }

        return static::getCentralConnection();
    }
}
