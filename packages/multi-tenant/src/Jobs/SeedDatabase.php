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
use Primix\MultiTenant\Events\Database\DatabaseSeeded;
use Primix\MultiTenant\Events\Database\SeedingDatabase;

class SeedDatabase implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public readonly TenantContract $tenant,
        public readonly ?string $seederClass = null,
    ) {}

    public function handle(): void
    {
        SeedingDatabase::dispatch($this->tenant);

        $seeder = $this->seederClass ?? config('multi-tenant.seeder');

        $this->tenant->run(function () use ($seeder) {
            Artisan::call('db:seed', [
                '--database' => DatabaseConfig::getTenantConnection(),
                '--class' => $seeder,
                '--force' => true,
            ]);
        });

        DatabaseSeeded::dispatch($this->tenant);
    }
}
