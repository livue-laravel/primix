<?php

namespace Primix;

use Closure;
use Illuminate\Support\Arr;
use Primix\GlobalSearch\GlobalSearchMode;

class PanelRegistry
{
    protected array $panels = [];

    protected ?string $currentPanelId = null;

    protected bool|Closure $crossPanelSearch = false;

    protected GlobalSearchMode|Closure $globalSearchMode = GlobalSearchMode::Spotlight;

    /** @var array<Closure> */
    protected array $panelConfigurations = [];

    public function register(Panel $panel): void
    {
        $this->panels[$panel->getId()] = $panel;

        // Auto-set default panel as current (like Filament).
        // Falls back to the first registered panel if no explicit default.
        if ($panel->isDefault() || $this->currentPanelId === null) {
            $this->currentPanelId = $panel->getId();
        }
    }

    public function configurePanelUsing(Closure $callback): void
    {
        $this->panelConfigurations[] = $callback;
    }

    public function applyGlobalConfiguration(Panel $panel): void
    {
        foreach ($this->panelConfigurations as $callback) {
            $this->applyConfigurationCallback($panel, $callback);
        }
    }

    protected function applyConfigurationCallback(Panel $panel, Closure $callback): void
    {
        $config = PanelConfiguration::make();
        $callback($config);

        foreach ($config->getEntries() as $entry) {
            if ($this->isPanelExcluded($panel, $entry['exclude'])) {
                continue;
            }

            $panel->{$entry['method']}(...$entry['args']);
        }
    }

    public function isPanelExcluded(Panel $panel, array $exclude): bool
    {
        if (empty($exclude)) {
            return false;
        }

        $panelId = $panel->getId();

        foreach ($exclude as $identifier) {
            // Direct panel ID match
            if ($identifier === $panelId) {
                return true;
            }

            // Class name match (PanelProvider class → derive ID)
            if (class_exists($identifier)) {
                $derivedId = str(class_basename($identifier))
                    ->beforeLast('PanelProvider')
                    ->lower()
                    ->toString();

                if ($derivedId === $panelId) {
                    return true;
                }
            }
        }

        return false;
    }

    public function get(string $id): ?Panel
    {
        return $this->panels[$id] ?? null;
    }

    public function all(): array
    {
        return $this->panels;
    }

    public function setCurrentPanel(string $id): void
    {
        $this->currentPanelId = $id;
    }

    public function getCurrentPanel(): ?Panel
    {
        // 1. From route default / parameter (initial page load)
        $routePanelId = null;

        if (app()->bound('request')) {
            $route = request()->route();
            $routePanelId = $route?->defaults['_panel'] ?? $route?->parameter('_panel');
        }

        if (is_string($routePanelId) && $this->get($routePanelId) !== null) {
            $this->setCurrentPanel($routePanelId);

            return $this->get($routePanelId);
        }

        // 2. From session (AJAX updates / requests without route panel context)
        if (app()->bound('session')) {
            $sessionPanelId = session('primix.current_panel');

            if (is_string($sessionPanelId) && $this->get($sessionPanelId) !== null) {
                $this->setCurrentPanel($sessionPanelId);

                return $this->get($sessionPanelId);
            }
        }

        // 3. Explicitly set (by view composer, middleware, etc.) or auto-set at registration
        if ($this->currentPanelId !== null) {
            return $this->get($this->currentPanelId);
        }

        // 4. Fallback to default panel
        return $this->getDefault();
    }

    public function getCurrentPanelId(): ?string
    {
        return $this->currentPanelId;
    }

    public function getDefault(): ?Panel
    {
        return Arr::first(
            $this->panels,
            fn (Panel $panel): bool => $panel->isDefault(),
        ) ?? (reset($this->panels) ?: null);
    }

    public function getRoutePrefix(?string $panelId = null): string
    {
        $id = $panelId ?? $this->currentPanelId ?? config('primix.default');

        return "primix.{$id}.";
    }

    // ─── Global Search ──────────────────────────────────────────────

    public function enableCrossPanelSearch(bool|Closure $condition = true): void
    {
        $this->crossPanelSearch = $condition;
    }

    public function isCrossPanelSearchEnabled(): bool
    {
        if ($this->crossPanelSearch instanceof Closure) {
            return (bool) ($this->crossPanelSearch)();
        }

        return $this->crossPanelSearch;
    }

    public function globalSearchMode(GlobalSearchMode|Closure $mode): void
    {
        $this->globalSearchMode = $mode;
    }

    public function getGlobalSearchMode(): GlobalSearchMode
    {
        if ($this->globalSearchMode instanceof Closure) {
            return ($this->globalSearchMode)();
        }

        return $this->globalSearchMode;
    }
}
