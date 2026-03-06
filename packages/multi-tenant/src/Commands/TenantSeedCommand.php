<?php

namespace Primix\MultiTenant\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Primix\MultiTenant\Database\DatabaseConfig;
use Primix\MultiTenant\Facades\Tenancy;

class TenantSeedCommand extends Command
{
    protected $signature = 'tenant:seed
                            {--tenant=* : The tenant ID(s) to seed}
                            {--class= : The seeder class to use}
                            {--force : Force the operation in production}';

    protected $description = 'Seed tenant database(s)';

    public function handle(): int
    {
        $tenants = $this->getTenants();

        if ($tenants->isEmpty()) {
            $this->components->error('No tenants found.');

            return self::FAILURE;
        }

        $seederClass = $this->option('class') ?? config('multi-tenant.seeder');

        Tenancy::runForMultiple($tenants, function ($tenant) use ($seederClass) {
            $this->components->info("Seeding tenant: {$tenant->getTenantKey()}");

            Artisan::call('db:seed', [
                '--database' => DatabaseConfig::getTenantConnection(),
                '--class' => $seederClass,
                '--force' => $this->option('force') ?: true,
            ], $this->output);
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
