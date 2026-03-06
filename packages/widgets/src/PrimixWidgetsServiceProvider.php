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
        }
    }

    protected function registerAssets(): void
    {
        $assetVersion = AssetVersion::resolve();

        LiVueAsset::register([
            Css::make('primix-widgets', '/primix/primix-widgets.css')->version($assetVersion),
            Js::make('primix-widgets', '/primix/primix-widgets.js')->module()->version($assetVersion),
        ], 'primix/widgets');
    }
}
