<?php

namespace Primix\MultiTenant\Contracts;

interface TenantBillingProvider
{
    /**
     * Determine if the tenant has an active subscription.
     *
     * The definition of "active" (trial, grace period, etc.) is the
     * responsibility of the implementation.
     */
    public function hasActiveSubscription(TenantContract $tenant): bool;

    /**
     * Get the URL to redirect the tenant to subscribe.
     *
     * This is used by the middleware when the tenant does NOT have
     * an active subscription (e.g. checkout/pricing page).
     */
    public function getSubscribeUrl(TenantContract $tenant): string;

    /**
     * Get the URL to the billing management portal.
     *
     * Return null if the provider does not have a self-service portal.
     * When non-null, a "Billing" item is automatically added to the tenant menu.
     */
    public function getBillingUrl(TenantContract $tenant): ?string;
}
