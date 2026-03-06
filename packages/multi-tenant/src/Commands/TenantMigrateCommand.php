<?php

namespace Primix\MultiTenant\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Primix\MultiTenant\Database\DatabaseConfig;
use Primix\MultiTenant\Facades\Tenancy;

class TenantMigrateCommand extends Command
{
    protected $signature = 'tenant:migrate
                            {--tenant=* : The tenant ID(s) to migrate}
                            {--seed : Seed the database after migration}
                            {--force : Force the operation in production}
                            {--path= : The path to the migrations files}
                            {--step : Force the migrations to run one step at a time}';

    protected $description = 'Run migrations for tenant database(s)';

    public function handle(): int
    {
        $tenants = $this->getTenants();

        if ($tenants->isEmpty()) {
            $this->components->error('No tenants found.');

            return self::FAILURE;
        }

        Tenancy::runForMultiple($tenants, function ($tenant) {
            $this->components->info("Migrating tenant: {$tenant->getTenantKey()}");

            $path = $this->option('path') ?? config('multi-tenant.migration_path');

            Artisan::call('migrate', array_filter([
                '--database' => DatabaseConfig::getTenantConnection(),
                '--path' => $path,
                '--realpath' => true,
                '--force' => $this->option('force') ?: null,
                '--step' => $this->option('step') ?: null,
            ]), $this->output);

            if ($this->option('seed')) {
                Artisan::call('db:seed', [
                    '--database' => DatabaseConfig::getTenantConnection(),
                    '--class' => config('multi-tenant.seeder'),
                    '--force' => true,
                ], $this->output);
            }
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
