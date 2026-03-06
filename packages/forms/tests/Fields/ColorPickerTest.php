<?php

use Primix\Forms\Components\Fields\ColorPicker;

it('has hex format by default', function () {
    $field = ColorPicker::make('color');

    expect($field->getFormat())->toBe('hex');
});

it('can set format', function () {
    $field = ColorPicker::make('color')->format('rgb');

    expect($field->getFormat())->toBe('rgb');
});

it('can set hex format', function () {
    $field = ColorPicker::make('color')->hex();

    expect($field->getFormat())->toBe('hex');
});

it('can set rgb format', function () {
    $field = ColorPicker::make('color')->rgb();

    expect($field->getFormat())->toBe('rgb');
});

it('can set hsb format', function () {
    $field = ColorPicker::make('color')->hsb();

    expect($field->getFormat())->toBe('hsb');
});

it('is not inline by default', function () {
    $field = ColorPicker::make('color');

    expect($field->isInline())->toBeFalse();
});

it('can be inline', function () {
    $field = ColorPicker::make('color')->inline();

    expect($field->isInline())->toBeTrue();
});

it('can disable inline', function () {
    $field = ColorPicker::make('color')->inline(false);

    expect($field->isInline())->toBeFalse();
});

it('returns correct view', function () {
    $field = ColorPicker::make('color');

    expect($field->getView())->toBe('primix-forms::components.fields.color-picker');
});

it('returns complete vue props', function () {
    $field = ColorPicker::make('color')
        ->format('rgb')
        ->inline();

    $props = $field->toVueProps();

    expect($props)
        ->toHaveKey('format', 'rgb')
        ->toHaveKey('inline', true);
});
