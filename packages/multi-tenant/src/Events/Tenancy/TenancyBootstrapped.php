<?php

namespace Primix\MultiTenant\Events\Tenancy;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Primix\MultiTenant\Contracts\TenantContract;

class TenancyBootstrapped
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public readonly TenantContract $tenant,
    ) {}
}
