<?php

namespace Primix;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;
use LiVue\Facades\LiVueAsset;
use LiVue\Features\SupportAssets\Css;
use LiVue\Features\SupportAssets\Js;
use Primix\Components\NotificationManager;
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
        $this->mergeConfigFrom(__DIR__ . '/../config/primix.php', 'primix');

        $this->app->singleton(PanelRegistry::class, function () {
            return new PanelRegistry();
        });

        $this->discoverPanelProviders();
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

            $assets = [
                __DIR__ . '/../dist/primix-panels.css' => public_path('vendor/livue/primix/primix/primix-panels.css'),
                __DIR__ . '/../dist/primix-panels.js' => public_path('vendor/livue/primix/primix/primix-panels.js'),
                __DIR__ . '/../dist/primix-panels.js.map' => public_path('vendor/livue/primix/primix/primix-panels.js.map'),
            ];

            $this->publishes($assets, 'primix-assets');
            $this->publishes($assets, 'livue-assets');
            $this->publishes($assets, 'laravel-assets');

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
        $assetsBasePath = '/' . trim(config('livue.assets_path', 'vendor/livue'), '/');

        LiVueAsset::register([
            Css::make('primix-panels', "{$assetsBasePath}/primix/primix/primix-panels.css")->version($assetVersion),
            Js::make('primix-panels', "{$assetsBasePath}/primix/primix/primix-panels.js")->module()->version($assetVersion),
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

    protected function discoverPanelProviders(): void
    {
        if (! config('primix.panels.autodiscovery', true)) {
            return;
        }

        $path = app_path('Providers');

        if (! is_dir($path)) {
            return;
        }

        foreach (glob($path . '/*PanelProvider.php') as $file) {
            $class = 'App\\Providers\\' . basename($file, '.php');

            if (! class_exists($class)) {
                continue;
            }

            if (! is_subclass_of($class, PanelProvider::class)) {
                continue;
            }

            $this->app->register($class);
        }
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
        $registry->discoverInPath('Primix\\Resources\\Actions', __DIR__ . '/Resources/Actions');
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
