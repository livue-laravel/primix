<?php

namespace Primix\Details;

use Illuminate\Support\ServiceProvider;
use Primix\Support\ComponentTypeRegistry;

class PrimixDetailsServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'primix-details');

        $this->registerComponentTypes();

        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__ . '/../resources/views' => resource_path('views/vendor/primix-details'),
            ], 'primix-details-views');
        }
    }

    protected function registerComponentTypes(): void
    {
        $registry = $this->app->make(ComponentTypeRegistry::class);

        $registry->registerMany('entry', [
            'text-entry' => Components\Entries\TextEntry::class,
            'list-entry' => Components\Entries\ListEntry::class,
            'boolean-entry' => Components\Entries\BooleanEntry::class,
            'icon-entry' => Components\Entries\IconEntry::class,
            'color-entry' => Components\Entries\ColorEntry::class,
            'html-entry' => Components\Entries\HtmlEntry::class,
            'long-text-entry' => Components\Entries\LongTextEntry::class,
        ]);
    }
}
