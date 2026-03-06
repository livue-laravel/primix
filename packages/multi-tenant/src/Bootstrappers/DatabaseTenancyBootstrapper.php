<?php

namespace Primix\MultiTenant\Bootstrappers;

use Illuminate\Support\Facades\DB;
use Primix\MultiTenant\Contracts\TenantBootstrapper;
use Primix\MultiTenant\Contracts\TenantContract;
use Primix\MultiTenant\Database\DatabaseConfig;

class DatabaseTenancyBootstrapper implements TenantBootstrapper
{
    protected ?array $originalConfig = null;

    public function bootstrap(TenantContract $tenant): void
    {
        $connectionName = DatabaseConfig::getTenantConnection();
        $this->originalConfig = config("database.connections.{$connectionName}");

        $config = DatabaseConfig::getTenantConnectionConfig($tenant);
        config(["database.connections.{$connectionName}" => $config]);

        DB::purge($connectionName);
        DB::reconnect($connectionName);

        DB::setDefaultConnection($connectionName);
    }

    public function revert(): void
    {
        $connectionName = DatabaseConfig::getTenantConnection();

        if ($this->originalConfig !== null) {
            config(["database.connections.{$connectionName}" => $this->originalConfig]);
        }

        DB::purge($connectionName);

        $centralConnection = DatabaseConfig::getCentralConnection();
        DB::setDefaultConnection($centralConnection);

        $this->originalConfig = null;
    }
}
