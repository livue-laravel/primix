<?php

use Primix\Forms\Components\Layouts\Fieldset;

it('can be created with label', function () {
    $fieldset = Fieldset::make('Address');

    expect($fieldset->getLabel())->toBe('Address');
});

it('can set legend', function () {
    $fieldset = Fieldset::make('Address')->legend('Shipping Address');

    expect($fieldset->getLegend())->toBe('Shipping Address');
});

it('has null legend by default', function () {
    $fieldset = Fieldset::make('Address');

    expect($fieldset->getLegend())->toBeNull();
});

it('can be toggleable', function () {
    $fieldset = Fieldset::make('Optional')->toggleable();

    expect($fieldset->isToggleable())->toBeTrue();
});

it('is not toggleable by default', function () {
    $fieldset = Fieldset::make('Address');

    expect($fieldset->isToggleable())->toBeFalse();
});

it('collapsed also enables toggleable', function () {
    $fieldset = Fieldset::make('Optional')->collapsed();

    expect($fieldset->isCollapsed())->toBeTrue();
    expect($fieldset->isToggleable())->toBeTrue();
});

it('is not collapsed by default', function () {
    $fieldset = Fieldset::make('Address');

    expect($fieldset->isCollapsed())->toBeFalse();
});

it('returns correct view', function () {
    $fieldset = Fieldset::make('Address');

    expect($fieldset->getView())->toBe('primix-forms::components.layouts.fieldset');
});

it('returns vue props', function () {
    $fieldset = Fieldset::make('Address')
        ->legend('Home Address')
        ->toggleable()
        ->collapsed();

    $props = $fieldset->toVueProps();

    expect($props)
        ->toHaveKey('legend', 'Home Address')
        ->toHaveKey('toggleable', true)
        ->toHaveKey('collapsed', true);
});
