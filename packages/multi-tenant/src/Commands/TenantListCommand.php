<?php

namespace Primix\MultiTenant\Commands;

use Illuminate\Console\Command;

class TenantListCommand extends Command
{
    protected $signature = 'tenant:list {--json : Output as JSON}';

    protected $description = 'List all tenants';

    public function handle(): int
    {
        $tenantModel = config('multi-tenant.tenant_model');
        $tenants = $tenantModel::all();

        if ($tenants->isEmpty()) {
            $this->components->info('No tenants found.');

            return self::SUCCESS;
        }

        if ($this->option('json')) {
            $this->line($tenants->toJson(JSON_PRETTY_PRINT));

            return self::SUCCESS;
        }

        $rows = $tenants->map(function ($tenant) {
            return [
                'id' => $tenant->getTenantKey(),
                'created_at' => $tenant->created_at?->toDateTimeString(),
                'domains' => $tenant->domains->pluck('domain')->implode(', '),
            ];
        });

        $this->table(['ID', 'Created At', 'Domains'], $rows);

        return self::SUCCESS;
    }
}
