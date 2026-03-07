<?php

namespace Primix\Support;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;
use LiVue\Features\SupportAssets\AssetManager as LiVueAssetManager;
use LiVue\Features\SupportAssets\Css;
use LiVue\Features\SupportAssets\Js;
use Primix\Support\Colors\ColorManager;
use Primix\Support\Icons\IconManager;
use Primix\Support\RenderHook\RenderHookManager;
use Primix\Support\Theme\ThemeManager;

class PrimixSupportServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(ComponentRegistry::class, fn () => new ComponentRegistry());
        $this->app->singleton(ColorManager::class, fn () => new ColorManager());
        $this->app->singleton(IconManager::class, fn () => new IconManager());
        $this->app->singleton(RenderHookManager::class, fn () => new RenderHookManager());
        $this->app->singleton(ThemeManager::class, fn ($app) => new ThemeManager(
            $app->make(LiVueAssetManager::class),
            $app->make(ColorManager::class),
        ));
        $this->app->singleton(ComponentTypeRegistry::class, fn () => new ComponentTypeRegistry());
        $this->app->singleton(SchemaBuilder::class, fn ($app) => new SchemaBuilder(
            $app->make(ComponentTypeRegistry::class),
        ));
        $this->app->singleton(SchemaValidator::class, fn ($app) => new SchemaValidator(
            $app->make(ComponentTypeRegistry::class),
        ));
    }

    public function boot(): void
    {
        $this->registerViews();
        $this->registerBladeDirectives();
        $this->registerAssetsWithLiVue();

        if ($this->app->runningInConsole()) {
            $this->registerAssetPublishing();
        }
    }

    protected function registerViews(): void
    {
        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'primix');
    }

    protected function registerBladeDirectives(): void
    {
        Blade::directive('primixIcon', function ($expression) {
            return "<?php echo app(\\Primix\\Support\\Icons\\IconManager::class)->render({$expression}); ?>";
        });
    }

    /**
     * Register Primix assets with LiVue's AssetManager.
     *
     * Primix core assets use LiVue's native published-assets path
     * (public/vendor/livue/{package}/{asset}.{ext}).
     */
    protected function registerAssetsWithLiVue(): void
    {
        $this->app->booted(function () {
            $assetManager = $this->app->make(LiVueAssetManager::class);
            $assetVersion = AssetVersion::resolve();
            $assetsBasePath = '/' . trim(config('livue.assets_path', 'vendor/livue'), '/');

            // Register import map entries for ES module resolution
            $assetManager->registerImports([
                'livue' => '/livue/livue.js?module',
                'vue' => 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js',
                '@imgly/background-removal' => 'https://esm.run/@imgly/background-removal@1.7.0',
            ]);

            // Register support bundle globally. Other package bundles are
            // registered by their own providers.
            $assetManager->register([
                Css::make('primix-support', "{$assetsBasePath}/primix/support/primix-support.css")->version($assetVersion),
                Js::make('primix-support', "{$assetsBasePath}/primix/support/primix-support.js")->module()->version($assetVersion),
            ], 'primix/support');
        });
    }

    protected function registerAssetPublishing(): void
    {
        $assets = [
            __DIR__ . '/../dist/primix-support.css' => public_path('vendor/livue/primix/support/primix-support.css'),
            __DIR__ . '/../dist/primix-support.js' => public_path('vendor/livue/primix/support/primix-support.js'),
            __DIR__ . '/../dist/primix-support.js.map' => public_path('vendor/livue/primix/support/primix-support.js.map'),
        ];

        $this->publishes($assets, 'primix-assets');
        $this->publishes($assets, 'livue-assets');
        $this->publishes($assets, 'laravel-assets');
    }
}
