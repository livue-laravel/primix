<?php

namespace Primix\Widgets;

use Illuminate\Support\ServiceProvider;
use LiVue\Facades\LiVueAsset;
use LiVue\Features\SupportAssets\Css;
use LiVue\Features\SupportAssets\Js;
use Primix\Support\AssetVersion;

class PrimixWidgetsServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'primix-widgets');

        $this->registerAssets();

        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__ . '/../resources/views' => resource_path('views/vendor/primix-widgets'),
            ], 'primix-widgets-views');

            $assets = [
                __DIR__ . '/../dist/primix-widgets.css' => public_path('vendor/livue/primix/widgets/primix-widgets.css'),
                __DIR__ . '/../dist/primix-widgets.js' => public_path('vendor/livue/primix/widgets/primix-widgets.js'),
                __DIR__ . '/../dist/primix-widgets.js.map' => public_path('vendor/livue/primix/widgets/primix-widgets.js.map'),
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
            Css::make('primix-widgets', "{$assetsBasePath}/primix/widgets/primix-widgets.css")->version($assetVersion),
            Js::make('primix-widgets', "{$assetsBasePath}/primix/widgets/primix-widgets.js")->module()->version($assetVersion),
        ], 'primix/widgets');
    }
}
