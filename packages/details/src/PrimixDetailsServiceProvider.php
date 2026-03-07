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
        $registry->discoverInPath('Primix\\Details\\Components\\Entries', __DIR__ . '/Components/Entries');
    }
}
