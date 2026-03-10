<?php

namespace Primix;

use BackedEnum;
use Closure;
use Illuminate\Contracts\Support\Htmlable;
use Primix\GlobalSearch\GlobalSearchMode;
use Primix\Support\Enums\Width;
use Primix\Support\Theme\Theme;

class PanelConfiguration
{
    protected array $entries = [];

    public static function make(): static
    {
        return new static();
    }

    public function getEntries(): array
    {
        return $this->entries;
    }

    // ─── Branding ────────────────────────────────────────────────────

    public function brandName(string|Closure|Htmlable|null $name, array $exclude = []): static
    {
        return $this->addEntry('brandName', [$name], $exclude);
    }

    public function brandLogo(
        string|\Closure|\Illuminate\Contracts\Support\Htmlable|null $default = null,
        string|\Closure|\Illuminate\Contracts\Support\Htmlable|null $light = null,
        string|\Closure|\Illuminate\Contracts\Support\Htmlable|null $dark = null,
        array $exclude = [],
    ): static {
        return $this->addEntry('brandLogo', [$default, $light, $dark], $exclude);
    }

    public function brandLogoHeight(?string $height, array $exclude = []): static
    {
        return $this->addEntry('brandLogoHeight', [$height], $exclude);
    }

    public function favicon(string|Closure|Htmlable|null $favicon, array $exclude = []): static
    {
        return $this->addEntry('favicon', [$favicon], $exclude);
    }

    // ─── UI Options ──────────────────────────────────────────────────

    public function darkMode(bool $enabled = true, array $exclude = []): static
    {
        return $this->addEntry('darkMode', [$enabled], $exclude);
    }

    public function breadcrumbs(bool|Closure $condition = true, array $exclude = []): static
    {
        return $this->addEntry('breadcrumbs', [$condition], $exclude);
    }

    public function fixedTopbar(bool $enabled = true, array $exclude = []): static
    {
        return $this->addEntry('fixedTopbar', [$enabled], $exclude);
    }

    public function spa(bool|Closure $condition = true, array $exclude = []): static
    {
        return $this->addEntry('spa', [$condition], $exclude);
    }

    public function topBarNavigation(bool|Closure $condition = true, array $exclude = []): static
    {
        return $this->addEntry('topBarNavigation', [$condition], $exclude);
    }

    public function maxContentWidth(Width $width, array $exclude = []): static
    {
        return $this->addEntry('maxContentWidth', [$width], $exclude);
    }

    // ─── Auth Pages ──────────────────────────────────────────────────

    public function login(string $pageClass = \Primix\Pages\Auth\Login::class, array $exclude = []): static
    {
        return $this->addEntry('login', [$pageClass], $exclude);
    }

    public function registration(string $pageClass = \Primix\Pages\Auth\Register::class, array $exclude = []): static
    {
        return $this->addEntry('registration', [$pageClass], $exclude);
    }

    public function passwordReset(
        bool $enabled = true,
        string $requestPage = \Primix\Pages\Auth\RequestPasswordReset::class,
        string $resetPage = \Primix\Pages\Auth\ResetPassword::class,
        array $exclude = []
    ): static
    {
        return $this->addEntry('passwordReset', [$enabled, $requestPage, $resetPage], $exclude);
    }

    public function emailVerification(
        bool $enabled = true,
        string $pageClass = \Primix\Pages\Auth\EmailVerificationPrompt::class,
        array $exclude = []
    ): static
    {
        return $this->addEntry('emailVerification', [$enabled, $pageClass], $exclude);
    }

    public function profile(?string $pageClass = null, array $exclude = []): static
    {
        return $this->addEntry('profile', [$pageClass], $exclude);
    }

    // ─── Theme & Colors ──────────────────────────────────────────────

    public function primaryColor(string $color, array $exclude = []): static
    {
        return $this->addEntry('primaryColor', [$color], $exclude);
    }

    public function surfaceColor(string $color, array $exclude = []): static
    {
        return $this->addEntry('surfaceColor', [$color], $exclude);
    }

    public function dangerColor(string $color, array $exclude = []): static
    {
        return $this->addEntry('dangerColor', [$color], $exclude);
    }

    public function warningColor(string $color, array $exclude = []): static
    {
        return $this->addEntry('warningColor', [$color], $exclude);
    }

    public function successColor(string $color, array $exclude = []): static
    {
        return $this->addEntry('successColor', [$color], $exclude);
    }

    public function infoColor(string $color, array $exclude = []): static
    {
        return $this->addEntry('infoColor', [$color], $exclude);
    }

    public function colors(array $colors, array $exclude = []): static
    {
        return $this->addEntry('colors', [$colors], $exclude);
    }

    public function theme(Closure|string|Theme $theme, array $exclude = []): static
    {
        return $this->addEntry('theme', [$theme], $exclude);
    }

    public function borderRadius(string $radius, array $exclude = []): static
    {
        return $this->addEntry('borderRadius', [$radius], $exclude);
    }

    public function font(string $font, array $exclude = []): static
    {
        return $this->addEntry('font', [$font], $exclude);
    }

    // ─── Global Search ───────────────────────────────────────────────

    public function globalSearch(bool|Closure $condition = true, array $exclude = []): static
    {
        return $this->addEntry('globalSearch', [$condition], $exclude);
    }

    public function globalSearchMode(GlobalSearchMode|Closure $mode = GlobalSearchMode::Spotlight, array $exclude = []): static
    {
        return $this->addEntry('globalSearchMode', [$mode], $exclude);
    }

    // ─── Modal Configuration ────────────────────────────────────────

    public function stackBasedModals(bool|Closure $condition = true, array $exclude = []): static
    {
        return $this->addEntry('stackBasedModals', [$condition], $exclude);
    }

    public function disableStackBasedModals(array $exclude = []): static
    {
        return $this->addEntry('stackBasedModals', [false], $exclude);
    }

    // ─── Middleware ──────────────────────────────────────────────────

    public function middleware(array $middleware, array $exclude = []): static
    {
        return $this->addEntry('addMiddleware', [$middleware], $exclude);
    }

    public function authMiddleware(array $middleware, array $exclude = []): static
    {
        return $this->addEntry('addAuthMiddleware', [$middleware], $exclude);
    }

    public function authGuard(?string $guard, array $exclude = []): static
    {
        return $this->addEntry('authGuard', [$guard], $exclude);
    }

    // ─── Render Hooks ────────────────────────────────────────────────

    public function renderHook(string|BackedEnum $name, Closure|string $callback, array $scopes = [], array $exclude = []): static
    {
        return $this->addEntry('renderHook', [$name, $callback, $scopes], $exclude);
    }

    // ─── Internal ────────────────────────────────────────────────────

    protected function addEntry(string $method, array $args, array $exclude): static
    {
        $this->entries[] = [
            'method' => $method,
            'args' => $args,
            'exclude' => $exclude,
        ];

        return $this;
    }
}
