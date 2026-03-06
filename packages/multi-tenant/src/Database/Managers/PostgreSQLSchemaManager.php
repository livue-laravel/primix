<?php

namespace Primix\MultiTenant\Database\Managers;

use Illuminate\Support\Facades\DB;
use Primix\MultiTenant\Contracts\TenantContract;
use Primix\MultiTenant\Contracts\TenantDatabaseManager;
use Primix\MultiTenant\Database\DatabaseConfig;

class PostgreSQLSchemaManager implements TenantDatabaseManager
{
    public function createDatabase(TenantContract $tenant): bool
    {
        $schema = DatabaseConfig::getSchemaName($tenant);

        return DB::connection(DatabaseConfig::getCentralConnection())
            ->statement("CREATE SCHEMA IF NOT EXISTS \"{$schema}\"");
    }

    public function deleteDatabase(TenantContract $tenant): bool
    {
        $schema = DatabaseConfig::getSchemaName($tenant);

        return DB::connection(DatabaseConfig::getCentralConnection())
            ->statement("DROP SCHEMA IF EXISTS \"{$schema}\" CASCADE");
    }

    public function databaseExists(TenantContract $tenant): bool
    {
        $schema = DatabaseConfig::getSchemaName($tenant);

        $result = DB::connection(DatabaseConfig::getCentralConnection())
            ->select("SELECT schema_name FROM information_schema.schemata WHERE schema_name = ?", [$schema]);

        return count($result) > 0;
    }

    public function makeConnectionConfig(TenantContract $tenant): array
    {
        $config = DatabaseConfig::getTenantConnectionConfig($tenant);
        $config['search_path'] = DatabaseConfig::getSchemaName($tenant);

        return $config;
    }
}
