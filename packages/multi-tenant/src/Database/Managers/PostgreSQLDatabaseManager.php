<?php

namespace Primix\MultiTenant\Database\Managers;

use Illuminate\Support\Facades\DB;
use Primix\MultiTenant\Contracts\TenantContract;
use Primix\MultiTenant\Contracts\TenantDatabaseManager;
use Primix\MultiTenant\Database\DatabaseConfig;

class PostgreSQLDatabaseManager implements TenantDatabaseManager
{
    public function createDatabase(TenantContract $tenant): bool
    {
        $database = DatabaseConfig::getDatabaseName($tenant);

        return DB::connection(DatabaseConfig::getCentralConnection())
            ->statement("CREATE DATABASE \"{$database}\"");
    }

    public function deleteDatabase(TenantContract $tenant): bool
    {
        $database = DatabaseConfig::getDatabaseName($tenant);

        return DB::connection(DatabaseConfig::getCentralConnection())
            ->statement("DROP DATABASE IF EXISTS \"{$database}\"");
    }

    public function databaseExists(TenantContract $tenant): bool
    {
        $database = DatabaseConfig::getDatabaseName($tenant);

        $result = DB::connection(DatabaseConfig::getCentralConnection())
            ->select("SELECT datname FROM pg_database WHERE datname = ?", [$database]);

        return count($result) > 0;
    }

    public function makeConnectionConfig(TenantContract $tenant): array
    {
        return DatabaseConfig::getTenantConnectionConfig($tenant);
    }
}
