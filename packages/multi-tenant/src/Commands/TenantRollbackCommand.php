<?php

namespace Primix\MultiTenant\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Primix\MultiTenant\Database\DatabaseConfig;
use Primix\MultiTenant\Facades\Tenancy;

class TenantRollbackCommand extends Command
{
    protected $signature = 'tenant:rollback
                            {--tenant=* : The tenant ID(s) to rollback}
                            {--step=1 : Number of migrations to rollback}
                            {--force : Force the operation in production}
                            {--path= : The path to the migrations files}';

    protected $description = 'Rollback migrations for tenant database(s)';

    public function handle(): int
    {
        $tenants = $this->getTenants();

        if ($tenants->isEmpty()) {
            $this->components->error('No tenants found.');

            return self::FAILURE;
        }

        Tenancy::runForMultiple($tenants, function ($tenant) {
            $this->components->info("Rolling back tenant: {$tenant->getTenantKey()}");

            $path = $this->option('path') ?? config('multi-tenant.migration_path');

            Artisan::call('migrate:rollback', array_filter([
                '--database' => DatabaseConfig::getTenantConnection(),
                '--path' => $path,
                '--realpath' => true,
                '--step' => $this->option('step'),
                '--force' => $this->option('force') ?: null,
            ]), $this->output);
        });

        return self::SUCCESS;
    }

    protected function getTenants()
    {
        $tenantModel = config('multi-tenant.tenant_model');
        $tenantIds = $this->option('tenant');

        if (empty($tenantIds)) {
            return $tenantModel::all();
        }

        return $tenantModel::whereIn(
            (new $tenantModel)->getTenantKeyName(),
            $tenantIds,
        )->get();
    }
}
