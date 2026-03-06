<?php

namespace Primix\MultiTenant\Events\Tenant;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Primix\MultiTenant\Contracts\TenantContract;

class CreatingTenant
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public readonly TenantContract $tenant,
    ) {}
}
