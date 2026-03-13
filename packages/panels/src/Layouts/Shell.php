<?php

namespace Primix\Layouts;

use Closure;
use Illuminate\Contracts\Support\Htmlable;
use Primix\Support\Concerns\EvaluatesClosures;
use Primix\Support\Enums\Width;

class Shell
{
    use EvaluatesClosures;

    protected ?object $component = null;

    protected array $navigation = [];

    protected string|Closure|Htmlable|null $brandName = null;

    protected string|Closure|Htmlable|null $brandLogo = null;

    protected string|Closure|Htmlable|null $brandLogoDark = null;

    protected bool|Closure $showTopbar = true;

    protected bool|Closure $showSidebar = true;

    protected bool|Closure $showPanelSwitcher = false;

    protected bool|Closure $showUserMenu = false;

    protected bool|Closure $topBarNavigation = false;

    protected bool|Closure $fixedTopbar = true;

    protected bool|Closure $hasDarkMode = true;

    protected bool|Closure $spa = false;

    protected bool|Closure $showFlashNotifications = true;

    protected bool|Closure $showNotificationManager = true;

    protected array $userMenu = [];

    protected bool|Closure $hasGlobalSearch = false;

    protected string|Closure $globalSearchMode = 'spotlight';

    protected string|Closure $panelId = '';

    protected bool|Closure $hasTenantMenu = false;

    protected array $tenantMenu = [];

    protected bool|Closure $hasDatabaseNotifications = false;

    protected string|Closure $databaseNotificationsMode = 'popup';

    protected int|Closure $databaseNotificationsPollingInterval = 30;

    protected Width|Closure|null $maxContentWidth = null;

    protected string|Closure|Htmlable|null $title = null;

    protected string|Closure|Htmlable|null $favicon = null;

    public static function make(): static
    {
        return new static();
    }

    public function component(?object $component): static
    {
        $this->component = $component;

        return $this;
    }

    public function navigation(array $navigation): static
    {
        $this->navigation = $navigation;

        return $this;
    }

    public function brandName(string|Closure|Htmlable|null $name): static
    {
        $this->brandName = $name;

        return $this;
    }

    public function brandLogo(string|Closure|Htmlable|null $brandLogo): static
    {
        $this->brandLogo = $brandLogo;

        return $this;
    }

    public function brandLogoDark(string|Closure|Htmlable|null $brandLogoDark): static
    {
        $this->brandLogoDark = $brandLogoDark;

        return $this;
    }

    public function topbar(bool|Closure $condition = true): static
    {
        $this->showTopbar = $condition;

        return $this;
    }

    public function sidebar(bool|Closure $condition = true): static
    {
        $this->showSidebar = $condition;

        return $this;
    }

    public function panelSwitcher(bool|Closure $condition = true): static
    {
        $this->showPanelSwitcher = $condition;

        return $this;
    }

    public function userMenu(array $items = [], bool|Closure $visible = true): static
    {
        $this->userMenu = $items;
        $this->showUserMenu = $visible;

        return $this;
    }

    public function topBarNavigation(bool|Closure $condition = true): static
    {
        $this->topBarNavigation = $condition;

        return $this;
    }

    public function fixedTopbar(bool|Closure $condition = true): static
    {
        $this->fixedTopbar = $condition;

        return $this;
    }

    public function darkMode(bool|Closure $condition = true): static
    {
        $this->hasDarkMode = $condition;

        return $this;
    }

    public function spa(bool|Closure $condition = true): static
    {
        $this->spa = $condition;

        return $this;
    }

    public function notifications(bool|Closure $condition = true): static
    {
        $this->showFlashNotifications = $condition;

        return $this;
    }

    public function notificationManager(bool|Closure $condition = true): static
    {
        $this->showNotificationManager = $condition;

        return $this;
    }

    public function globalSearch(bool|Closure $enabled = true, string|Closure $mode = 'spotlight'): static
    {
        $this->hasGlobalSearch = $enabled;
        $this->globalSearchMode = $mode;

        return $this;
    }

