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

            $this->commands([
                Commands\MakeActionCommand::class,
            ]);
        }
    }

    protected function registerComponentTypes(): void
    {
        $registry = $this->app->make(ComponentTypeRegistry::class);

        $registry->registerMany('action', [
            'action' => Action::class,
            'bulk-action' => BulkAction::class,
            'action-group' => ActionGroup::class,
            'view-action' => ViewAction::class,
        ]);
    }

    protected function registerAssets(): void
    {
        $assetVersion = AssetVersion::resolve();

        LiVueAsset::register([
            Css::make('primix-actions', '/primix/primix-actions.css')->version($assetVersion),
            Js::make('primix-actions', '/primix/primix-actions.js')->module()->version($assetVersion),
        ], 'primix/actions');
    }
}
