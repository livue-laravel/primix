<?php

namespace Primix\Navigation;

use Primix\Pages\Page;
use Primix\Panel;
use Primix\Resources\Resource;

class NavigationBuilder
{
    protected Panel $panel;

    protected array $items = [];

    protected array $groups = [];

    public function __construct(Panel $panel)
    {
        $this->panel = $panel;
    }

    public function build(): array
    {
        $this->buildFromResources();
        $this->buildFromPages();

        // Apply custom navigation callback if set
        $customNavigation = $this->panel->getNavigation();

        if ($customNavigation) {
            $customNavigation($this);
        }

        return $this->getNavigation();
    }

    protected function buildFromResources(): void
    {
        $panelId = $this->panel->getId();
        $routePrefix = "primix.{$panelId}.";

        foreach ($this->panel->getResources() as $resource) {
            if (! $resource::shouldRegisterNavigation()) {
                continue;
            }

            $slug = $resource::getSlug();

            $item = NavigationItem::make()
                ->label($resource::getNavigationLabel())
                ->icon($resource::getNavigationIcon())
                ->url(route("{$routePrefix}{$slug}.index"))
                ->group($resource::getNavigationGroup())
                ->subGroup($resource::getNavigationSubGroup())
                ->sort($resource::getNavigationSort())
                ->isActiveWhen(fn () => request()->routeIs("{$routePrefix}{$slug}.*"));

            $this->addItem($item);
        }
    }

    protected function buildFromPages(): void
    {
        $panelId = $this->panel->getId();

        foreach ($this->panel->getPages() as $page) {
            if (! $page::shouldRegisterNavigation()) {
                continue;
            }

            $routeName = $page::getRouteName($panelId);

            $item = NavigationItem::make()
                ->label($page::getNavigationLabel())
                ->icon($page::getNavigationIcon())
                ->url(route($routeName))
                ->group($page::getNavigationGroup())
                ->subGroup($page::getNavigationSubGroup())
                ->sort($page::getNavigationSort())
                ->isActiveWhen(fn () => request()->routeIs($routeName));

            $this->addItem($item);
        }
    }

    public function addItem(NavigationItem $item): static
    {
        $this->items[] = $item;

        return $this;
    }

    public function addGroup(NavigationGroup $group): static
    {
        $this->groups[$group->getLabel()] = $group;

        return $this;
    }

    public function getNavigation(): array
    {
        $ungrouped = [];
        $grouped = [];

        foreach ($this->items as $item) {
            $groupLabel = $item->getGroup();

            if ($groupLabel === null) {
                $ungrouped[] = $item;
            } else {
                if (! isset($grouped[$groupLabel])) {
                    $grouped[$groupLabel] = [];
                }

                $grouped[$groupLabel][] = $item;
            }
        }

        // Sort ungrouped items
        usort($ungrouped, fn ($a, $b) => ($a->getSort() ?? 0) <=> ($b->getSort() ?? 0));

        // Build groups
        $result = [];

        foreach ($ungrouped as $item) {
            $result[] = $item->toArray();
        }

        foreach ($grouped as $label => $items) {
            usort($items, fn ($a, $b) => ($a->getSort() ?? 0) <=> ($b->getSort() ?? 0));

            $group = $this->groups[$label] ?? NavigationGroup::make()->label($label);

            $result[] = array_merge($group->toArray(), [
                'items' => $this->buildSubGroups($items),
            ]);
        }

        return $result;
    }

    protected function buildSubGroups(array $items): array
    {
        $direct = [];
        $subGrouped = [];

        foreach ($items as $item) {
            $subGroupLabel = $item->getSubGroup();

            if ($subGroupLabel === null) {
                $direct[] = $item->toArray();
            } else {
                $subGrouped[$subGroupLabel][] = $item;
            }
        }

        $result = $direct;

        foreach ($subGrouped as $label => $subItems) {
            $result[] = [
                'type' => 'sub-group',
                'label' => $label,
                'items' => array_map(fn ($item) => $item->toArray(), $subItems),
            ];
        }

        return $result;
    }
}
