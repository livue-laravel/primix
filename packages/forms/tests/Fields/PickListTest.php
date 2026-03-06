<?php

use Primix\Forms\Components\Fields\PickList;

it('can set options', function () {
    $field = PickList::make('roles')->options([
        'admin' => 'Admin',
        'editor' => 'Editor',
    ]);

    expect($field->getOptions())->toBe([
        'admin' => 'Admin',
        'editor' => 'Editor',
    ]);
});

it('can set target options', function () {
    $field = PickList::make('roles')->targetOptions([
        'admin' => 'Admin',
    ]);

    expect($field->getTargetOptions())->toBe([
        'admin' => 'Admin',
    ]);
});

it('has empty target options by default', function () {
    $field = PickList::make('roles');

    expect($field->getTargetOptions())->toBe([]);
});

it('can be filterable', function () {
    $field = PickList::make('roles')->filterable();

    expect($field->isFilterable())->toBeTrue();
});

it('is not filterable by default', function () {
    $field = PickList::make('roles');

    expect($field->isFilterable())->toBeFalse();
});

it('can be reorderable', function () {
    $field = PickList::make('roles')->reorderable();

    expect($field->isReorderable())->toBeTrue();
});

it('is not reorderable by default', function () {
    $field = PickList::make('roles');

    expect($field->isReorderable())->toBeFalse();
});

it('formats source options for vue', function () {
    $field = PickList::make('roles')->options([
        'admin' => 'Admin',
        'editor' => 'Editor',
    ]);

    expect($field->getSourceOptionsForVue())->toBe([
        ['label' => 'Admin', 'value' => 'admin'],
        ['label' => 'Editor', 'value' => 'editor'],
    ]);
});

it('returns correct view', function () {
    $field = PickList::make('roles');

    expect($field->getView())->toBe('primix-forms::components.fields.pick-list');
});

it('returns complete vue props', function () {
    $field = PickList::make('roles')
        ->options(['admin' => 'Admin'])
        ->filterable()
        ->reorderable();

    $props = $field->toVueProps();

    expect($props)
        ->toHaveKey('sourceOptions')
        ->toHaveKey('targetOptions')
        ->toHaveKey('filterable', true)
        ->toHaveKey('reorderable', true);
});

it('can set inclusion validation rules', function () {
    $field = PickList::make('roles')->in(['admin', 'editor'])->notIn(['banned']);

    expect($field->getRules())->toBe('array|in:admin,editor|not_in:banned');
});

it('can filter source options using hide mode', function () {
    $field = PickList::make('roles')
        ->options([
            'admin' => 'Admin',
            'editor' => 'Editor',
            'viewer' => 'Viewer',
        ])
        ->filterOptionsUsing(fn (string $value) => $value !== 'viewer');

    $vueOptions = $field->getSourceOptionsForVue();

    expect($vueOptions)->toHaveCount(2);
    expect($vueOptions)->toBe([
        ['label' => 'Admin', 'value' => 'admin'],
        ['label' => 'Editor', 'value' => 'editor'],
    ]);
});
