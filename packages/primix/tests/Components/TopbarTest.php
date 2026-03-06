<?php

use Primix\Components\Topbar;

it('keeps spa navigate attribute in menubar itemLink pass-through when spa is enabled', function () {
    $topbar = new Topbar();
    $topbar->topBarNavigation = true;
    $topbar->spa = true;

    $topbar->mount();

    expect($topbar->menubarPt)->toHaveKey('itemLink')
        ->and($topbar->menubarPt['itemLink'])->toHaveKey('class')
        ->and($topbar->menubarPt['itemLink']['class'])->toBe('rounded-none')
        ->and($topbar->menubarPt['itemLink'])->toHaveKey('data-livue-navigate')
        ->and($topbar->menubarPt['itemLink']['data-livue-navigate'])->toBe('true');
});

it('does not add spa navigate attribute in menubar itemLink pass-through when spa is disabled', function () {
    $topbar = new Topbar();
    $topbar->topBarNavigation = true;
    $topbar->spa = false;

    $topbar->mount();

    expect($topbar->menubarPt)->toHaveKey('itemLink')
        ->and($topbar->menubarPt['itemLink'])->toHaveKey('class')
        ->and($topbar->menubarPt['itemLink']['class'])->toBe('rounded-none')
        ->and($topbar->menubarPt['itemLink'])->not->toHaveKey('data-livue-navigate');
});
