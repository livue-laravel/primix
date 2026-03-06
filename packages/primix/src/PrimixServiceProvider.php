<?php

namespace Primix;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;
use LiVue\Facades\LiVueAsset;
use LiVue\Features\SupportAssets\Css;
use LiVue\Features\SupportAssets\Js;
use Primix\Components\NotificationManager;
use Primix\Resources\Actions;
use Primix\Routing\PanelRouteRegistrar;
use Primix\Support\AssetVersion;
use Primix\Support\ComponentTypeRegistry;
use Primix\View\Components\Pages\Page;
use Primix\View\Components\Pages\Simple;
use Primix\View\PanelViewComposer;

class PrimixServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(PanelRegistry::class, function () {
            return new PanelRegistry();
        });

        $this->mergeConfigFrom(__DIR__ . '/../config/primix.php', 'primix');
    }

    public function boot(): void
    {
        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'primix');

        $this->registerAssets();

        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__ . '/../config/primix.php' => config_path('primix.php'),
            ], 'primix-config');

            $this->publishes([
                __DIR__ . '/../resources/views' => resource_path('views/vendor/primix'),
            ], 'primix-views');

            $this->commands([
                Commands\MakePanelCommand::class,
                Commands\MakeResourceCommand::class,
                Commands\MakePageCommand::class,
                Commands\MakeThemeCommand::class,
                Commands\MakeUserCommand::class,
                Commands\MakeExporterCommand::class,
                Commands\MakeImporterCommand::class,
                Commands\MakeWidgetCommand::class,
                Commands\MakePluginCommand::class,
                Commands\MakePolicyCommand::class,
                Commands\MakeDashboardCommand::class,
            ]);
        }

        $this->registerBladeComponents();
        $this->registerLiVueComponents();
        $this->registerComponentTypes();
        $this->registerRoutes();
        $this->registerViewComposers();
    }

    protected function registerAssets(): void
    {
        $assetVersion = AssetVersion::resolve();

        LiVueAsset::register([
            Css::make('primix-panels', '/primix/primix-panels.css')->version($assetVersion),
            Js::make('primix-panels', '/primix/primix-panels.js')->module()->version($assetVersion),
        ], 'primix/primix');
    }

    protected function registerBladeComponents(): void
    {
        Blade::components([
            Page::class => 'primix::page',
            Simple::class => 'primix::simple',
        ]);

        Blade::componentNamespace('Primix\\View\\Components', 'primix');

        Blade::directive('renderHook', function ($expression) {
            return "<?php echo app(\Primix\Support\RenderHook\RenderHookManager::class)->render({$expression}, (isset(\$this) && method_exists(\$this, 'getRenderHookScopes')) ? \$this->getRenderHookScopes() : []); ?>";
        });
    }

    protected function registerLiVueComponents(): void
    {
        $livue = $this->app->make(\LiVue\LiVueManager::class);
        $livue->register('notification-manager', NotificationManager::class);
        $livue->register('primix-topbar', Components\Topbar::class);
        $livue->register('primix-sidebar', Components\Sidebar::class);
    }

    protected function registerViewComposers(): void
    {
        $composer = new PanelViewComposer();

        View::composer('primix::components.layouts.panel', function ($view) use ($composer) {
            $composer->composePanelLayout($view);
        });
        View::composer('primix::components.layouts.simple', function ($view) use ($composer) {
            $composer->composeSimpleLayout($view);
        });

        View::composer([
            'primix-actions::*',
            'primix-tables::*',
            'primix::components.page-header',
            'primix::components.panel-switcher',
        ], function ($view) {
            $panel = app(PanelRegistry::class)->getCurrentPanel();

            $view->with('spa', $panel?->hasSpa() ?? false);
        });
    }

    protected function registerComponentTypes(): void
    {
        $registry = $this->app->make(ComponentTypeRegistry::class);

        $registry->registerMany('action', [
            'create-action' => Actions\CreateAction::class,
            'edit-action' => Actions\EditAction::class,
            'view-action' => Actions\ViewAction::class,
            'delete-action' => Actions\DeleteAction::class,
            'force-delete-action' => Actions\ForceDeleteAction::class,
            'restore-action' => Actions\RestoreAction::class,
            'delete-bulk-action' => Actions\DeleteBulkAction::class,
            'force-delete-bulk-action' => Actions\ForceDeleteBulkAction::class,
            'restore-bulk-action' => Actions\RestoreBulkAction::class,
        ]);
    }

    protected function registerRoutes(): void
    {
        $this->app->booted(function () {
            $registry = $this->app->make(PanelRegistry::class);
            $registrar = new PanelRouteRegistrar();

            foreach ($registry->all() as $panel) {
                // Skip panels already registered via PanelProvider
                if ($panel->hasRoutesRegistered()) {
                    continue;
                }

                $panel->bootPlugins();
                $registrar->registerAuthRoutes($panel);
                $registrar->registerPanelRoutes($panel);
            }
        });
    }
}
