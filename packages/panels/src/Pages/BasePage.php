<?php

namespace Primix\Pages;

use Closure;
use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Database\Eloquent\Model;
use LiVue\Component;
use Primix\Concerns\HasLayout;
use Primix\Concerns\HasRenderHooks;
use Primix\Concerns\UseDatabaseNotifications;
use Primix\PanelRegistry;

abstract class BasePage extends Component
{
    use UseDatabaseNotifications;
    use HasLayout;
    use HasRenderHooks;

    protected static ?string $slug = null;

    protected static bool $shouldRegisterNavigation = false;

    protected string|Closure|Htmlable|null $heading = null;

    public static function getSlug(): string
    {
        return static::$slug ?? str(class_basename(static::class))
            ->kebab()
            ->toString();
    }

    public function getTitle(): string
    {
        return $this->title ?? str(class_basename(static::class))
            ->headline()
            ->toString();
    }

    public function getHeading(): string|Htmlable
    {
        $heading = $this->heading;

        if ($heading instanceof Closure) {
            $heading = $heading();
        }

        return $heading ?? $this->getTitle();
    }

    /**
     * Build breadcrumb items compatible with PrimeVue Breadcrumb MenuItem shape.
     *
     * @return array<int, array{label: string, url?: string, icon?: string}>
     */
    public function getBreadcrumbs(): array
    {
        if (! $this->shouldShowBreadcrumbs()) {
            return [];
        }

        return [
            $this->makeBreadcrumbItem($this->getBreadcrumbLabel()),
        ];
    }

    public static function getRouteName(?string $panelId = null): string
    {
        $prefix = app(PanelRegistry::class)->getRoutePrefix($panelId);

        $resourceRouteName = static::resolveResourcePageRouteName($prefix);

        if ($resourceRouteName !== null) {
            return $resourceRouteName;
        }

        return $prefix . static::getSlug();
    }

    public static function getRouteUri(): string
    {
        return static::getSlug();
    }

    public static function getUrl(array $parameters = [], ?string $panelId = null): string
    {
        if (
            is_subclass_of(static::class, \Primix\Resources\Pages\Page::class) &&
            array_key_exists('record', $parameters) &&
            $parameters['record'] instanceof Model
        ) {
            $parameters['record'] = $parameters['record']->getKey();
        }

        return route(static::getRouteName($panelId), $parameters);
    }

    protected static function resolveResourcePageRouteName(string $prefix): ?string
    {
        if (! is_subclass_of(static::class, \Primix\Resources\Pages\Page::class)) {
            return null;
        }

        if (! method_exists(static::class, 'getResource')) {
            return null;
        }

        try {
            $resource = static::getResource();
        } catch (\Throwable) {
            return null;
        }

        if (
            ! is_string($resource) ||
            ! method_exists($resource, 'getPages') ||
            ! method_exists($resource, 'getSlug')
        ) {
            return null;
        }

        foreach ($resource::getPages() as $name => $registration) {
            if ($registration->getPage() === static::class) {
                return $prefix . $resource::getSlug() . ".{$name}";
            }
        }

        return null;
    }

    public static function route(string $path): PageRegistration
    {
        return new PageRegistration(static::class, $path);
    }

    public static function shouldRegisterNavigation(): bool
    {
        return static::$shouldRegisterNavigation;
    }

    protected function getBreadcrumbLabel(): string
    {
        return trim(strip_tags($this->getTitle()));
    }

    /**
     * @param array{url?: string|null, icon?: string|null} $attributes
     * @return array{label: string, url?: string, icon?: string}
     */
    protected function makeBreadcrumbItem(string $label, array $attributes = []): array
    {
        $item = [
            'label' => $label,
        ];

        $url = $attributes['url'] ?? null;
        if (filled($url)) {
            $item['url'] = $url;
        }

        $icon = $attributes['icon'] ?? null;
        if (filled($icon)) {
            $item['icon'] = $icon;
        }

        return $item;
    }

    protected function resolveBreadcrumbUrl(Closure $resolver): ?string
    {
        try {
            return $resolver();
        } catch (\Throwable) {
            return null;
        }
    }

    protected function shouldShowBreadcrumbs(): bool
    {
        return app(PanelRegistry::class)->getCurrentPanel()?->hasBreadcrumbs() ?? true;
    }

    public function dehydrate(): void
    {
        if (session()->has('primix.notification')) {
            $notification = session('primix.notification');
            $this->vue(
                "window.dispatchEvent(new CustomEvent('primix:notification', {detail: " . json_encode($notification) . "}))"
            );
            session()->forget('primix.notification');
        }
    }
}
