<?php

use Primix\Panel;
use Primix\PanelRegistry;
use Primix\GlobalSearch\GlobalSearchMode;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;

// ============================================================
// Registration
// ============================================================

it('registers a panel', function () {
    $registry = new PanelRegistry();
    $panel = Panel::make('admin');

    $registry->register($panel);

    expect($registry->get('admin'))->toBe($panel);
});

it('auto-sets first registered panel as current', function () {
    $registry = new PanelRegistry();

    $registry->register(Panel::make('first'));
    $registry->register(Panel::make('second'));

    expect($registry->getCurrentPanelId())->toBe('first');
});

it('auto-sets default panel as current over first', function () {
    $registry = new PanelRegistry();

    $registry->register(Panel::make('first'));
    $registry->register(Panel::make('default-panel')->default());

    expect($registry->getCurrentPanelId())->toBe('default-panel');
});

// ============================================================
// Retrieval
// ============================================================

it('get returns panel by id', function () {
    $registry = new PanelRegistry();
    $panel = Panel::make('admin');
    $registry->register($panel);

    expect($registry->get('admin'))->toBe($panel);
});

it('get returns null for unknown id', function () {
    $registry = new PanelRegistry();

    expect($registry->get('missing'))->toBeNull();
});

it('all returns all registered panels', function () {
    $registry = new PanelRegistry();
    $registry->register(Panel::make('admin'));
    $registry->register(Panel::make('client'));

    expect($registry->all())->toHaveCount(2)
        ->and(array_keys($registry->all()))->toBe(['admin', 'client']);
});

// ============================================================
// Current Panel
// ============================================================

it('has null currentPanelId when empty', function () {
    expect((new PanelRegistry())->getCurrentPanelId())->toBeNull();
});

it('can set current panel', function () {
    $registry = new PanelRegistry();
    $registry->register(Panel::make('admin'));
    $registry->register(Panel::make('client'));

    $registry->setCurrentPanel('client');

    expect($registry->getCurrentPanelId())->toBe('client');
});

it('getCurrentPanel returns panel by currentPanelId', function () {
    $registry = new PanelRegistry();
    $admin = Panel::make('admin');
    $client = Panel::make('client');
    $registry->register($admin);
    $registry->register($client);

    $registry->setCurrentPanel('client');

    expect($registry->getCurrentPanel())->toBe($client);
});

it('getCurrentPanel prefers route panel context over currentPanelId', function () {
    $registry = new PanelRegistry();
    $admin = Panel::make('admin');
    $client = Panel::make('client');
    $registry->register($admin);
    $registry->register($client);
    $registry->setCurrentPanel('admin');

    $request = Request::create('/client');
    $route = new Route('GET', '/client', fn () => null);
    $route->defaults('_panel', 'client');
    $request->setRouteResolver(fn () => $route);
    app()->instance('request', $request);

    expect($registry->getCurrentPanel())->toBe($client)
        ->and($registry->getCurrentPanelId())->toBe('client');
});

it('getCurrentPanel falls back to session panel context when route panel is missing', function () {
    $registry = new PanelRegistry();
    $admin = Panel::make('admin');
    $client = Panel::make('client');
    $registry->register($admin);
    $registry->register($client);
    $registry->setCurrentPanel('admin');

    $request = Request::create('/livue/update', 'POST');
    $request->setRouteResolver(fn () => null);
    app()->instance('request', $request);
    session(['primix.current_panel' => 'client']);

    expect($registry->getCurrentPanel())->toBe($client)
        ->and($registry->getCurrentPanelId())->toBe('client');
});

// ============================================================
// Default Panel
// ============================================================

it('getDefault returns panel marked as default', function () {
    $registry = new PanelRegistry();
    $registry->register(Panel::make('admin'));
    $registry->register(Panel::make('main')->default());

    expect($registry->getDefault())->toBe($registry->get('main'));
});

