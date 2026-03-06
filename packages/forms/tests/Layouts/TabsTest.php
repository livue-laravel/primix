<?php

use Primix\Forms\Components\Fields\TextInput;
use Primix\Forms\Components\Layouts\Tabs;
use Primix\Forms\Components\Layouts\Tabs\Tab;

it('can be created with label', function () {
    $tabs = Tabs::make('Settings');

    expect($tabs->getLabel())->toBe('Settings');
});

it('can add tabs', function () {
    $tabs = Tabs::make('Settings')->tabs([
        Tab::make('General'),
        Tab::make('Advanced'),
    ]);

    expect($tabs->getTabs())->toHaveCount(2);
});

it('can set active tab', function () {
    $tabs = Tabs::make('Settings')->activeTab('advanced');

    expect($tabs->getActiveTab())->toBe('advanced');
});

it('has null active tab by default', function () {
    $tabs = Tabs::make('Settings');

    expect($tabs->getActiveTab())->toBeNull();
});

it('can persist tab in query string', function () {
    $tabs = Tabs::make('Settings')->persistTabInQueryString();

    expect($tabs->shouldPersistTabInQueryString())->toBeTrue();
});

it('does not persist tab by default', function () {
    $tabs = Tabs::make('Settings');

    expect($tabs->shouldPersistTabInQueryString())->toBeFalse();
});

it('can be vertical', function () {
    $tabs = Tabs::make('Settings')->vertical();

    expect($tabs->isVertical())->toBeTrue();
});

it('is not vertical by default', function () {
    $tabs = Tabs::make('Settings');

    expect($tabs->isVertical())->toBeFalse();
});

it('returns correct view', function () {
    $tabs = Tabs::make('Settings');

    expect($tabs->getView())->toBe('primix-forms::components.layouts.tabs.tabs');
});

it('uses tabs as vue prop key for children', function () {
    $tabs = Tabs::make('Settings')->tabs([
        Tab::make('General'),
    ]);

    $props = $tabs->toVueProps();

    expect($props)->toHaveKey('tabs');
    expect($props)->not->toHaveKey('components');
    expect($props['tabs'])->toHaveCount(1);
});

it('returns vue props', function () {
    $tabs = Tabs::make('Settings')
        ->activeTab('general')
        ->vertical()
        ->persistTabInQueryString();

    $props = $tabs->toVueProps();

    expect($props)
        ->toHaveKey('activeTab', 'general')
        ->toHaveKey('vertical', true)
        ->toHaveKey('persistTabInQueryString', true);
});

// Tab tests

it('creates tab with label and auto-generated name', function () {
    $tab = Tab::make('General Settings');

    expect($tab->getLabel())->toBe('General Settings');
    expect($tab->getName())->toBe('general-settings');
});

it('tab can set badge', function () {
    $tab = Tab::make('Notifications')->badge('5');

    expect($tab->getBadge())->toBe('5');
});

it('tab can set badge color', function () {
    $tab = Tab::make('Errors')->badgeColor('danger');

    expect($tab->getBadgeColor())->toBe('danger');
});

it('tab has null badge by default', function () {
    $tab = Tab::make('General');

    expect($tab->getBadge())->toBeNull();
    expect($tab->getBadgeColor())->toBeNull();
});

it('tab can have schema', function () {
    $tab = Tab::make('Details')->schema([
        TextInput::make('name'),
        TextInput::make('email'),
    ]);

    expect($tab->getSchema())->toHaveCount(2);
});

it('tab can set icon', function () {
    $tab = Tab::make('Settings')->icon('heroicon-o-cog');

    expect($tab->getIcon())->toBe('heroicon-o-cog');
});

it('tab returns correct view', function () {
    $tab = Tab::make('General');

    expect($tab->getView())->toBe('primix-forms::components.layouts.tabs.tab');
});

it('tab returns vue props', function () {
    $tab = Tab::make('General')
        ->badge('3')
        ->badgeColor('success')
        ->icon('heroicon-o-home')
        ->schema([TextInput::make('name')]);

    $props = $tab->toVueProps();

    expect($props)
        ->toHaveKey('label', 'General')
        ->toHaveKey('name', 'general')
        ->toHaveKey('badge', '3')
        ->toHaveKey('badgeColor', 'success')
        ->toHaveKey('icon', 'heroicon-o-home')
        ->toHaveKey('components');

    expect($props['components'])->toHaveCount(1);
});

it('can be accordion', function () {
    $tabs = Tabs::make('Settings')->accordion();

    expect($tabs->isAccordion())->toBeTrue();
});

it('is not accordion by default', function () {
    $tabs = Tabs::make('Settings');

    expect($tabs->isAccordion())->toBeFalse();
});

it('can enable multiple expand', function () {
    $tabs = Tabs::make('Settings')->accordion()->multipleExpand();

    expect($tabs->isMultipleExpand())->toBeTrue();
});

it('is not multiple expand by default', function () {
    $tabs = Tabs::make('Settings');

    expect($tabs->isMultipleExpand())->toBeFalse();
});

it('includes accordion props in vue props', function () {
    $tabs = Tabs::make('Settings')->accordion()->multipleExpand();

    $props = $tabs->toVueProps();

    expect($props)
        ->toHaveKey('accordion', true)
        ->toHaveKey('multipleExpand', true);
});
