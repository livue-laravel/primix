<?php

namespace Primix\Concerns;

use Closure;
use Primix\GlobalSearch\GlobalSearchMode;

trait HasGlobalSearch
{
    protected bool|Closure $globalSearch = true;

    protected GlobalSearchMode|Closure $globalSearchMode = GlobalSearchMode::Spotlight;

    protected bool|Closure $crossPanelSearch = false;

    protected array $crossPanelSearchExclude = [];

    public function globalSearch(bool|Closure $condition = true): static
    {
        $this->globalSearch = $condition;

        return $this;
    }

    public function hasGlobalSearch(): bool
    {
        if ($this->globalSearch instanceof Closure) {
            return (bool) ($this->globalSearch)();
        }

        return $this->globalSearch;
    }

    public function globalSearchMode(GlobalSearchMode|Closure $mode = GlobalSearchMode::Spotlight): static
    {
        $this->globalSearchMode = $mode;

        return $this;
    }

    public function getGlobalSearchMode(): GlobalSearchMode
    {
        if ($this->globalSearchMode instanceof Closure) {
            return ($this->globalSearchMode)();
        }

        return $this->globalSearchMode;
    }

    public function crossPanelSearch(bool|Closure $condition = true, array $exclude = []): static
    {
        $this->crossPanelSearch = $condition;
        $this->crossPanelSearchExclude = $exclude;

        return $this;
    }

    public function hasCrossPanelSearch(): bool
    {
        if ($this->crossPanelSearch instanceof Closure) {
            return (bool) ($this->crossPanelSearch)();
        }

        return $this->crossPanelSearch;
    }

    public function getCrossPanelSearchExclude(): array
    {
        return $this->crossPanelSearchExclude;
    }
}