it('getDefault falls back to first registered panel', function () {
    $registry = new PanelRegistry();
    $admin = Panel::make('admin');
    $registry->register($admin);
    $registry->register(Panel::make('client'));

    expect($registry->getDefault())->toBe($admin);
});

it('getDefault returns null when no panels registered', function () {
    expect((new PanelRegistry())->getDefault())->toBeNull();
});

// ============================================================
// Route Prefix
// ============================================================

it('getRoutePrefix uses current panel id', function () {
    $registry = new PanelRegistry();
    $registry->register(Panel::make('admin'));

    expect($registry->getRoutePrefix())->toBe('primix.admin.');
});

it('getRoutePrefix uses explicit panel id', function () {
    $registry = new PanelRegistry();
    $registry->register(Panel::make('admin'));

    expect($registry->getRoutePrefix('client'))->toBe('primix.client.');
});

// ============================================================
// Global Configuration
// ============================================================

it('applies global configuration to panel', function () {
    $registry = new PanelRegistry();
    $panel = Panel::make('admin');
    $registry->register($panel);

    $registry->configurePanelUsing(function ($config) {
        $config->darkMode(false);
    });

    $registry->applyGlobalConfiguration($panel);

    expect($panel->hasDarkMode())->toBeFalse();
});

it('applies breadcrumbs configuration to panel', function () {
    $registry = new PanelRegistry();
    $panel = Panel::make('admin');
    $registry->register($panel);

    $registry->configurePanelUsing(function ($config) {
        $config->breadcrumbs(false);
    });

    $registry->applyGlobalConfiguration($panel);

    expect($panel->hasBreadcrumbs())->toBeFalse();
});

it('skips excluded panel in global configuration', function () {
    $registry = new PanelRegistry();
    $admin = Panel::make('admin');
    $client = Panel::make('client');
    $registry->register($admin);
    $registry->register($client);

    $registry->configurePanelUsing(function ($config) {
        $config->darkMode(false, ['admin']);
    });

    $registry->applyGlobalConfiguration($admin);
    $registry->applyGlobalConfiguration($client);

    expect($admin->hasDarkMode())->toBeTrue()
        ->and($client->hasDarkMode())->toBeFalse();
});

it('isPanelExcluded matches by panel id', function () {
    $registry = new PanelRegistry();
    $panel = Panel::make('admin');

    expect($registry->isPanelExcluded($panel, ['admin']))->toBeTrue()
        ->and($registry->isPanelExcluded($panel, ['other']))->toBeFalse()
        ->and($registry->isPanelExcluded($panel, []))->toBeFalse();
});

// ============================================================
// Cross Panel Search
// ============================================================

it('has cross panel search disabled by default', function () {
    expect((new PanelRegistry())->isCrossPanelSearchEnabled())->toBeFalse();
});

it('can enable cross panel search', function () {
    $registry = new PanelRegistry();
    $registry->enableCrossPanelSearch(true);

    expect($registry->isCrossPanelSearchEnabled())->toBeTrue();
});

it('supports closure for cross panel search', function () {
    $registry = new PanelRegistry();
    $registry->enableCrossPanelSearch(fn () => true);

    expect($registry->isCrossPanelSearchEnabled())->toBeTrue();
});

// ============================================================
// Global Search Mode
// ============================================================

it('has Spotlight as default global search mode', function () {
    expect((new PanelRegistry())->getGlobalSearchMode())->toBe(GlobalSearchMode::Spotlight);
});

it('can set global search mode', function () {
    $registry = new PanelRegistry();
    $registry->globalSearchMode(GlobalSearchMode::Dropdown);

    expect($registry->getGlobalSearchMode())->toBe(GlobalSearchMode::Dropdown);
});

it('supports closure for global search mode', function () {
    $registry = new PanelRegistry();
    $registry->globalSearchMode(fn () => GlobalSearchMode::Dropdown);

    expect($registry->getGlobalSearchMode())->toBe(GlobalSearchMode::Dropdown);
});
