<?php

use Primix\Forms\Components\Layouts\Section;

it('can be created with label', function () {
    $section = Section::make('Personal Info');

    expect($section->getLabel())->toBe('Personal Info');
});

it('can be created without label', function () {
    $section = Section::make();

    expect($section->getLabel())->toBeNull();
});

it('heading is alias for label', function () {
    $section = Section::make()->heading('My Heading');

    expect($section->getHeading())->toBe('My Heading');
    expect($section->getLabel())->toBe('My Heading');
});

it('can be collapsible', function () {
    $section = Section::make('Details')->collapsible();

    expect($section->isCollapsible())->toBeTrue();
});

it('is not collapsible by default', function () {
    $section = Section::make('Details');

    expect($section->isCollapsible())->toBeFalse();
});

it('collapsed also enables collapsible', function () {
    $section = Section::make('Details')->collapsed();

    expect($section->isCollapsed())->toBeTrue();
    expect($section->isCollapsible())->toBeTrue();
});

it('is not collapsed by default', function () {
    $section = Section::make('Details');

    expect($section->isCollapsed())->toBeFalse();
});

it('can be compact', function () {
    $section = Section::make('Details')->compact();

    expect($section->isCompact())->toBeTrue();
});

it('is not compact by default', function () {
    $section = Section::make('Details');

    expect($section->isCompact())->toBeFalse();
});

it('can set icon', function () {
    $section = Section::make('Details')->icon('heroicon-o-user');

    expect($section->getIcon())->toBe('heroicon-o-user');
});

it('returns correct view', function () {
    $section = Section::make('Details');

    expect($section->getView())->toBe('primix-forms::components.layouts.section');
});

it('returns vue props', function () {
    $section = Section::make('Details')
        ->icon('heroicon-o-user')
        ->collapsible()
        ->compact();

    $props = $section->toVueProps();

    expect($props)
        ->toHaveKey('heading', 'Details')
        ->toHaveKey('icon', 'heroicon-o-user')
        ->toHaveKey('collapsible', true)
        ->toHaveKey('collapsed', false)
        ->toHaveKey('compact', true);
});
