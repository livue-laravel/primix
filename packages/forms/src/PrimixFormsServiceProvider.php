<?php

namespace Primix\Forms;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use LiVue\Facades\LiVueAsset;
use LiVue\Features\SupportAssets\Css;
use LiVue\Features\SupportAssets\Js;
use Primix\Forms\Http\Controllers\ImageEditorController;
use Primix\Forms\ImageEditor\ImageProcessorRegistry;
use Primix\Forms\ImageEditor\Processors\AutoEnhanceProcessor;
use Primix\Forms\ImageEditor\Processors\BackgroundRemovalProcessor;
use Primix\Forms\ImageEditor\Processors\UpscaleProcessor;
use Primix\Support\AssetVersion;
use Primix\Support\ComponentTypeRegistry;

class PrimixFormsServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(ImageProcessorRegistry::class, function () {
            $registry = new ImageProcessorRegistry;

            // Register auto-enhance (no external API needed)
            $registry->register('auto-enhance', new AutoEnhanceProcessor);

            // Register background removal if configured
            $apiKey = config('primix.image-editor.ai.background-removal.api_key');
            if ($apiKey) {
                $registry->register('background-removal', new BackgroundRemovalProcessor(
                    driver: config('primix.image-editor.ai.background-removal.driver', 'remove-bg'),
                    apiKey: $apiKey,
                ));
            }

            // Register upscale if configured
            $apiToken = config('primix.image-editor.ai.upscale.api_token');
            if ($apiToken) {
                $registry->register('upscale', new UpscaleProcessor(
                    driver: config('primix.image-editor.ai.upscale.driver', 'replicate'),
                    apiToken: $apiToken,
                ));
            }

            return $registry;
        });
    }

    public function boot(): void
    {
        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'primix-forms');
        $this->loadTranslationsFrom(__DIR__ . '/../resources/lang', 'primix-forms');

        $this->registerAssets();
        $this->registerRoutes();
        $this->registerComponentTypes();

        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__ . '/../resources/views' => resource_path('views/vendor/primix-forms'),
            ], 'primix-forms-views');

            $this->publishes([
                __DIR__ . '/../resources/lang' => lang_path('vendor/primix-forms'),
            ], 'primix-forms-translations');

            $assets = [
                __DIR__ . '/../dist/primix-forms.css' => public_path('vendor/livue/primix/forms/primix-forms.css'),
                __DIR__ . '/../dist/primix-forms.js' => public_path('vendor/livue/primix/forms/primix-forms.js'),
                __DIR__ . '/../dist/primix-forms.js.map' => public_path('vendor/livue/primix/forms/primix-forms.js.map'),
            ];

            $this->publishes($assets, 'primix-assets');
            $this->publishes($assets, 'livue-assets');
            $this->publishes($assets, 'laravel-assets');
        }
    }

    protected function registerAssets(): void
    {
        $assetVersion = AssetVersion::resolve();
        $assetsBasePath = '/' . trim(config('livue.assets_path', 'vendor/livue'), '/');

        LiVueAsset::register([
            Css::make('primix-forms', "{$assetsBasePath}/primix/forms/primix-forms.css")->onRequest()->version($assetVersion),
            Js::make('primix-forms', "{$assetsBasePath}/primix/forms/primix-forms.js")->module()->onRequest()->version($assetVersion),
        ], 'primix/forms');
    }

    protected function registerComponentTypes(): void
    {
        $registry = $this->app->make(ComponentTypeRegistry::class);
        $registry->discoverInPath('Primix\\Forms\\Components', __DIR__ . '/Components');
    }

    protected function registerRoutes(): void
    {
        Route::prefix('primix')
            ->middleware('web')
            ->group(function () {
                Route::post('/image-editor/process', [ImageEditorController::class, 'process'])
                    ->name('primix.image-editor.process');
            });
    }
}
