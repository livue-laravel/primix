<?php

namespace Primix\MultiTenant\Database\Managers;

use Illuminate\Support\Facades\DB;
use Primix\MultiTenant\Contracts\TenantContract;
use Primix\MultiTenant\Contracts\TenantDatabaseManager;
use Primix\MultiTenant\Database\DatabaseConfig;

class MySQLDatabaseManager implements TenantDatabaseManager
{
    public function createDatabase(TenantContract $tenant): bool
    {
        $database = DatabaseConfig::getDatabaseName($tenant);
        $charset = config('database.connections.mysql.charset', 'utf8mb4');
        $collation = config('database.connections.mysql.collation', 'utf8mb4_unicode_ci');

        return DB::connection(DatabaseConfig::getCentralConnection())
            ->statement("CREATE DATABASE IF NOT EXISTS `{$database}` CHARACTER SET {$charset} COLLATE {$collation}");
    }

    public function deleteDatabase(TenantContract $tenant): bool
    {
        $database = DatabaseConfig::getDatabaseName($tenant);

        return DB::connection(DatabaseConfig::getCentralConnection())
            ->statement("DROP DATABASE IF EXISTS `{$database}`");
    }

    public function databaseExists(TenantContract $tenant): bool
    {
        $database = DatabaseConfig::getDatabaseName($tenant);

        $result = DB::connection(DatabaseConfig::getCentralConnection())
            ->select("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?", [$database]);

        return count($result) > 0;
    }

    public function makeConnectionConfig(TenantContract $tenant): array
    {
        return DatabaseConfig::getTenantConnectionConfig($tenant);
    }
}
