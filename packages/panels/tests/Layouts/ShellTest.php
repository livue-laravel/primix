<?php

require_once dirname(__DIR__, 2) . '/src/Layouts/Shell.php';

use Primix\Layouts\Shell;

it('serializes shell configuration for topbar/sidebar and ui controls', function () {
    $shell = Shell::make()
        ->navigation([['label' => 'Home', 'url' => '/']])
        ->brandName('<strong>Acme</strong>')
        ->topbar()
        ->sidebar()
        ->panelSwitcher()
        ->userMenu([['label' => 'Profile']])
        ->topBarNavigation()
        ->fixedTopbar()
        ->darkMode()
        ->spa()
        ->globalSearch(true, 'inline')
        ->panelId('frontend')
        ->tenantMenu([['label' => 'Team A']], true)
        ->databaseNotifications(true, 'drawer', 15);

    $config = $shell->toArray();

    expect($config)
        ->toHaveKey('navigation')
        ->and($config['brandName'])->toBe('&lt;strong&gt;Acme&lt;/strong&gt;')
        ->and($config['showTopbar'])->toBeTrue()
        ->and($config['showSidebar'])->toBeTrue()
        ->and($config['showPanelSwitcher'])->toBeTrue()
        ->and($config['showUserMenu'])->toBeTrue()
        ->and($config['topBarNavigation'])->toBeTrue()
        ->and($config['fixedTopbar'])->toBeTrue()
        ->and($config['hasDarkMode'])->toBeTrue()
        ->and($config['spa'])->toBeTrue()
        ->and($config['hasGlobalSearch'])->toBeTrue()
        ->and($config['globalSearchMode'])->toBe('inline')
        ->and($config['panelId'])->toBe('frontend')
        ->and($config['hasTenantMenu'])->toBeTrue()
        ->and($config['hasDatabaseNotifications'])->toBeTrue()
        ->and($config['databaseNotificationsMode'])->toBe('drawer')
        ->and($config['databaseNotificationsPollingInterval'])->toBe(15);
});

it('evaluates closure values with component injection', function () {
    $component = new class
    {
        public bool $sidebarEnabled = false;
    };

    $shell = Shell::make()
        ->component($component)
        ->sidebar(fn ($component) => $component->sidebarEnabled)
        ->panelId(fn () => 'shop');

    $config = $shell->toArray();

    expect($config['showSidebar'])->toBeFalse()
        ->and($config['panelId'])->toBe('shop');
});
