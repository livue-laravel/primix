<?php

namespace Primix\MultiTenant\Database\Managers;

use Primix\MultiTenant\Contracts\TenantContract;
use Primix\MultiTenant\Contracts\TenantDatabaseManager;
use Primix\MultiTenant\Database\DatabaseConfig;

class SQLiteDatabaseManager implements TenantDatabaseManager
{
    public function createDatabase(TenantContract $tenant): bool
    {
        $path = $this->getDatabasePath($tenant);

        $directory = dirname($path);
        if (! is_dir($directory)) {
            mkdir($directory, 0755, true);
        }

        if (! file_exists($path)) {
            touch($path);
        }

        return true;
    }

    public function deleteDatabase(TenantContract $tenant): bool
    {
        $path = $this->getDatabasePath($tenant);

        if (file_exists($path)) {
            return unlink($path);
        }

        return true;
    }

    public function databaseExists(TenantContract $tenant): bool
    {
        return file_exists($this->getDatabasePath($tenant));
    }

    public function makeConnectionConfig(TenantContract $tenant): array
    {
        $config = DatabaseConfig::getTenantConnectionConfig($tenant);
        $config['database'] = $this->getDatabasePath($tenant);

        return $config;
    }

    protected function getDatabasePath(TenantContract $tenant): string
    {
        $name = DatabaseConfig::getDatabaseName($tenant);

        return database_path("tenant/{$name}.sqlite");
    }
}
