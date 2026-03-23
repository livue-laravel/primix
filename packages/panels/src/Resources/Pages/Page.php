<?php

namespace Primix\Resources\Pages;

use Illuminate\Contracts\Support\Htmlable;
use Primix\PanelRegistry;
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

    public function hasWorkspace(): bool
    {
        return $this->resolveResource()::hasWorkspace();
    }

    public function getWorkspaceTitle(): string|Htmlable
    {
        return $this->getTitle();
    }

    /**
     * @return array{
     *   enabled: bool,
     *   panelId: string,
     *   resourceSlug: string,
     *   resourceLabel: string,
     *   currentKey: string,
     *   currentUrl: string,
     *   currentTitle: string,
     *   indexUrl: string|null,
     *   spa: bool,
     *   closeTabLabel: string
     * }
     */
    public function getWorkspacePayload(): array
    {
        $resource = $this->resolveResource();
        $panel = app(PanelRegistry::class)->getCurrentPanel();
        $workspaceTitle = $this->getWorkspaceTitle();
        $panelId = (string) ($panel?->getId() ?? '');
        $resourceSlug = $resource::getSlug();
        $registration = $this->resolveCurrentResourcePageRegistration();
        $pageName = (string) ($registration['name'] ?? static::class);
        $routeParameters = request()->route()?->parametersWithoutNulls() ?? [];

        $routeParameters = collect($routeParameters)
            ->reject(fn (mixed $value, string|int $key): bool => is_string($key) && str_starts_with($key, '_'))
            ->mapWithKeys(function (mixed $value, string|int $key): array {
                if (! is_string($key) && ! is_int($key)) {
                    return [];
                }

                $normalizedValue = is_scalar($value)
                    ? (string) $value
                    : json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_INVALID_UTF8_SUBSTITUTE);

                return [(string) $key => $normalizedValue ?: ''];
            })
            ->all();

        ksort($routeParameters);

        $currentKey = implode('|', [
            $panelId,
            $resourceSlug,
            $pageName,
            http_build_query($routeParameters, '', '&', PHP_QUERY_RFC3986),
        ]);

        if ($workspaceTitle instanceof Htmlable) {
            $workspaceTitle = $workspaceTitle->toHtml();
        }

        $title = trim(strip_tags((string) $workspaceTitle));

        return [
            'enabled' => $this->hasWorkspace(),
            'panelId' => $panelId,
            'resourceSlug' => $resourceSlug,
            'resourceLabel' => $resource::getNavigationLabel(),
            'currentKey' => $currentKey,
            'currentUrl' => url()->full(),
            'currentTitle' => $title,
            'indexUrl' => $resource::hasPage('index') ? $resource::getUrl('index') : null,
            'spa' => $panel?->hasSpa() ?? false,
            'closeTabLabel' => __('primix::panel.workspace.close_tab'),
        ];
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
