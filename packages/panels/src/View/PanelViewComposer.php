<?php

namespace Primix\View;

use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Support\Facades\View;
use Illuminate\View\View as ViewInstance;
use Primix\Layouts\Shell;
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

        $topbarData = app(PanelTopbarDataResolver::class)->resolve($panel, $registry);
        $navigation = $topbarData['navigation'] ?? [];
        $brandName = $panel->getBrandName();
        $resolvedBrandName = $brandName instanceof Htmlable ? $brandName->toHtml() : ($brandName === null ? null : e($brandName));
        $topBarNavigation = (bool) ($topbarData['topBarNavigation'] ?? false);
        $fixedTopbar = (bool) ($topbarData['fixedTopbar'] ?? true);
        $hasDarkMode = (bool) ($topbarData['hasDarkMode'] ?? true);
        $userMenu = $topbarData['userMenu'] ?? [];

        $view->with('navigation', $navigation);
        $view->with('brandName', $resolvedBrandName);
        $view->with('brandLogo', $panel->getBrandLogo());
        $view->with('brandLogoDark', $panel->getBrandLogoDark());
        $view->with('topBarNavigation', $topBarNavigation);
        $view->with('fixedTopbar', $fixedTopbar);
        $view->with('hasDarkMode', $hasDarkMode);
        $view->with('userMenu', $userMenu);
        $view->with('panelId', $panelId);
        $view->with('favicon', $panel->getFavicon());

        $view->with('showPanelSwitcher', $topbarData['showPanelSwitcher'] ?? false);
        $view->with('showUserMenu', $topbarData['showUserMenu'] ?? true);
        $view->with('hasTenantMenu', $topbarData['hasTenantMenu'] ?? false);
        $view->with('tenantMenu', $topbarData['tenantMenu'] ?? []);
        $view->with('hasGlobalSearch', $topbarData['hasGlobalSearch'] ?? false);
        $view->with('globalSearchMode', $topbarData['globalSearchMode'] ?? 'spotlight');
        $view->with('hasDatabaseNotifications', $topbarData['hasDatabaseNotifications'] ?? false);
        $view->with('databaseNotificationsMode', $topbarData['databaseNotificationsMode'] ?? 'popup');
        $view->with('databaseNotificationsPollingInterval', $topbarData['databaseNotificationsPollingInterval'] ?? 30);
        $view->with('maxContentWidth', $panel->getMaxContentWidth());

        $view->with('shell', Shell::make()
            ->navigation($navigation)
            ->brandName($brandName)
            ->brandLogo($panel->getBrandLogo())
            ->brandLogoDark($panel->getBrandLogoDark())
            ->topbar()
            ->sidebar()
            ->panelSwitcher($topbarData['showPanelSwitcher'] ?? false)
            ->userMenu($userMenu, $topbarData['showUserMenu'] ?? true)
            ->topBarNavigation($topBarNavigation)
            ->fixedTopbar($fixedTopbar)
            ->darkMode($hasDarkMode)
            ->spa($panel->hasSpa())
            ->globalSearch($topbarData['hasGlobalSearch'] ?? false, $topbarData['globalSearchMode'] ?? 'spotlight')
            ->panelId($panelId)
            ->tenantMenu($topbarData['tenantMenu'] ?? [], $topbarData['hasTenantMenu'] ?? false)
            ->databaseNotifications(
                $topbarData['hasDatabaseNotifications'] ?? false,
                $topbarData['databaseNotificationsMode'] ?? 'popup',
                $topbarData['databaseNotificationsPollingInterval'] ?? 30
            )
            ->maxContentWidth($panel->getMaxContentWidth())
            ->notifications()
            ->notificationManager()
            ->favicon($panel->getFavicon()));

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
