<?php

namespace Primix;

use BackedEnum;
use Closure;
use Illuminate\Contracts\Support\Htmlable;
use Primix\Support\RenderHook\RenderHookManager;
use Primix\Support\Enums\Width;

class Panel
{
    use Concerns\HasAuthentication;
    use Concerns\HasBreadcrumbs;
    use Concerns\HasBranding;
    use Concerns\HasDatabaseNotifications;
    use Concerns\HasDiscovery;
    use Concerns\HasGlobalSearch;
    use Concerns\HasLabelTranslation;
    use Concerns\HasModalConfiguration;
    use Concerns\HasPlugins;
    use Concerns\HasTenancy;
    use Concerns\HasTenantBilling;
    use Concerns\HasTenantMenu;
    use Concerns\HasTheme;
    use Concerns\HasUserMenu;
    use Concerns\HasWorkspace;

    protected string $id;

    protected ?string $path = null;

    protected ?string $domain = null;

    protected array $resources = [];

    protected array $pages = [];

    protected array $widgets = [];

    protected array $middleware = ['web'];

    protected ?array $authMiddleware = null;

    protected ?Closure $navigation = null;

    protected bool|Closure $topBarNavigation = false;

    protected bool|Closure $spa = false;

    protected bool $darkMode = true;

    protected bool $fixedTopbar = true;

    protected ?Width $maxContentWidth = null;

    protected string|Closure|Htmlable|null $favicon = null;

    protected bool $default = false;

    protected bool $routesRegistered = false;

    public static function make(string $id): static
    {
        $instance = new static();
        $instance->id = $id;

        return $instance;
    }

    public function default(bool $condition = true): static
    {
        $this->default = $condition;

        return $this;
    }

    public function isDefault(): bool
    {
        return $this->default;
    }

    public function id(string $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function path(string $path): static
    {
        $this->path = $path;

        return $this;
    }

    public function getPath(): string
    {
        if ($this->path === null) {
            throw new \RuntimeException("Panel [{$this->getId()}] path is not configured. Call ->path(...) first.");
        }

        return $this->path;
    }

    public function domain(?string $domain): static
    {
        $this->domain = $domain;

        return $this;
    }

    public function getDomain(): ?string
    {
        return $this->domain;
    }

    public function resources(array $resources): static
    {
        $this->resources = $resources;

        return $this;
    }

    public function getResources(): array
    {
        return array_unique(array_merge($this->discoveredResources, $this->resources));
    }

    public function pages(array $pages): static
    {
        $this->pages = $pages;

        return $this;
    }

    public function getPages(): array
    {
        return array_unique(array_merge($this->discoveredPages, $this->pages));
    }

    public function widgets(array $widgets): static
    {
        $this->widgets = $widgets;

        return $this;
    }

    public function getWidgets(): array
    {
        return array_unique(array_merge($this->discoveredWidgets, $this->widgets));
    }

    public function middleware(array $middleware): static
    {
        $this->middleware = $middleware;

        return $this;
    }

    public function getMiddleware(): array
    {
        return $this->middleware;
    }

    public function authMiddleware(array $middleware): static
    {
        $this->authMiddleware = $middleware;

        return $this;
    }

    public function getAuthMiddleware(): array
    {
        if ($this->authMiddleware !== null) {
            return $this->authMiddleware;
        }

        $middleware = [];

        if ($this->hasLogin()) {
            $middleware[] = \Primix\Http\Middleware\Authenticate::class;
        }

        if ($this->hasEmailVerification()) {
            $middleware[] = \Primix\Http\Middleware\EnsureEmailIsVerified::class;
        }

        if ($this->hasTenancy() && $this->hasTenantCreation()) {
            $middleware[] = \Primix\Http\Middleware\EnsureHasTenant::class;
        }

        if ($this->requiresTenantSubscription()) {
            $middleware[] = \Primix\Http\Middleware\EnsureTenantSubscribed::class;
        }

        return $middleware;
    }

    public function navigation(?Closure $callback): static
    {
        $this->navigation = $callback;

        return $this;
    }

    public function getNavigation(): ?Closure
    {
        return $this->navigation;
    }

    public function topBarNavigation(bool|Closure $condition = true): static
    {
        $this->topBarNavigation = $condition;

        return $this;
    }

    public function hasTopBarNavigation(): bool
    {
        if ($this->topBarNavigation instanceof Closure) {
            return (bool) ($this->topBarNavigation)();
        }

        return $this->topBarNavigation;
    }

    public function spa(bool|Closure $condition = true): static
    {
        $this->spa = $condition;

        return $this;
    }

    public function hasSpa(): bool
    {
        if ($this->spa instanceof Closure) {
            return (bool) ($this->spa)();
        }

        return $this->spa;
    }

    public function darkMode(bool $enabled = true): static
    {
        $this->darkMode = $enabled;

        return $this;
    }

    public function hasDarkMode(): bool
    {
        return $this->darkMode;
    }

    public function fixedTopbar(bool $enabled = true): static
    {
        $this->fixedTopbar = $enabled;

        return $this;
    }

    public function hasFixedTopbar(): bool
    {
        return $this->fixedTopbar;
    }

    public function maxContentWidth(Width $width): static
    {
        $this->maxContentWidth = $width;

        return $this;
    }

    public function getMaxContentWidth(): ?Width
    {
        return $this->maxContentWidth;
    }

    public function favicon(string|Closure|Htmlable|null $favicon): static
    {
        $this->favicon = $favicon;

        return $this;
    }

    public function getFavicon(): ?string
    {
        $favicon = $this->favicon;

        if ($favicon instanceof Closure) {
            $favicon = $favicon();
        }

        if ($favicon instanceof Htmlable) {
            $favicon = $favicon->toHtml();
        }

        return $favicon;
    }

    public function getUrl(): string
    {
        return url($this->getPath());
    }

    public function markRoutesRegistered(): void
    {
        $this->routesRegistered = true;
    }

    public function hasRoutesRegistered(): bool
    {
        return $this->routesRegistered;
    }

    // ─── Additive Methods ───────────────────────────────────────────

    public function addResources(array $resources): static
    {
        $this->resources = array_merge($this->resources, $resources);

        return $this;
    }

    public function addPages(array $pages): static
    {
        $this->pages = array_merge($this->pages, $pages);

        return $this;
    }

    public function addWidgets(array $widgets): static
    {
        $this->widgets = array_merge($this->widgets, $widgets);

        return $this;
    }

    public function addMiddleware(array $middleware): static
    {
        $this->middleware = array_merge($this->middleware, $middleware);

        return $this;
    }

    public function addAuthMiddleware(array $middleware): static
    {
        $this->authMiddleware = array_merge($this->authMiddleware ?? [], $middleware);

        return $this;
    }

    // ─── Render Hooks ────────────────────────────────────────────────

    public function renderHook(string|BackedEnum $name, Closure|string $callback, array $scopes = []): static
    {
        app(RenderHookManager::class)->register($name, $callback, $scopes);

        return $this;
    }
}
