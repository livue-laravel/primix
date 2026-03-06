<?php

namespace Primix\MultiTenant\Panel;

use Primix\MultiTenant\Routing\TenantPanelRouteRegistrar;
use Primix\PanelProvider;
use Primix\Routing\PanelRouteRegistrar;

abstract class TenantPanelProvider extends PanelProvider
{
    protected function getRouteRegistrar(): PanelRouteRegistrar
    {
        return new TenantPanelRouteRegistrar();
    }
}
