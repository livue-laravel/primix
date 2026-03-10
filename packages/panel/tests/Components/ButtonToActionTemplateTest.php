<?php

it('notifications template uses action for close control', function () {
    $template = file_get_contents(dirname(__DIR__, 2) . '/resources/views/components/notifications.blade.php');

    expect($template)
        ->toContain("\\Primix\\Actions\\Action::make('closeNotification')")
        ->not->toContain('<button');
});

it('mobile menu button template uses action', function () {
    $template = file_get_contents(dirname(__DIR__, 2) . '/resources/views/components/mobile-menu-button.blade.php');

    expect($template)
        ->toContain("\\Primix\\Actions\\Action::make('openSidebar')")
        ->not->toContain('<button');
});

it('navigation group template uses action for collapsible trigger', function () {
    $template = file_get_contents(dirname(__DIR__, 2) . '/resources/views/components/navigation-group.blade.php');

    expect($template)
        ->toContain("\\Primix\\Actions\\Action::make('toggleNavigationGroup')")
        ->not->toContain('<button');
});

it('email verification prompt template uses sign out actions', function () {
    $template = file_get_contents(dirname(__DIR__, 2) . '/resources/views/pages/auth/email-verification-prompt.blade.php');

    expect($template)
        ->toContain('@foreach($this->getSignOutActions() as $action)')
        ->not->toContain('<button');
});
