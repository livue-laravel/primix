<?php

namespace Primix\GlobalSearch;

use Illuminate\Support\Facades\URL;
use Primix\Panel;
use Primix\PanelRegistry;

class GlobalSearch
{
    public function __construct(
        protected Panel $panel,
        protected PanelRegistry $registry,
    ) {}

    /**
     * @return GlobalSearchResultGroup[]
     */
    public function search(string $query): array
    {
        $resourceMap = $this->collectSearchableResources();
        $originalDefaults = URL::getDefaultParameters();

        $groups = [];

        foreach ($resourceMap as $resource => $entry) {
            // Switch panel context so Resource::getUrl() uses the correct route prefix
            $this->registry->setCurrentPanel($entry['panel']->getId());

            // Ensure URL defaults for tenant-aware panels (e.g. subdomain)
            if ($entry['isCrossPanel'] && $entry['panel']->hasTenancy()) {
                $this->ensureTenantUrlDefaults($entry['panel']);
            }

            $results = $resource::getGlobalSearchResults($query);

            if (! empty($results)) {
                $groups[] = new GlobalSearchResultGroup(
                    label: $resource::getNavigationLabel(),
                    icon: $resource::getNavigationIcon(),
                    results: $results,
                    panelLabel: $entry['isCrossPanel'] ? $entry['panel']->getBrandName() : null,
                );
            }
        }

        // Restore original state
        $this->registry->setCurrentPanel($this->panel->getId());
        URL::defaults($originalDefaults);

        return $groups;
    }

    /**
     * Collect all searchable resources across panels.
     *
     * Current panel resources have priority. Cross-panel resources
     * are added only if enabled and not excluded. Duplicates (same
     * resource class in multiple panels) are skipped.
     *
     * @return array<class-string, array{panel: Panel, isCrossPanel: bool}>
     */
    protected function collectSearchableResources(): array
    {
        $map = [];

        // 1. Current panel resources (always included, no badge)
        foreach ($this->getSearchableResources($this->panel) as $resource) {
            $map[$resource] = [
                'panel' => $this->panel,
                'isCrossPanel' => false,
            ];
        }

        // 2. Other panels' resources (only if cross-panel is enabled)
        if (! $this->shouldSearchCrossPanels()) {
            return $map;
        }

        $excludes = $this->panel->getCrossPanelSearchExclude();

        foreach ($this->registry->all() as $otherPanel) {
            if ($otherPanel->getId() === $this->panel->getId()) {
                continue;
            }

            // Skip excluded panels
            if (in_array($otherPanel->getId(), $excludes)) {
                continue;
            }

            $panelExcludes = array_merge($excludes, $otherPanel->getCrossPanelSearchExclude());

            foreach ($this->getSearchableResources($otherPanel) as $resource) {
                // Deduplicate: current panel has priority
                if (isset($map[$resource])) {
                    continue;
                }

                // Skip excluded resources
                if (in_array($resource, $panelExcludes)) {
                    continue;
                }

                $map[$resource] = [
                    'panel' => $otherPanel,
                    'isCrossPanel' => true,
                ];
            }
        }

        return $map;
    }

    /**
     * Set URL::defaults with tenant information from the current request.
     *
     * When doing cross-panel search, the target panel may use tenant-aware
     * routing (subdomain, path, etc.). We extract the tenant identifier
     * from the current request so route() can resolve the {tenant} parameter.
     */
    protected function ensureTenantUrlDefaults(Panel $panel): void
    {
        $identification = $panel->getTenantIdentification();
        $routeParam = config('multi-tenant.panel.route_parameter', 'tenant');

        match ($identification) {
            'subdomain' => $this->setSubdomainDefault($routeParam),
            'path' => $this->setPathDefault($routeParam),
            default => null,
        };
    }

    protected function setSubdomainDefault(string $routeParam): void
    {
        $host = request()->getHost();
        $centralDomains = config('multi-tenant.central_domains', []);

        foreach ($centralDomains as $centralDomain) {
            if (str_ends_with($host, $centralDomain)) {
                $subdomain = rtrim(str_replace($centralDomain, '', $host), '.');

                if (! empty($subdomain)) {
                    URL::defaults([$routeParam => $subdomain]);
                }

                return;
            }
        }
    }

    protected function setPathDefault(string $routeParam): void
    {
        $segments = request()->segments();

        if (! empty($segments)) {
            URL::defaults([$routeParam => $segments[0]]);
        }
    }

    /**
     * @return string[]
     */
    protected function getSearchableResources(Panel $panel): array
    {
        return array_filter(
            $panel->getResources(),
            fn (string $resource) => $resource::isGloballySearchable()
        );
    }

    protected function shouldSearchCrossPanels(): bool
    {
        return $this->panel->hasCrossPanelSearch()
            || $this->registry->isCrossPanelSearchEnabled();
    }
}
