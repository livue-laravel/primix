<?php

namespace Primix\MultiTenant\Middleware;

use Closure;
use Illuminate\Http\Request;
use Primix\MultiTenant\Contracts\TenancyManagerContract;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class EnsureHasTenant
{
    public function handle(Request $request, Closure $next): Response
    {
        $tenancy = app(TenancyManagerContract::class);

        if (! $tenancy->initialized()) {
            return $next($request);
        }

        $user = $this->resolveUser($request);

        // If no user or the user model doesn't support tenants, skip the check
        if (! $user || ! method_exists($user, 'tenants')) {
            return $next($request);
        }

        $tenant = $tenancy->tenant();

        $belongs = $user->tenants()
            ->where($tenant->getTable() . '.' . $tenant->getTenantKeyName(), $tenant->getTenantKey())
            ->exists();

        if (! $belongs) {
            throw new AccessDeniedHttpException('You do not have access to this tenant.');
        }

        return $next($request);
    }

    protected function resolveUser(Request $request): mixed
    {
        $panelId = $request->route()->defaults['_panel'] ?? null;

        if ($panelId && class_exists(\Primix\PanelRegistry::class)) {
            $panel = app(\Primix\PanelRegistry::class)->get($panelId);

            if ($panel) {
                return auth()->guard($panel->getAuthGuard())->user();
            }
        }

        return auth()->user();
    }
}
