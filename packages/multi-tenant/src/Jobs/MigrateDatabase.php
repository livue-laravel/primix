<?php

namespace Primix\MultiTenant\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Artisan;
use Primix\MultiTenant\Contracts\TenantContract;
use Primix\MultiTenant\Database\DatabaseConfig;
use Primix\MultiTenant\Events\Database\DatabaseMigrated;
use Primix\MultiTenant\Events\Database\MigratingDatabase;

class MigrateDatabase implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public readonly TenantContract $tenant,
    ) {}

    public function handle(): void
    {
        MigratingDatabase::dispatch($this->tenant);

        $this->tenant->run(function () {
            Artisan::call('migrate', [
                '--database' => DatabaseConfig::getTenantConnection(),
                '--path' => config('multi-tenant.migration_path'),
                '--realpath' => true,
                '--force' => true,
            ]);
        });

        DatabaseMigrated::dispatch($this->tenant);
    }
}
