<?php

namespace Primix\Components;

use LiVue\Attributes\Island;
use LiVue\Attributes\Json;
use LiVue\Component;
use Primix\Concerns\UseDatabaseNotifications;
use Primix\Concerns\UsePanelConfiguration;
use Primix\GlobalSearch\GlobalSearch;
use Primix\PanelRegistry;

#[Island]
class Topbar extends Component
{
    use UseDatabaseNotifications;
    use UsePanelConfiguration;

    public array $navigation = [];

    public array $menuItems = [];

    public array $menubarPt = [];

    public ?string $brandName = null;

    public ?string $brandLogo = null;

    public ?string $brandLogoDark = null;

    public bool $topBarNavigation = false;

    public bool $fixedTopbar = true;

    public bool $spa = false;

    public bool $hasDarkMode = true;

    public array $userMenu = [];

    public bool $hasGlobalSearch = false;

    public string $globalSearchMode = 'spotlight';

    public string $panelId = '';

    public bool $hasTenantMenu = false;

    public array $tenantMenu = [];

    public bool $hasDatabaseNotifications = false;

    public string $databaseNotificationsMode = 'popup';

    public int $databaseNotificationsPollingInterval = 30;

    #[Json]
    public function search(string $query): array
    {
        if (strlen($query) < 2) {
            return [];
        }

        $registry = app(PanelRegistry::class);

        // Restore panel context during AJAX calls
        if ($this->panelId) {
            $registry->setCurrentPanel($this->panelId);
        }

        $panel = $registry->get($this->panelId) ?? $registry->getCurrentPanel();

        $search = new GlobalSearch($panel, $registry);

        return array_map(fn ($group) => [
            'label' => $group->label,
            'icon' => $group->icon,
            'panelLabel' => $group->panelLabel,
            'results' => array_map(fn ($r) => [
                'title' => $r->title,
                'url' => $r->url,
                'details' => $r->details,
                'panelId' => $r->panelId,
            ], $group->results),
        ], $search->search($query));
    }

    public function mount(): void
    {
        if ($this->topBarNavigation) {
            $this->menuItems = $this->buildMenuItems($this->navigation);
            $this->menubarPt = $this->buildMenubarPt();
        }
    }

    public function shouldCloak(): bool
    {
        return false;
    }

    protected function render(): string
    {
        return 'primix::components.topbar';
    }

    /**
     * Transform Primix navigation array into PrimeVue Menubar model format.
     */
    private function buildMenuItems(array $navigation): array
    {
        $items = [];

        foreach ($navigation as $navItem) {
            if (isset($navItem['items'])) {
                // Group with sub-items
                $items[] = $this->buildGroupItem($navItem);
            } else {
                // Direct link
                $items[] = $this->buildLinkItem($navItem);
            }
        }

        return $items;
    }

    /**
     * Build a PrimeVue menu item for a navigation group (dropdown).
     */
    private function buildGroupItem(array $group): array
    {
        $subItems = [];

        foreach ($group['items'] as $item) {
            if (($item['type'] ?? null) === 'sub-group') {
                // Add separator before sub-group (unless it's the first item)
                if (! empty($subItems)) {
                    $subItems[] = ['separator' => true];
                }

                // Flatten sub-group items into the dropdown
                foreach ($item['items'] as $subItem) {
                    $subItems[] = $this->buildLinkItem($subItem);
                }
            } else {
                $subItems[] = $this->buildLinkItem($item);
            }
        }

        $menuItem = [
            'label' => $group['label'],
            'items' => $subItems,
        ];

        if ($group['icon'] ?? null) {
            $menuItem['icon'] = $group['icon'];
        }

        return $menuItem;
    }

    /**
     * Build a PrimeVue menu item for a direct link.
     */
    private function buildLinkItem(array $item): array
    {
        $menuItem = [
            'label' => $item['label'],
            'url' => $item['url'] ?? null,
        ];

        if ($item['isActive'] ?? false) {
            $menuItem['class'] = 'primix-nav-active';
        }

        if ($item['icon'] ?? null) {
            $menuItem['icon'] = $item['icon'];
        }

        if ($item['badge'] ?? null) {
            $menuItem['badge'] = $item['badge'];
        }

        return $menuItem;
    }

    /**
     * Build PassThrough configuration for the Menubar.
     */
    private function buildMenubarPt(): array
    {
        $pt = [
            'root' => ['class' => 'h-10 rounded-none px-0 mx-0'],
            'item' => ['class' => 'h-full px-0 mx-0'],
            'itemLink' => ['class' => 'rounded-none'],
            'submenu' => ['class' => 'z-100 rounded-none'],
        ];

        if ($this->spa) {
            $pt['itemLink']['data-livue-navigate'] = 'true';
        }

        return $pt;
    }
}
