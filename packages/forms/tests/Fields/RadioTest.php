<?php

use Primix\Forms\Components\Fields\Radio;

it('can set options', function () {
    $field = Radio::make('color')->options([
        'red' => 'Red',
        'blue' => 'Blue',
    ]);

    expect($field->getOptions())->toBe([
        'red' => 'Red',
        'blue' => 'Blue',
    ]);
});

it('can be inline', function () {
    $field = Radio::make('color')->inline();

    expect($field->isInline())->toBeTrue();
});

it('is not inline by default', function () {
    $field = Radio::make('color');

    expect($field->isInline())->toBeFalse();
});

it('can set inclusion validation rules', function () {
    $field = Radio::make('status')->in(['active', 'inactive'])->notIn(['archived']);

    expect($field->getRules())->toBe('in:active,inactive|not_in:archived');
});

it('can set descriptions', function () {
    $field = Radio::make('plan')->descriptions([
        'basic' => 'Basic plan with limited features',
        'pro' => 'Pro plan with all features',
    ]);

    expect($field->getDescriptions())->toBe([
        'basic' => 'Basic plan with limited features',
        'pro' => 'Pro plan with all features',
    ]);
});

it('formats options for vue with descriptions', function () {
    $field = Radio::make('plan')
        ->options([
            'basic' => 'Basic',
            'pro' => 'Pro',
        ])
        ->descriptions([
            'basic' => 'Limited features',
            'pro' => 'All features',
        ]);

    expect($field->getOptionsForVue())->toBe([
        ['label' => 'Basic', 'value' => 'basic', 'description' => 'Limited features'],
        ['label' => 'Pro', 'value' => 'pro', 'description' => 'All features'],
    ]);
});

it('formats options for vue without descriptions', function () {
    $field = Radio::make('color')->options([
        'red' => 'Red',
        'blue' => 'Blue',
    ]);

    expect($field->getOptionsForVue())->toBe([
        ['label' => 'Red', 'value' => 'red', 'description' => null],
        ['label' => 'Blue', 'value' => 'blue', 'description' => null],
    ]);
});

it('returns correct view', function () {
    $field = Radio::make('color');

    expect($field->getView())->toBe('primix-forms::components.fields.radio');
});

it('returns vue props', function () {
    $field = Radio::make('color')
        ->options(['red' => 'Red'])
        ->inline();

    $props = $field->toVueProps();

    expect($props)
        ->toHaveKey('options')
        ->toHaveKey('inline', true);
});

it('can be buttons', function () {
    $field = Radio::make('color')->buttons();

    expect($field->isButtons())->toBeTrue();
});

it('is not buttons by default', function () {
    $field = Radio::make('color');

    expect($field->isButtons())->toBeFalse();
});

it('includes buttons in vue props', function () {
    $field = Radio::make('color')->buttons();

    $props = $field->toVueProps();

    expect($props)->toHaveKey('buttons', true);
});

it('can filter options using hide mode', function () {
    $field = Radio::make('color')
        ->options([
            'red' => 'Red',
            'blue' => 'Blue',
            'green' => 'Green',
        ])
        ->filterOptionsUsing(fn (string $value) => $value !== 'green');

    $vueOptions = $field->getOptionsForVue();

    expect($vueOptions)->toHaveCount(2);
    expect(collect($vueOptions)->pluck('value')->all())->toBe(['red', 'blue']);
});

it('can filter options using disabled mode', function () {
    $field = Radio::make('color')
        ->options([
            'red' => 'Red',
            'blue' => 'Blue',
            'green' => 'Green',
        ])
        ->filterOptionsUsing(fn (string $value) => $value !== 'green', disabled: true);

    $vueOptions = $field->getOptionsForVue();

    expect($vueOptions)->toHaveCount(3);
    expect($vueOptions[2])->toHaveKey('disabled', true);
    expect($vueOptions[0])->not->toHaveKey('disabled');
});
