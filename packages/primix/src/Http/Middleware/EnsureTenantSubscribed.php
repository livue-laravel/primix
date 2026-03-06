<?php

namespace Primix\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Primix\PanelRegistry;
use Primix\MultiTenant\Contracts\TenancyManagerContract;

class EnsureTenantSubscribed
{
    public function handle(Request $request, Closure $next): mixed
    {
        $panelId = $request->route('_panel');

        if (! $panelId) {
            return $next($request);
        }

        $panel = app(PanelRegistry::class)->get($panelId);

        if (! $panel || ! $panel->requiresTenantSubscription()) {
            return $next($request);
        }

        if (! app()->bound(TenancyManagerContract::class)) {
            return $next($request);
        }

        $tenancy = app(TenancyManagerContract::class);

        if (! $tenancy->initialized()) {
            return $next($request);
        }

        $billingProvider = $panel->getTenantBillingProvider();

        if (! $billingProvider) {
            return $next($request);
        }

        $tenant = $tenancy->tenant();

        if ($billingProvider->hasActiveSubscription($tenant)) {
            return $next($request);
        }

        return redirect($billingProvider->getSubscribeUrl($tenant));
    }
}
