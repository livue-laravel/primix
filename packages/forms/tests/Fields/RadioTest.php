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
        ['label' => 'Basic', 'value' => 'basic', 'description' => 'Limited features', 'icon' => null, 'badge' => null],
        ['label' => 'Pro', 'value' => 'pro', 'description' => 'All features', 'icon' => null, 'badge' => null],
    ]);
});

it('formats options for vue without descriptions', function () {
    $field = Radio::make('color')->options([
        'red' => 'Red',
        'blue' => 'Blue',
    ]);

    expect($field->getOptionsForVue())->toBe([
        ['label' => 'Red', 'value' => 'red', 'description' => null, 'icon' => null, 'badge' => null],
        ['label' => 'Blue', 'value' => 'blue', 'description' => null, 'icon' => null, 'badge' => null],
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

it('can be cards', function () {
    $field = Radio::make('color')->cards();

    expect($field->isCards())->toBeTrue();
});

it('is not cards by default', function () {
    $field = Radio::make('color');

    expect($field->isCards())->toBeFalse();
});

it('includes cards in vue props', function () {
    $field = Radio::make('color')->cards();

    expect($field->toVueProps())->toHaveKey('cards', true);
});

it('can set icons per option', function () {
    $field = Radio::make('camera')
        ->options(['hibox' => 'HiBox', 'external' => 'External'])
        ->icons(['hibox' => 'pi pi-desktop', 'external' => 'pi pi-mobile']);

    $vueOptions = $field->getOptionsForVue();

    expect($vueOptions[0]['icon'])->toBe('pi pi-desktop');
    expect($vueOptions[1]['icon'])->toBe('pi pi-mobile');
});

it('can set string badges per option', function () {
    $field = Radio::make('field')
        ->options(['1' => 'Field 1', '2' => 'Field 2'])
        ->badges(['1' => 'HiBox Online']);

    $vueOptions = $field->getOptionsForVue();

    expect($vueOptions[0]['badge'])->toBe(['text' => 'HiBox Online', 'severity' => 'info']);
    expect($vueOptions[1]['badge'])->toBeNull();
});

it('can set badges with custom severity', function () {
    $field = Radio::make('field')
        ->options(['online' => 'Online', 'offline' => 'Offline'])
        ->badges([
            'online' => ['text' => 'HiBox Online', 'severity' => 'success'],
            'offline' => ['text' => 'HiBox Offline', 'severity' => 'danger'],
        ]);

    $vueOptions = $field->getOptionsForVue();

    expect($vueOptions[0]['badge'])->toBe(['text' => 'HiBox Online', 'severity' => 'success']);
    expect($vueOptions[1]['badge'])->toBe(['text' => 'HiBox Offline', 'severity' => 'danger']);
});

it('accepts closures for icons and badges', function () {
    $field = Radio::make('field')
        ->options(['a' => 'A', 'b' => 'B'])
        ->icons(fn () => ['a' => 'pi pi-check'])
        ->badges(fn () => ['b' => 'New']);

    $vueOptions = $field->getOptionsForVue();

    expect($vueOptions[0]['icon'])->toBe('pi pi-check');
    expect($vueOptions[1]['badge']['text'])->toBe('New');
});
