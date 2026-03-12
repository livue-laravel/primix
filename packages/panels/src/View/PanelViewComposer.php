<?php

namespace Primix\View;

use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Support\Facades\View;
use Illuminate\View\View as ViewInstance;
use Primix\Navigation\NavigationBuilder;
use Primix\PanelRegistry;
use Primix\Support\Theme\ThemeManager;

class PanelViewComposer
{
    public function composePanelLayout(ViewInstance $view): void
    {
        $panelId = $this->resolvePanelIdFromRoute();

        if (! $panelId) {
            return;
        }

        $registry = app(PanelRegistry::class);
        $panel = $registry->get($panelId);

        if (! $panel) {
            return;
        }

        $registry->setCurrentPanel($panelId);
        if (app()->bound('session')) {
            session(['primix.current_panel' => $panelId]);
        }

        $builder = new NavigationBuilder($panel);
        $view->with('navigation', $builder->build());
        $brandName = $panel->getBrandName();
        $view->with('brandName', $brandName instanceof Htmlable ? $brandName->toHtml() : ($brandName === null ? null : e($brandName)));
        $view->with('brandLogo', $panel->getBrandLogo());
        $view->with('brandLogoDark', $panel->getBrandLogoDark());
        $view->with('topBarNavigation', $panel->hasTopBarNavigation());
        $view->with('fixedTopbar', $panel->hasFixedTopbar());
        $view->with('hasDarkMode', $panel->hasDarkMode());
        $view->with('userMenu', $panel->buildUserMenu()->toArray());
        $view->with('panelId', $panelId);
        $view->with('favicon', $panel->getFavicon());

        // Tenant menu
        $hasTenantMenu = false;
        $tenantMenu = [];

        if ($panel->hasTenantMenu()) {
            if (app()->bound(\Primix\MultiTenant\Contracts\TenancyManagerContract::class)) {
                $tenancy = app(\Primix\MultiTenant\Contracts\TenancyManagerContract::class);
                if ($tenancy->initialized()) {
                    $hasTenantMenu = true;
                    $tenantMenu = $panel->buildTenantMenu()->toArray();
                }
            }
        }

        $view->with('hasTenantMenu', $hasTenantMenu);
        $view->with('tenantMenu', $tenantMenu);

        // Global search
        $hasSearchableResources = count(array_filter(
            $panel->getResources(),
            fn (string $resource) => $resource::isGloballySearchable()
        )) > 0;

        $hasCrossPanelSearchable = false;
        if ($panel->hasCrossPanelSearch() || $registry->isCrossPanelSearchEnabled()) {
            foreach ($registry->all() as $otherPanel) {
                if ($otherPanel->getId() === $panel->getId()) continue;

                foreach ($otherPanel->getResources() as $resource) {
                    if ($resource::isGloballySearchable()) {
                        $hasCrossPanelSearchable = true;
                        break 2;
                    }
                }
            }
        }

        $view->with('hasGlobalSearch', $panel->hasGlobalSearch() && ($hasSearchableResources || $hasCrossPanelSearchable));
        $view->with('globalSearchMode', $panel->getGlobalSearchMode()->value);

        // Database notifications
        $view->with('hasDatabaseNotifications', $panel->hasDatabaseNotifications());
        $view->with('databaseNotificationsMode', $panel->getDatabaseNotificationsMode()->value);
        $view->with('databaseNotificationsPollingInterval', $panel->getDatabaseNotificationsPollingInterval());

        View::share('spa', $panel->hasSpa());

        // Inject theme configuration into the frontend
        app(ThemeManager::class)->apply($panel);
    }

    public function composeSimpleLayout(ViewInstance $view): void
    {
        $panelId = $this->resolvePanelIdFromRoute();

        if (! $panelId) {
            return;
        }

        $registry = app(PanelRegistry::class);
        $panel = $registry->get($panelId);

        if (! $panel) {
            return;
        }

        $registry->setCurrentPanel($panelId);
        if (app()->bound('session')) {
            session(['primix.current_panel' => $panelId]);
        }

        $view->with('favicon', $panel->getFavicon());

        // Inject theme configuration into the frontend
        app(ThemeManager::class)->apply($panel);
    }

    protected function resolvePanelIdFromRoute(): ?string
    {
        if (! app()->bound('request')) {
            return null;
        }

        return request()->route()?->defaults['_panel'] ?? null;
    }
}
