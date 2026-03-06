<?php

namespace Primix\Tables;

use Illuminate\Support\ServiceProvider;
use LiVue\Facades\LiVueAsset;
use LiVue\Features\SupportAssets\Css;
use LiVue\Features\SupportAssets\Js;
use Primix\Support\AssetVersion;
use Primix\Support\ComponentTypeRegistry;
use Primix\Support\ViteHot;

class PrimixTablesServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'primix-tables');

        $this->registerAssets();
        $this->registerComponentTypes();

        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__ . '/../resources/views' => resource_path('views/vendor/primix-tables'),
            ], 'primix-tables-views');

            $this->commands([
                Commands\MakeFilterCommand::class,
            ]);
        }
    }

    protected function registerComponentTypes(): void
    {
        $registry = $this->app->make(ComponentTypeRegistry::class);

        $registry->registerMany('column', [
            'text-column' => Columns\TextColumn::class,
            'badge-column' => Columns\BadgeColumn::class,
            'image-column' => Columns\ImageColumn::class,
            'icon-column' => Columns\IconColumn::class,
            'color-column' => Columns\ColorColumn::class,
            'checkbox-column' => Columns\CheckboxColumn::class,
            'select-column' => Columns\SelectColumn::class,
            'text-input-column' => Columns\TextInputColumn::class,
            'toggle-column' => Columns\ToggleColumn::class,
        ]);

        $registry->registerMany('filter', [
            'select-filter' => Filters\SelectFilter::class,
            'date-filter' => Filters\DateFilter::class,
            'boolean-filter' => Filters\BooleanFilter::class,
            'ternary-filter' => Filters\TernaryFilter::class,
            'trashed-filter' => Filters\TrashedFilter::class,
        ]);
    }

    protected function registerAssets(): void
    {
        $assetVersion = AssetVersion::resolve();
        $isVite = (bool) config('primix.vite', true);

        if ($isVite && ViteHot::isRunning()) {
            return;
        }

        LiVueAsset::register([
            Css::make('primix-tables', '/primix/primix-tables.css')->onRequest()->version($assetVersion),
            Js::make('primix-tables', '/primix/primix-tables.js')->module()->onRequest()->version($assetVersion),
        ], 'primix/tables');
    }
}
