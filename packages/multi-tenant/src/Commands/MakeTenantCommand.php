<?php

namespace Primix\MultiTenant\Commands;

use Illuminate\Console\Command;

class MakeTenantCommand extends Command
{
    protected $signature = 'make:tenant
                            {name? : A name or identifier for the tenant}
                            {--domain= : Associate a domain with the tenant}';

    protected $description = 'Create a new tenant';

    public function handle(): int
    {
        $tenantModel = config('multi-tenant.tenant_model');
        $name = $this->argument('name') ?? $this->ask('Enter a name for the tenant');

        $tenant = $tenantModel::create([
            'data' => ['name' => $name],
        ]);

        $this->components->info("Tenant created with ID: {$tenant->getTenantKey()}");

        $domain = $this->option('domain') ?? $this->ask('Domain for this tenant (leave empty to skip)');

        if ($domain) {
            $domainModel = config('multi-tenant.domain_model');
            $domainModel::create([
                'domain' => $domain,
                'tenant_id' => $tenant->getTenantKey(),
            ]);

            $this->components->info("Domain '{$domain}' associated with tenant.");
        }

        return self::SUCCESS;
    }
}
