<?php

namespace Primix\Concerns;

use Primix\MultiTenant\Contracts\TenantBillingProvider;

trait HasTenantBilling
{
    protected ?TenantBillingProvider $tenantBillingProvider = null;

    protected bool $requireTenantSubscription = true;

    public function tenantBillingProvider(?TenantBillingProvider $provider): static
    {
        $this->tenantBillingProvider = $provider;

        return $this;
    }

    public function getTenantBillingProvider(): ?TenantBillingProvider
    {
        return $this->tenantBillingProvider;
    }

    public function hasTenantBilling(): bool
    {
        return $this->tenantBillingProvider !== null;
    }

    public function requireTenantSubscription(bool $condition = true): static
    {
        $this->requireTenantSubscription = $condition;

        return $this;
    }

    public function requiresTenantSubscription(): bool
    {
        return $this->hasTenantBilling() && $this->requireTenantSubscription;
    }
}
