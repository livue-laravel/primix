<?php

namespace Primix\Notifications;

use Illuminate\Support\ServiceProvider;
use LiVue\Facades\LiVueAsset;
use LiVue\Features\SupportAssets\Css;
use LiVue\Features\SupportAssets\Js;
use Primix\Support\AssetVersion;

class PrimixNotificationsServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'primix-notifications');
        $this->loadMigrationsFrom(__DIR__ . '/../database/migrations');

        $this->registerAssets();

        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__ . '/../resources/views' => resource_path('views/vendor/primix-notifications'),
            ], 'primix-notifications-views');

            $assets = [
                __DIR__ . '/../dist/primix-notifications.css' => public_path('vendor/livue/primix/notifications/primix-notifications.css'),
                __DIR__ . '/../dist/primix-notifications.js' => public_path('vendor/livue/primix/notifications/primix-notifications.js'),
                __DIR__ . '/../dist/primix-notifications.js.map' => public_path('vendor/livue/primix/notifications/primix-notifications.js.map'),
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
            Css::make('primix-notifications', "{$assetsBasePath}/primix/notifications/primix-notifications.css")->version($assetVersion),
            Js::make('primix-notifications', "{$assetsBasePath}/primix/notifications/primix-notifications.js")->module()->version($assetVersion),
        ], 'primix/notifications');
    }
}