    public function panelId(string|Closure $panelId): static
    {
        $this->panelId = $panelId;

        return $this;
    }

    public function tenantMenu(array $items = [], bool|Closure $visible = true): static
    {
        $this->tenantMenu = $items;
        $this->hasTenantMenu = $visible;

        return $this;
    }

    public function databaseNotifications(
        bool|Closure $enabled = true,
        string|Closure $mode = 'popup',
        int|Closure $pollingInterval = 30
    ): static {
        $this->hasDatabaseNotifications = $enabled;
        $this->databaseNotificationsMode = $mode;
        $this->databaseNotificationsPollingInterval = $pollingInterval;

        return $this;
    }

    public function maxContentWidth(Width|Closure|null $maxContentWidth): static
    {
        $this->maxContentWidth = $maxContentWidth;

        return $this;
    }

    public function title(string|Closure|Htmlable|null $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function favicon(string|Closure|Htmlable|null $favicon): static
    {
        $this->favicon = $favicon;

        return $this;
    }

    public function toArray(): array
    {
        return [
            'navigation' => $this->navigation,
            'brandName' => $this->resolveMaybeHtml($this->brandName, escapeString: true),
            'brandLogo' => $this->resolveMaybeHtml($this->brandLogo),
            'brandLogoDark' => $this->resolveMaybeHtml($this->brandLogoDark),
            'showTopbar' => $this->evaluateBoolean($this->showTopbar),
            'showSidebar' => $this->evaluateBoolean($this->showSidebar),
            'showPanelSwitcher' => $this->evaluateBoolean($this->showPanelSwitcher),
            'showUserMenu' => $this->evaluateBoolean($this->showUserMenu),
            'topBarNavigation' => $this->evaluateBoolean($this->topBarNavigation),
            'fixedTopbar' => $this->evaluateBoolean($this->fixedTopbar),
            'hasDarkMode' => $this->evaluateBoolean($this->hasDarkMode),
            'spa' => $this->evaluateBoolean($this->spa),
            'showFlashNotifications' => $this->evaluateBoolean($this->showFlashNotifications),
            'showNotificationManager' => $this->evaluateBoolean($this->showNotificationManager),
            'userMenu' => $this->userMenu,
            'hasGlobalSearch' => $this->evaluateBoolean($this->hasGlobalSearch),
            'globalSearchMode' => (string) ($this->evaluateValue($this->globalSearchMode) ?? 'spotlight'),
            'panelId' => (string) ($this->evaluateValue($this->panelId) ?? ''),
            'hasTenantMenu' => $this->evaluateBoolean($this->hasTenantMenu),
            'tenantMenu' => $this->tenantMenu,
            'hasDatabaseNotifications' => $this->evaluateBoolean($this->hasDatabaseNotifications),
            'databaseNotificationsMode' => (string) ($this->evaluateValue($this->databaseNotificationsMode) ?? 'popup'),
            'databaseNotificationsPollingInterval' => (int) ($this->evaluateValue($this->databaseNotificationsPollingInterval) ?? 30),
            'maxContentWidth' => $this->evaluateValue($this->maxContentWidth),
            'title' => $this->resolveMaybeHtml($this->title),
            'favicon' => $this->resolveMaybeHtml($this->favicon),
        ];
    }

    protected function evaluateBoolean(bool|Closure $value): bool
    {
        return (bool) $this->evaluateValue($value);
    }

    protected function evaluateValue(mixed $value): mixed
    {
        return $this->evaluate($value, [
            'component' => $this->component,
            'layout' => $this,
            'shell' => $this,
        ]);
    }

    protected function resolveMaybeHtml(string|Closure|Htmlable|null $value, bool $escapeString = false): ?string
    {
        $resolved = $this->evaluateValue($value);

        if ($resolved === null) {
            return null;
        }

        if ($resolved instanceof Htmlable) {
            return $resolved->toHtml();
        }

        $string = (string) $resolved;

        if ($escapeString) {
            return e($string);
        }

        return $string;
    }
}
