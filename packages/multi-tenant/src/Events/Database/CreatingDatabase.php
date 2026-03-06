<?php

namespace Primix\MultiTenant\Events\Database;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Primix\MultiTenant\Contracts\TenantContract;

class CreatingDatabase
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public readonly TenantContract $tenant,
    ) {}
}
