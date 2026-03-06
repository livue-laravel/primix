<?php

use Primix\Forms\Components\Fields\TextInput;
use Primix\Forms\Components\Layouts\Section;

// We use Section as a concrete implementation of LayoutComponent

it('is contained by default', function () {
    $layout = Section::make('Details');

    expect($layout->isContained())->toBeTrue();
});

it('can disable contained', function () {
    $layout = Section::make('Details')->contained(false);

    expect($layout->isContained())->toBeFalse();
});

it('is not aside by default', function () {
    $layout = Section::make('Details');

    expect($layout->isAside())->toBeFalse();
});

it('can be aside', function () {
    $layout = Section::make('Details')->aside();

    expect($layout->isAside())->toBeTrue();
});

it('can set schema with child components', function () {
    $layout = Section::make('Details')->schema([
        TextInput::make('name'),
        TextInput::make('email'),
    ]);

    expect($layout->getSchema())->toHaveCount(2);
});

it('can set columns', function () {
    $layout = Section::make('Details')->columns(3);

    expect($layout->getColumns())->toBe(3);
});

it('can set description', function () {
    $layout = Section::make('Details')->description('Some details');

    expect($layout->getDescription())->toBe('Some details');
});

it('returns layout wrapper view', function () {
    $layout = Section::make('Details');

    expect($layout->getWrapperView())->toBe('primix-forms::components.layout-wrapper');
});

it('returns vue props with child components', function () {
    $layout = Section::make('Details')->schema([
        TextInput::make('name'),
    ]);

    $props = $layout->toVueProps();

    expect($props)
        ->toHaveKey('label', 'Details')
        ->toHaveKey('contained', true)
        ->toHaveKey('components')
        ->toHaveKey('context')
        ->toHaveKey('style');

    expect($props['components'])->toHaveCount(1);
});

it('accepts closure for aside', function () {
    $layout = Section::make('Details')->aside(fn () => true);

    expect($layout->isAside())->toBeTrue();
});

it('accepts closure for contained', function () {
    $layout = Section::make('Details')->contained(fn () => false);

    expect($layout->isContained())->toBeFalse();
});
