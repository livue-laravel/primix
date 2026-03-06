<?php

namespace Primix\MultiTenant\Contracts;

interface TenancyManagerContract
{
    /**
     * Initialize tenancy for the given tenant.
     */
    public function initialize(TenantContract $tenant): void;

    /**
     * End the current tenancy.
     */
    public function end(): void;

    /**
     * Check if tenancy is currently initialized.
     */
    public function initialized(): bool;

    /**
     * Get the current tenant, or null if not initialized.
     */
    public function tenant(): ?TenantContract;

    /**
     * Run a callback for each of the given tenants.
     */
    public function runForMultiple(iterable $tenants, callable $callback): void;
}
