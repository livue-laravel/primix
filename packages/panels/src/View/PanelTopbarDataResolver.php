<?php

namespace Primix\View;

use Illuminate\Contracts\Support\Htmlable;
use Primix\Navigation\NavigationBuilder;
use Primix\Panel;
use Primix\PanelRegistry;

class PanelTopbarDataResolver
{
    /**
     * Build a primix-topbar compatible payload from the current panel context.
     */
    public function resolve(Panel $panel, PanelRegistry $registry): array
    {
        $panelId = $panel->getId();
        $navigation = (new NavigationBuilder($panel))->build();
        $brandName = $panel->getBrandName();
        $resolvedBrandName = $brandName instanceof Htmlable
            ? $brandName->toHtml()
            : ($brandName === null ? null : e($brandName));

        // Tenant menu
        $hasTenantMenu = false;
        $tenantMenu = [];

        if ($panel->hasTenantMenu() && app()->bound(\Primix\MultiTenant\Contracts\TenancyManagerContract::class)) {
            $tenancy = app(\Primix\MultiTenant\Contracts\TenancyManagerContract::class);

            if ($tenancy->initialized()) {
                $hasTenantMenu = true;
                $tenantMenu = $panel->buildTenantMenu()->toArray();
            }
        }

        // Global search
        $hasSearchableResources = count(array_filter(
            $panel->getResources(),
            fn (string $resource) => $resource::isGloballySearchable()
        )) > 0;

        $hasCrossPanelSearchable = false;
        if ($panel->hasCrossPanelSearch() || $registry->isCrossPanelSearchEnabled()) {
            foreach ($registry->all() as $otherPanel) {
                if ($otherPanel->getId() === $panel->getId()) {
                    continue;
                }

                foreach ($otherPanel->getResources() as $resource) {
                    if ($resource::isGloballySearchable()) {
                        $hasCrossPanelSearchable = true;
                        break 2;
                    }
                }
            }
        }

        $hasGlobalSearch = $panel->hasGlobalSearch() && ($hasSearchableResources || $hasCrossPanelSearchable);

        return [
            'navigation' => $navigation,
            'brandName' => $resolvedBrandName,
            'brandLogo' => $panel->getBrandLogo(),
            'brandLogoDark' => $panel->getBrandLogoDark(),
            'topBarNavigation' => $panel->hasTopBarNavigation(),
            'fixedTopbar' => $panel->hasFixedTopbar(),
            'spa' => $panel->hasSpa(),
            'hasDarkMode' => $panel->hasDarkMode(),
            'userMenu' => $panel->buildUserMenu()->toArray(),
            'showPanelSwitcher' => false,
            'showUserMenu' => true,
            'hasGlobalSearch' => $hasGlobalSearch,
            'globalSearchMode' => $panel->getGlobalSearchMode()->value,
            'panelId' => $panelId,
            'hasTenantMenu' => $hasTenantMenu,
            'tenantMenu' => $tenantMenu,
            'hasDatabaseNotifications' => $panel->hasDatabaseNotifications(),
            'databaseNotificationsMode' => $panel->getDatabaseNotificationsMode()->value,
            'databaseNotificationsPollingInterval' => $panel->getDatabaseNotificationsPollingInterval(),
        ];
    }
}
