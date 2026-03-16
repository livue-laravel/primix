<?php

namespace Primix\Pages;

use LiVue\Attributes\Layout;
use Primix\Concerns\HasPageActions;
use Primix\Concerns\HasWidgets;
use Primix\Facades\Primix;
use Primix\PanelRegistry;
use Primix\Support\Enums\Width;
use Primix\Support\UI\HasSidebar;
use Primix\Support\UI\HasTopbar;
use Primix\Support\UI\Sidebar;
use Primix\Support\UI\Topbar;
use Primix\View\PanelSidebarDataResolver;
use Primix\View\PanelTopbarDataResolver;

#[Layout('primix::components.layouts.panel')]
abstract class Page extends SimplePage
{
    use HasPageActions;
    use HasSidebar;
    use HasTopbar;
    use HasWidgets;

    protected static ?string $navigationIcon = null;

    protected static ?string $navigationLabel = null;

    protected static ?string $navigationGroup = null;

    protected static ?string $navigationSubGroup = null;

    protected static ?int $navigationSort = null;

    protected static ?Width $maxContentWidth = null;

    protected static bool $shouldRegisterNavigation = true;

    public static function getNavigationLabel(): string
    {
        return static::$navigationLabel ?? str(class_basename(static::class))
            ->headline()
            ->toString();
    }

    public static function getNavigationIcon(): ?string
    {
        return static::$navigationIcon;
    }

    public static function getNavigationGroup(): ?string
    {
        return static::$navigationGroup;
    }

    public static function getNavigationSubGroup(): ?string
    {
        return static::$navigationSubGroup;
    }

    public static function getNavigationSort(): ?int
    {
        return static::$navigationSort;
    }

    public function getMaxContentWidth(): Width
    {
        if (static::$maxContentWidth !== null) {
            return static::$maxContentWidth;
        }

        $panel = Primix::getCurrentPanel();

        if ($panel?->getMaxContentWidth()) {
            return $panel->getMaxContentWidth();
        }

        return Width::SevenExtraLarge;
    }

    public function getLayoutData(): array
    {
        return [
            'maxContentWidth' => $this->getMaxContentWidth(),
            'sidebar' => $this->sidebar,
            'topbar' => $this->topbar,
        ];
    }

    public function sidebar(Sidebar $sidebar): Sidebar
    {
        $panel = Primix::getCurrentPanel();

        if ($panel === null) {
            return $sidebar->view(null);
        }

        $payload = app(PanelSidebarDataResolver::class)->resolve($panel);

        return $sidebar
            ->view('primix::ui.panel-sidebar')
            ->viewData($payload);
    }

    public function topbar(Topbar $topbar): Topbar
    {
        $panel = Primix::getCurrentPanel();

        if ($panel === null) {
            return $topbar->view(null);
        }

        $payload = app(PanelTopbarDataResolver::class)->resolve(
            $panel,
            app(PanelRegistry::class)
        );

        return $topbar
            ->view('primix::ui.panel-topbar')
            ->viewData($payload);
    }

    public function getTitle(): string
    {
        return $this->title ?? static::getNavigationLabel();
    }

    /**
     * @return array<int, array{label: string, url?: string, icon?: string}>
     */
    public function getBreadcrumbs(): array
    {
        if (! $this->shouldShowBreadcrumbs()) {
            return [];
        }

        if (static::getSlug() === '') {
            return [];
        }

        $current = parent::getBreadcrumbs();
        $homePage = $this->resolvePanelHomePage();

        if ($homePage === null || $homePage === static::class) {
            return $current;
        }

        $panelId = Primix::getCurrentPanel()?->getId();
        $homeBreadcrumbAttributes = [];
        $homeUrl = $this->resolveBreadcrumbUrl(
            fn (): string => $homePage::getUrl([], $panelId),
        );

        if ($homeUrl !== null) {
            $homeBreadcrumbAttributes['url'] = $homeUrl;
        }

        return [
            $this->makeBreadcrumbItem(
                $this->resolveHomeBreadcrumbLabel($homePage),
                $homeBreadcrumbAttributes,
            ),
            ...$current,
        ];
    }

    protected function resolvePanelHomePage(): ?string
    {
        $panel = Primix::getCurrentPanel();

        if ($panel === null) {
            return null;
        }

        foreach ($panel->getPages() as $page) {
            if (! method_exists($page, 'getSlug')) {
                continue;
            }

            if ($page::getSlug() === '') {
                return $page;
            }
        }

        return null;
    }

    protected function resolveHomeBreadcrumbLabel(string $homePage): string
    {
        if (is_subclass_of($homePage, self::class)) {
            return $homePage::getNavigationLabel();
        }

        return str(class_basename($homePage))->headline()->toString();
    }
}
