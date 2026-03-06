<?php

namespace Primix\MultiTenant\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Primix\MultiTenant\Contracts\TenantContract;
use Primix\MultiTenant\Contracts\TenantDatabaseManager;
use Primix\MultiTenant\Events\Database\DatabaseDeleted;
use Primix\MultiTenant\Events\Database\DeletingDatabase;

class DeleteDatabase implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public readonly TenantContract $tenant,
    ) {}

    public function handle(TenantDatabaseManager $manager): void
    {
        DeletingDatabase::dispatch($this->tenant);

        $manager->deleteDatabase($this->tenant);

        DatabaseDeleted::dispatch($this->tenant);
    }
}
