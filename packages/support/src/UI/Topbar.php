<?php

namespace Primix\Support\UI;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\View;
use Primix\Support\Components\Component;
use Primix\Support\Concerns\BelongsToLiVue;

class Topbar extends Component implements Htmlable
{
    use BelongsToLiVue;

    protected string $name = 'topbar';

    protected ?string $view = 'primix::ui.topbar';

    protected array $viewData = [];

    public static function make(): static
    {
        $instance = new static();
        $instance->configure();

        return $instance;
    }

    public function name(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function view(?string $view): static
    {
        $this->view = $view;

        return $this;
    }

    public function getView(): ?string
    {
        return $this->view;
    }

    public function viewData(array $data): static
    {
        $this->viewData = $data;

        return $this;
    }

    public function mergeViewData(array $data): static
    {
        $this->viewData = array_merge($this->viewData, $data);

        return $this;
    }

    public function getViewData(): array
    {
        $viewData = $this->viewData;

        if (array_key_exists('navigation', $viewData)) {
            $viewData['navigation'] = $this->normalizeNavigation($viewData['navigation']);
        }

        return $viewData;
    }

    public function toHtml(): string
    {
        $view = $this->getView();

        if ($view === null || $view === '') {
            return '';
        }

        $componentName = $this->getName();
        $componentViewData = [$componentName => $this];

        // Keep topbar available for compatibility in custom detached views.
        if ($componentName !== 'topbar') {
            $componentViewData['topbar'] = $this;
        }

        return View::make($view, array_merge(
            $this->getViewData(),
            $componentViewData
        ))->render();
    }

    protected function normalizeNavigation(mixed $navigation): array
    {
        if (! is_iterable($navigation)) {
            return [];
        }

        $normalized = [];

        foreach ($navigation as $item) {
            $normalizedItem = $this->normalizeNavigationItem($item);

            if ($normalizedItem === null) {
                continue;
            }

            $normalized[] = $normalizedItem;
        }

        return $normalized;
    }

    protected function normalizeNavigationItem(mixed $item): ?array
    {
        if (is_object($item)) {
            $item = $this->extractNavigationArrayFromObject($item);
        }

        if (! is_array($item)) {
            return null;
        }

        if ($this->isNavigationGroup($item)) {
            return $this->normalizeNavigationGroup($item);
        }

        return $this->normalizeNavigationLink($item);
    }

    protected function normalizeNavigationGroup(array $item): array
    {
        $normalized = $item;
        $normalized['type'] = is_string($item['type'] ?? null) ? $item['type'] : 'group';
        $normalized['label'] = $this->resolveNavigationLabel($item, 'Group');
        $normalized['items'] = $this->normalizeNavigation($item['items'] ?? []);

        return $normalized;
    }

    protected function normalizeNavigationLink(array $item): array
    {
        $normalized = $item;
        $normalized['type'] = is_string($item['type'] ?? null) ? $item['type'] : 'link';
        $normalized['label'] = $this->resolveNavigationLabel($item, 'Link');
        $normalized['url'] = $this->resolveNavigationUrl($item) ?? '#';
        $normalized['isActive'] = $this->resolveNavigationActiveState($item);

        if (array_key_exists('children', $item)) {
            $normalized['children'] = $this->normalizeNavigation($item['children']);
        }

        return $normalized;
    }

    protected function isNavigationGroup(array $item): bool
    {
        $type = $item['type'] ?? null;

        if (is_string($type) && in_array($type, ['group', 'sub-group'], true)) {
            return true;
        }

        return array_key_exists('items', $item) && is_iterable($item['items']);
    }

    protected function extractNavigationArrayFromObject(object $item): ?array
    {
        if ($item instanceof Arrayable) {
            $array = $item->toArray();

            return is_array($array) ? $array : null;
        }

        if (method_exists($item, 'toArray')) {
            $array = $item->toArray();

            if (is_array($array)) {
                return $array;
            }
        }

        $resolved = [];

        if (method_exists($item, 'getLabel')) {
            $resolved['label'] = $item->getLabel();
        }

        if (method_exists($item, 'getIcon')) {
            $resolved['icon'] = $item->getIcon();
        }

        if (method_exists($item, 'getItems')) {
            $resolved['items'] = $item->getItems();
        }

        if (method_exists($item, 'getUrl')) {
            $resolved['url'] = $item->getUrl();
        }

        if (method_exists($item, 'isActive')) {
            $resolved['isActive'] = (bool) $item->isActive();
        }

        if (method_exists($item, 'getBadge')) {
            $resolved['badge'] = $item->getBadge();
        }

        if (method_exists($item, 'getBadgeColor')) {
            $resolved['badgeColor'] = $item->getBadgeColor();
        }

        if (method_exists($item, 'getChildren')) {
            $resolved['children'] = $item->getChildren();
        }

        return $resolved === [] ? null : $resolved;
    }

    protected function resolveNavigationLabel(array $item, string $fallback): string
    {
        $label = $item['label'] ?? null;

        if (is_string($label) && $label !== '') {
            return $label;
        }

        if ($label instanceof Htmlable) {
            return $label->toHtml();
        }

        return $fallback;
    }

    protected function resolveNavigationUrl(array $item): ?string
    {
        $url = $item['url'] ?? null;

        if (is_scalar($url)) {
            $url = (string) $url;

            if ($url !== '') {
                return $url;
            }
        } elseif ($url instanceof \Stringable) {
            $url = (string) $url;

            if ($url !== '') {
                return $url;
            }
        }

        $route = $item['route'] ?? null;

        if (! is_string($route) || $route === '') {
            return null;
        }

        $parameters = $item['parameters'] ?? [];
        if (! is_array($parameters)) {
            $parameters = [];
        }

        try {
            return route($route, $parameters);
        } catch (\Throwable) {
            return null;
        }
    }

    protected function resolveNavigationActiveState(array $item): bool
    {
        if (array_key_exists('isActive', $item)) {
            return (bool) $item['isActive'];
        }

        $request = request();
        $route = $request->route();
        $routeName = $route?->getName();

        $activePatterns = $item['active'] ?? [];
        if (is_string($activePatterns)) {
            $activePatterns = [$activePatterns];
        }

        if (is_iterable($activePatterns)) {
            foreach ($activePatterns as $pattern) {
                if (! is_string($pattern) || $pattern === '') {
                    continue;
                }

                if ($request->routeIs($pattern)) {
                    return true;
                }

                if (is_string($routeName) && Str::is($pattern, $routeName)) {
                    return true;
                }
            }
        }

        $routePattern = $item['route'] ?? null;
        if (is_string($routePattern) && $routePattern !== '' && $request->routeIs($routePattern)) {
            return true;
        }

        $url = $this->resolveNavigationUrl($item);

        if ($url !== null && $url !== '' && $request->url() === $url) {
            return true;
        }

        return false;
    }
}
