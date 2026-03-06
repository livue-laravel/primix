<?php

namespace Primix\Support;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use LiVue\Features\SupportAssets\AssetManager as LiVueAssetManager;
use LiVue\Features\SupportAssets\Css;
use LiVue\Features\SupportAssets\Js;
use Primix\Support\Colors\ColorManager;
use Primix\Support\Http\Controllers\PrimixAssetController;
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
        $this->registerRoutes();
        $this->registerViews();
        $this->registerBladeDirectives();
        $this->registerAssetsWithLiVue();
    }

    protected function registerRoutes(): void
    {
        Route::prefix('primix')->group(function () {
            // Main bundles
            Route::get('/primix.js', [PrimixAssetController::class, 'script'])->name('primix.script');
            Route::get('/primix.css', [PrimixAssetController::class, 'style'])->name('primix.style');
            Route::get('/primix-support.js', [PrimixAssetController::class, 'support'])->name('primix.support');
            Route::get('/primix-support.css', [PrimixAssetController::class, 'supportStyle'])->name('primix.support.style');
            Route::get('/primix-forms.js', [PrimixAssetController::class, 'forms'])->name('primix.forms');
            Route::get('/primix-forms.css', [PrimixAssetController::class, 'formsStyle'])->name('primix.forms.style');
            Route::get('/primix-tables.js', [PrimixAssetController::class, 'tables'])->name('primix.tables');
            Route::get('/primix-tables.css', [PrimixAssetController::class, 'tablesStyle'])->name('primix.tables.style');
            Route::get('/primix-actions.js', [PrimixAssetController::class, 'actions'])->name('primix.actions');
            Route::get('/primix-actions.css', [PrimixAssetController::class, 'actionsStyle'])->name('primix.actions.style');
            Route::get('/primix-notifications.js', [PrimixAssetController::class, 'notifications'])->name('primix.notifications');
            Route::get('/primix-notifications.css', [PrimixAssetController::class, 'notificationsStyle'])->name('primix.notifications.style');
            Route::get('/primix-widgets.js', [PrimixAssetController::class, 'widgets'])->name('primix.widgets');
            Route::get('/primix-widgets.css', [PrimixAssetController::class, 'widgetsStyle'])->name('primix.widgets.style');
            Route::get('/primix-panels.js', [PrimixAssetController::class, 'panels'])->name('primix.panels');
            Route::get('/primix-panels.css', [PrimixAssetController::class, 'panelsStyle'])->name('primix.panels.style');

            // Chunk files (shared code between bundles)
            Route::get('/chunks/{filename}', [PrimixAssetController::class, 'chunk'])
                ->where('filename', '.*\.(js|css)')
                ->name('primix.chunk');
        });
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
     * Primix core assets are served by package routes (/primix/*) so
     * installation works in clean Laravel projects without app.js changes.
     */
    protected function registerAssetsWithLiVue(): void
    {
        $this->app->booted(function () {
            $assetManager = $this->app->make(LiVueAssetManager::class);
            $assetVersion = AssetVersion::resolve();

            // Register import map entries for ES module resolution
            $assetManager->registerImports([
                'livue' => url('livue/livue.js?module'),
                'vue' => 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js',
                '@imgly/background-removal' => 'https://esm.run/@imgly/background-removal@1.7.0',
            ]);

            // Register support bundle globally. Other package bundles are
            // registered by their own providers.
            $assetManager->register([
                Css::make('primix-support', '/primix/primix-support.css')->version($assetVersion),
                Js::make('primix-support', '/primix/primix-support.js')->module()->version($assetVersion),
            ], 'primix/support');
        });
    }
}
