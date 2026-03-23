<?php

namespace Primix\MultiTenant\Hooks;

use Illuminate\Support\Facades\URL;
use LiVue\Component;
use LiVue\Features\SupportHooks\ComponentHook;
use LiVue\Features\SupportHooks\ComponentStore;
use Primix\MultiTenant\Contracts\TenancyManagerContract;

/**
 * LiVue ComponentHook for multi-tenancy support.
 *
 * During initial page load, tenancy is initialized by middleware (e.g.,
 * InitializeTenancyBySubdomain) which also sets URL::defaults for route
 * generation. However, LiVue AJAX updates go through /livue/update which
 * uses different middleware — tenancy is NOT initialized there.
 *
 * This hook bridges the gap by:
 * 1. Storing the tenant ID in the component snapshot memo on dehydration
 * 2. Restoring tenancy and URL::defaults from the memo on hydration (AJAX updates)
 */
class SupportTenancy extends ComponentHook
{
    /**
     * Store tenant ID in the snapshot memo so it survives across requests.
     */
    public function dehydrateMemo(Component $component, ComponentStore $store): array
    {
        $tenancy = app(TenancyManagerContract::class);

        if (! $tenancy->initialized()) {
            return [];
        }

        return [
            'tenantId' => $tenancy->tenant()->getTenantKey(),
        ];
    }

    /**
     * Restore tenancy from memo during AJAX updates.
     */
    public function hydrateMemo(Component $component, ComponentStore $store, array $memo): void
    {
        if (! isset($memo['tenantId'])) {
            return;
        }

        $tenancy = app(TenancyManagerContract::class);

        // Skip if already initialized (e.g., on initial page load where middleware ran)
        if ($tenancy->initialized()) {
            return;
        }

        $tenantModel = config('multi-tenant.tenant_model');
        $tenant = $tenantModel::find($memo['tenantId']);

        if (! $tenant) {
            return;
        }

        $tenancy->initialize($tenant);
        $this->restoreUrlDefaults($tenant);
    }

    /**
     * Restore URL::defaults based on the identification method.
     *
     * The AJAX request comes from the same origin as the original page,
     * so the host header still contains tenant information for subdomain
     * and domain identification.
     */
    protected function restoreUrlDefaults(mixed $tenant): void
    {
        $host = request()->getHost();
        $centralDomains = config('multi-tenant.central_domains', []);

        // Subdomain identification: extract subdomain from host
        foreach ($centralDomains as $centralDomain) {
            if (str_ends_with($host, $centralDomain)) {
                $subdomain = rtrim(str_replace($centralDomain, '', $host), '.');

                if (! empty($subdomain)) {
                    URL::defaults(['tenant' => $subdomain]);

                    return;
                }

                break;
            }
        }

        // Domain identification: host doesn't match any central domain
        $isCentralDomain = in_array($host, $centralDomains, true);

        if (! $isCentralDomain) {
            URL::defaults(['tenant_domain' => $host]);

            return;
        }

        // Path identification: use the same slug/key value that appears in the URL.
        // Must match panel.route_parameter (same key used by route registration and middleware).
        $parameter = config('multi-tenant.panel.route_parameter', 'tenant');

        if (class_exists(\Primix\PanelRegistry::class)) {
            $panel = app(\Primix\PanelRegistry::class)->getCurrentPanel();
            $slugAttribute = $panel && method_exists($panel, 'getTenantSlugAttribute')
                ? $panel->getTenantSlugAttribute()
                : null;

            if ($slugAttribute && isset($tenant->{$slugAttribute})) {
                URL::defaults([$parameter => $tenant->{$slugAttribute}]);

                return;
            }
        }

        URL::defaults([$parameter => $tenant->getTenantKey()]);
    }
}
