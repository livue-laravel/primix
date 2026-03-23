<?php

namespace Primix\MultiTenant\Resolvers;

use Illuminate\Http\Request;
use Primix\MultiTenant\Contracts\TenantContract;
use Primix\MultiTenant\Contracts\TenantResolver;

class PathTenantResolver implements TenantResolver
{
    public function resolve(Request $request): ?TenantContract
    {
        $parameter = config('multi-tenant.panel.route_parameter', 'tenant');
        $tenantKey = $request->route($parameter);

        if ($tenantKey === null) {
            return null;
        }

        $tenantModel = config('multi-tenant.tenant_model');
        $model = new $tenantModel;

        // Try to resolve by slug attribute from Panel config, then fall back to tenant key
        $slugAttribute = $this->getSlugAttribute();

        if ($slugAttribute) {
            $tenant = $tenantModel::where($slugAttribute, $tenantKey)->first();

            if ($tenant) {
                return $tenant;
            }
        }

        return $tenantModel::where(
            $model->getTenantKeyName(),
            $tenantKey,
        )->first();
    }

    protected function getSlugAttribute(): ?string
    {
        if (! class_exists(\Primix\PanelRegistry::class)) {
            return null;
        }

        $registry = app(\Primix\PanelRegistry::class);

        // Try to get the panel from the current route's _panel default
        $panelId = null;

        if (app()->bound('request')) {
            $panelId = request()->route()?->defaults['_panel'] ?? null;
        }

        $panel = $panelId ? $registry->get($panelId) : $registry->getCurrentPanel();

        if ($panel && method_exists($panel, 'getTenantSlugAttribute')) {
            return $panel->getTenantSlugAttribute();
        }

        return null;
    }
}
