<?php

use Primix\MultiTenant\Routing\TenantPanelRouteRegistrar;
use Primix\Panel;

it('builds path identification prefix as tenant segment before panel path', function () {
    config(['multi-tenant.panel.route_parameter' => 'tenant']);

    $panel = Panel::make('admin')->path('admin');
    $registrar = new TenantPanelRouteRegistrar();

    expect(callResolvePrefix($registrar, $panel, 'path'))->toBe('{tenant}/admin');
});

it('uses configured route parameter when building path identification prefix', function () {
    config(['multi-tenant.panel.route_parameter' => 'workspace']);

    $panel = Panel::make('admin')->path('admin');
    $registrar = new TenantPanelRouteRegistrar();

    expect(callResolvePrefix($registrar, $panel, 'path'))->toBe('{workspace}/admin');
});

it('keeps panel path untouched for non-path identification', function () {
    $panel = Panel::make('admin')->path('admin');
    $registrar = new TenantPanelRouteRegistrar();

    expect(callResolvePrefix($registrar, $panel, 'subdomain'))->toBe('admin')
        ->and(callResolvePrefix($registrar, $panel, 'domain'))->toBe('admin')
        ->and(callResolvePrefix($registrar, $panel, 'request_data'))->toBe('admin');
});

function callResolvePrefix(TenantPanelRouteRegistrar $registrar, Panel $panel, string $identification): string
{
    $method = new ReflectionMethod($registrar, 'resolvePrefix');
    $method->setAccessible(true);

    /** @var string $prefix */
    $prefix = $method->invoke($registrar, $panel, $identification);

    return $prefix;
}

