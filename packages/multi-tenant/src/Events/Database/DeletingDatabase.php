<?php

namespace Primix\MultiTenant\Events\Database;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Primix\MultiTenant\Contracts\TenantContract;

class DeletingDatabase
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public readonly TenantContract $tenant,
    ) {}
}
