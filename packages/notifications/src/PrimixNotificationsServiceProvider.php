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
        }
    }

    protected function registerAssets(): void
    {
        $assetVersion = AssetVersion::resolve();

        LiVueAsset::register([
            Css::make('primix-notifications', '/primix/primix-notifications.css')->version($assetVersion),
            Js::make('primix-notifications', '/primix/primix-notifications.js')->module()->version($assetVersion),
        ], 'primix/notifications');
    }
}
