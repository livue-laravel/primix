<?php

use Illuminate\Routing\RouteCollection;
use Illuminate\Support\Facades\Route;
use Primix\Panel;
use Primix\Pages\Auth\Register;
use Primix\Routing\PanelRouteRegistrar;

beforeEach(function () {
    app('router')->setRoutes(new RouteCollection());
});

it('applies panel domain to auth routes', function () {
    $panel = Panel::make('domain-auth')
        ->path('panel-domain-auth')
        ->domain('admin.example.com')
        ->login();

    (new PanelRouteRegistrar())->registerAuthRoutes($panel);

    $loginRoute = collect(Route::getRoutes()->getRoutes())
        ->first(fn ($route) => $route->uri() === 'panel-domain-auth/login' && in_array('GET', $route->methods(), true));

    expect($loginRoute)->not->toBeNull()
        ->and($loginRoute->getDomain())->toBe('admin.example.com');
});

it('applies panel domain to panel routes', function () {
    $panel = Panel::make('domain-panel')
        ->path('panel-domain-panel')
        ->domain('admin.example.com')
        ->pages([Register::class]);

    (new PanelRouteRegistrar())->registerPanelRoutes($panel);

    $pageRoute = collect(Route::getRoutes()->getRoutes())
        ->first(fn ($route) => $route->uri() === 'panel-domain-panel/register' && in_array('GET', $route->methods(), true));

    expect($pageRoute)->not->toBeNull()
        ->and($pageRoute->getDomain())->toBe('admin.example.com');
});
