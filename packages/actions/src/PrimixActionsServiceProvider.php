<?php

namespace Primix\Actions;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;
use LiVue\Facades\LiVueAsset;
use LiVue\Features\SupportAssets\Css;
use LiVue\Features\SupportAssets\Js;
use Primix\Support\AssetVersion;
use Primix\Support\ComponentTypeRegistry;

class PrimixActionsServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'primix-actions');

        Blade::anonymousComponentPath(__DIR__ . '/../resources/views', 'primix-actions');

        $this->registerAssets();
        $this->registerComponentTypes();

        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__ . '/../resources/views' => resource_path('views/vendor/primix-actions'),
            ], 'primix-actions-views');

            $assets = [
                __DIR__ . '/../dist/primix-actions.css' => public_path('vendor/livue/primix/actions/primix-actions.css'),
                __DIR__ . '/../dist/primix-actions.js' => public_path('vendor/livue/primix/actions/primix-actions.js'),
                __DIR__ . '/../dist/primix-actions.js.map' => public_path('vendor/livue/primix/actions/primix-actions.js.map'),
            ];

            $this->publishes($assets, 'primix-assets');
            $this->publishes($assets, 'livue-assets');
            $this->publishes($assets, 'laravel-assets');

            $this->commands([
                Commands\MakeActionCommand::class,
            ]);
        }
    }

    protected function registerComponentTypes(): void
    {
        $registry = $this->app->make(ComponentTypeRegistry::class);
        $registry->discoverInPath('Primix\\Actions', __DIR__);
    }

    protected function registerAssets(): void
    {
        $assetVersion = AssetVersion::resolve();
        $assetsBasePath = '/' . trim(config('livue.assets_path', 'vendor/livue'), '/');

        LiVueAsset::register([
            Css::make('primix-actions', "{$assetsBasePath}/primix/actions/primix-actions.css")->version($assetVersion),
            Js::make('primix-actions', "{$assetsBasePath}/primix/actions/primix-actions.js")->module()->version($assetVersion),
        ], 'primix/actions');
    }
}
