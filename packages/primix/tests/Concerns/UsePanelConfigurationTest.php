<?php

use Illuminate\Support\HtmlString;
use Primix\Components\Sidebar;
use Primix\Components\Topbar;
use Primix\Concerns\UsePanelConfiguration;
use Primix\Panel;
use Primix\PanelRegistry;
use Primix\Pages\SimplePage;

it('simple page and shell components use the panel configuration composable trait', function () {
    expect(class_uses_recursive(SimplePage::class))
        ->toContain(UsePanelConfiguration::class)
        ->and(class_uses_recursive(Topbar::class))
        ->toContain(UsePanelConfiguration::class)
        ->and(class_uses_recursive(Sidebar::class))
        ->toContain(UsePanelConfiguration::class);
});

it('exposes the panel configuration composable API', function () {
    $classes = [SimplePage::class, Topbar::class, Sidebar::class];

    foreach ($classes as $class) {
        expect(method_exists($class, 'usePanelConfiguration'))->toBeTrue();
    }
});

it('returns default payload when no panel is resolved', function () {
    app()->instance(PanelRegistry::class, new PanelRegistry());

    $payload = (new Topbar())->usePanelConfiguration();

    expect($payload)->toBeArray()
        ->and($payload)->toHaveKeys(['id', 'brandName', 'brandLogo', 'brandLogoDark', 'hasDarkMode'])
        ->and($payload['id'])->toBeNull()
        ->and($payload['brandName'])->toBeNull()
        ->and($payload['brandLogo'])->toBeNull()
        ->and($payload['brandLogoDark'])->toBeNull()
        ->and($payload['hasDarkMode'])->toBeTrue();
});

it('resolves panel config and escapes plain string brand names', function () {
    $registry = new PanelRegistry();
    app()->instance(PanelRegistry::class, $registry);

    $panel = Panel::make('admin')
        ->path('admin')
        ->brandName('<strong>Acme</strong>')
        ->brandLogo('/logo.svg')
        ->darkMode(false);

    $registry->register($panel);
    $registry->setCurrentPanel('admin');

    $payload = (new Topbar())->usePanelConfiguration();

    expect($payload['id'])->toBe('admin')
        ->and($payload['brandName'])->toBe('&lt;strong&gt;Acme&lt;/strong&gt;')
        ->and($payload['brandLogo'])->toContain('<img')
        ->and($payload['brandLogo'])->toContain('src="/logo.svg"')
        ->and($payload['brandLogoDark'])->toBeNull()
        ->and($payload['hasDarkMode'])->toBeFalse();
});

it('keeps htmlable brand names as raw html', function () {
    $registry = new PanelRegistry();
    app()->instance(PanelRegistry::class, $registry);

    $panel = Panel::make('admin')
        ->path('admin')
        ->brandName(new HtmlString('<strong>Acme</strong>'));

    $registry->register($panel);
    $registry->setCurrentPanel('admin');

    $payload = (new Topbar())->usePanelConfiguration();

    expect($payload['brandName'])->toBe('<strong>Acme</strong>');
});

it('prefers panelId property when present', function () {
    $registry = new PanelRegistry();
    app()->instance(PanelRegistry::class, $registry);

    $admin = Panel::make('admin')->path('admin')->brandName('Admin');
    $hr = Panel::make('hr')->path('hr')->brandName('HR');

    $registry->register($admin);
    $registry->register($hr);
    $registry->setCurrentPanel('hr');

    $topbar = new Topbar();
    $topbar->panelId = 'admin';

    $payload = $topbar->usePanelConfiguration();

    expect($payload['id'])->toBe('admin')
        ->and($payload['brandName'])->toBe('Admin');
});

it('renders branding with panelConfig and v-html in core templates', function () {
    $topbarTemplate = file_get_contents(base_path('packages/primix/packages/primix/resources/views/components/topbar.blade.php'));
    $simpleLayoutTemplate = file_get_contents(base_path('packages/primix/packages/primix/resources/views/components/layouts/simple.blade.php'));

    expect($topbarTemplate)->toContain('v-html="panelConfig.brandName"')
        ->and($topbarTemplate)->toContain('v-html="panelConfig.brandLogo"')
        ->and($simpleLayoutTemplate)->toContain('v-html="panelConfig.brandName"')
        ->and($simpleLayoutTemplate)->toContain('v-html="panelConfig.brandLogoDark"')
        ->and($simpleLayoutTemplate)->not->toContain('<x-primix::brand');
});
