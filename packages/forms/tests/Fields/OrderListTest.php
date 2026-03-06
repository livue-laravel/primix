<?php

use Primix\Forms\Components\Fields\OrderList;

it('can set options', function () {
    $field = OrderList::make('items')->options([
        'a' => 'Item A',
        'b' => 'Item B',
    ]);

    expect($field->getOptions())->toBe([
        'a' => 'Item A',
        'b' => 'Item B',
    ]);
});

it('can be filterable', function () {
    $field = OrderList::make('items')->filterable();

    expect($field->isFilterable())->toBeTrue();
});

it('is not filterable by default', function () {
    $field = OrderList::make('items');

    expect($field->isFilterable())->toBeFalse();
});

it('formats options for vue', function () {
    $field = OrderList::make('items')->options([
        'a' => 'Item A',
        'b' => 'Item B',
    ]);

    expect($field->getOptionsForVue())->toBe([
        ['label' => 'Item A', 'value' => 'a'],
        ['label' => 'Item B', 'value' => 'b'],
    ]);
});

it('returns correct view', function () {
    $field = OrderList::make('items');

    expect($field->getView())->toBe('primix-forms::components.fields.order-list');
});

it('returns complete vue props', function () {
    $field = OrderList::make('items')
        ->options(['a' => 'A'])
        ->filterable();

    $props = $field->toVueProps();

    expect($props)
        ->toHaveKey('options')
        ->toHaveKey('filterable', true);
});

it('can set inclusion validation rules', function () {
    $field = OrderList::make('items')->in(['a', 'b'])->notIn(['x']);

    expect($field->getRules())->toBe('array|in:a,b|not_in:x');
});

it('can filter options using hide mode', function () {
    $field = OrderList::make('items')
        ->options([
            'a' => 'Item A',
            'b' => 'Item B',
            'c' => 'Item C',
        ])
        ->filterOptionsUsing(fn (string $value) => $value !== 'c');

    $vueOptions = $field->getOptionsForVue();

    expect($vueOptions)->toHaveCount(2);
    expect($vueOptions)->toBe([
        ['label' => 'Item A', 'value' => 'a'],
        ['label' => 'Item B', 'value' => 'b'],
    ]);
});
