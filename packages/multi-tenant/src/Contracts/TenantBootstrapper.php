<?php

namespace Primix\MultiTenant\Contracts;

interface TenantBootstrapper
{
    /**
     * Bootstrap the environment for the given tenant.
     */
    public function bootstrap(TenantContract $tenant): void;

    /**
     * Revert the environment back to the central context.
     */
    public function revert(): void;
}
