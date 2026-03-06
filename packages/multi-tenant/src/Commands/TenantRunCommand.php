<?php

namespace Primix\MultiTenant\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Primix\MultiTenant\Facades\Tenancy;

class TenantRunCommand extends Command
{
    protected $signature = 'tenant:run
                            {command : The artisan command to run}
                            {--tenant=* : The tenant ID(s) to run for}
                            {--argument=* : Arguments to pass to the command}';

    protected $description = 'Run an artisan command for tenant(s)';

    public function handle(): int
    {
        $tenants = $this->getTenants();

        if ($tenants->isEmpty()) {
            $this->components->error('No tenants found.');

            return self::FAILURE;
        }

        $command = $this->argument('command');
        $arguments = $this->parseArguments();

        Tenancy::runForMultiple($tenants, function ($tenant) use ($command, $arguments) {
            $this->components->info("Running '{$command}' for tenant: {$tenant->getTenantKey()}");

            Artisan::call($command, $arguments, $this->output);
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

    protected function parseArguments(): array
    {
        $arguments = [];

        foreach ($this->option('argument') as $argument) {
            if (str_contains($argument, '=')) {
                [$key, $value] = explode('=', $argument, 2);
                $arguments[$key] = $value;
            }
        }

        return $arguments;
    }
}
