<?php

namespace Primix\MultiTenant\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Primix\MultiTenant\Contracts\TenantContract;
use Primix\MultiTenant\Contracts\TenantDatabaseManager;
use Primix\MultiTenant\Events\Database\CreatingDatabase;
use Primix\MultiTenant\Events\Database\DatabaseCreated;

class CreateDatabase implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public readonly TenantContract $tenant,
    ) {}

    public function handle(TenantDatabaseManager $manager): void
    {
        CreatingDatabase::dispatch($this->tenant);

        $manager->createDatabase($this->tenant);

        DatabaseCreated::dispatch($this->tenant);
    }
}
