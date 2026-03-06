<?php

namespace Primix\MultiTenant\Panel\Concerns;

use Primix\MultiTenant\Facades\Tenancy;

trait HasTenantPanel
{
    /**
     * Get the current tenant for this page.
     */
    public function getTenant(): mixed
    {
        return Tenancy::tenant();
    }

    /**
     * Check if the current panel is tenant-aware.
     */
    public function isTenantAware(): bool
    {
        return Tenancy::initialized();
    }

    /**
     * Get the tenant key for URL generation.
     */
    public function getTenantRouteKey(): string|int|null
    {
        return Tenancy::tenant()?->getTenantKey();
    }
}
