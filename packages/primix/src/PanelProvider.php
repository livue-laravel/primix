<?php

namespace Primix;

use Illuminate\Support\ServiceProvider;
use Primix\Routing\PanelRouteRegistrar;

abstract class PanelProvider extends ServiceProvider
{
    abstract public function panel(Panel $panel): Panel;

    public function getId(): string
    {
        return str(class_basename(static::class))
            ->beforeLast('PanelProvider')
            ->lower()
            ->toString();
    }

    public function boot(): void
    {
        $registry = $this->app->make(PanelRegistry::class);

        $panel = Panel::make($this->getId());
        $registry->applyGlobalConfiguration($panel);
        $panel = $this->panel($panel);

        $registry->register($panel);

        // Mark early so PrimixServiceProvider's fallback skips this panel
        $panel->markRoutesRegistered();

        $this->app->booted(function () use ($panel) {
            $panel->bootPlugins();

            $registrar = $this->getRouteRegistrar();
            $registrar->registerAuthRoutes($panel);
            $registrar->registerPanelRoutes($panel);
        });
    }

    protected function getRouteRegistrar(): PanelRouteRegistrar
    {
        return new PanelRouteRegistrar();
    }
}
