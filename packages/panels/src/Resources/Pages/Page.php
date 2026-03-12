<?php

namespace Primix\Resources\Pages;

use Primix\Pages\Page as BasePage;

abstract class Page extends BasePage
{
    protected static ?string $resource = null;

    public string $resourceClass = '';

    protected static bool $shouldRegisterNavigation = false;

    public static function getResource(): string
    {
        if (static::$resource !== null) {
            return static::$resource;
        }

        if (app()->bound('request')) {
            $resource = request()->route()?->defaults['_resource'] ?? null;

            if (is_string($resource) && $resource !== '') {
                return $resource;
            }
        }

        throw new \RuntimeException('Unable to resolve resource class for page [' . static::class . '].');
    }

    public function resolveResource(): string
    {
        return $this->resourceClass ?: static::getResource();
    }

    /**
     * @return array<int, array{label: string, url?: string, icon?: string}>
     */
    public function getBreadcrumbs(): array
    {
        if (! $this->shouldShowBreadcrumbs()) {
            return [];
        }

        $resource = $this->resolveResource();
        $resourceLabel = $resource::getNavigationLabel();
        $registration = $this->resolveCurrentResourcePageRegistration();
        $pageName = $registration['name'] ?? null;
        $pageRoute = $registration['route'] ?? null;
        $isIndexPage = $pageName === 'index' || trim((string) $pageRoute, '/') === '';
        $currentLabel = $this->resolveResourcePathBreadcrumbLabel($pageRoute, $pageName);

        $resourceBreadcrumbAttributes = [];

        if (! $isIndexPage && $resource::hasPage('index')) {
            $resourceUrl = $this->resolveBreadcrumbUrl(
                fn (): string => $resource::getUrl('index'),
            );

            if ($resourceUrl !== null) {
                $resourceBreadcrumbAttributes['url'] = $resourceUrl;
            }
        }

        return [
            $this->makeBreadcrumbItem($resourceLabel, $resourceBreadcrumbAttributes),
            $this->makeBreadcrumbItem($currentLabel),
        ];
    }

    /**
     * @return array{name: string, route: string}|null
     */
    protected function resolveCurrentResourcePageRegistration(): ?array
    {
        foreach ($this->resolveResource()::getPages() as $name => $registration) {
            if ($registration->getPage() === static::class) {
                return [
                    'name' => $name,
                    'route' => $registration->getRoute(),
                ];
            }
        }

        return null;
    }

    protected function resolveResourcePathBreadcrumbLabel(?string $route, ?string $name): string
    {
        if ($name !== null) {
            $knownName = match ($name) {
                'index' => __('primix::panel.breadcrumbs.list'),
                'create' => __('primix::panel.breadcrumbs.create'),
                'edit' => __('primix::panel.breadcrumbs.edit'),
                'view' => __('primix::panel.breadcrumbs.view'),
                default => null,
            };

            if ($knownName !== null) {
                return $knownName;
            }
        }

        $normalizedRoute = trim((string) $route, '/');

        if ($normalizedRoute === '') {
            return __('primix::panel.breadcrumbs.list');
        }

        $segments = array_values(array_filter(
            explode('/', $normalizedRoute),
            fn (string $segment): bool => $segment !== '' && ! str_starts_with($segment, '{'),
        ));

        if (empty($segments)) {
            return __('primix::panel.breadcrumbs.view');
        }

        return str(str_replace(['-', '_'], ' ', end($segments)))->headline()->toString();
    }
}
