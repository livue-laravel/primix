<?php

use Primix\Forms\Components\Fields\TextInput;
use Primix\Forms\Components\Layouts\Grid;

it('can be created with columns', function () {
    $grid = Grid::make(3);

    expect($grid->getColumns())->toBe(3);
});

it('defaults to 2 columns', function () {
    $grid = Grid::make();

    expect($grid->getColumns())->toBe(2);
});

it('has no wrapper view', function () {
    $grid = Grid::make();

    expect($grid->getWrapperView())->toBeNull();
});

it('can contain child components', function () {
    $grid = Grid::make(2)->schema([
        TextInput::make('first_name'),
        TextInput::make('last_name'),
    ]);

    expect($grid->getSchema())->toHaveCount(2);
});

it('returns correct view', function () {
    $grid = Grid::make();

    expect($grid->getView())->toBe('primix-forms::components.layouts.grid');
});

it('returns vue props with columns', function () {
    $grid = Grid::make(4)->schema([
        TextInput::make('name'),
    ]);

    $props = $grid->toVueProps();

    expect($props)
        ->toHaveKey('columns', 4)
        ->toHaveKey('components');

    expect($props['components'])->toHaveCount(1);
});
