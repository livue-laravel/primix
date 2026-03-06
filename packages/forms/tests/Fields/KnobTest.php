<?php

use Primix\Forms\Components\Fields\Knob;

it('has default min of 0', function () {
    $field = Knob::make('value');

    expect($field->getMin())->toBe(0);
});

it('has default max of 100', function () {
    $field = Knob::make('value');

    expect($field->getMax())->toBe(100);
});

it('has default step of 1', function () {
    $field = Knob::make('value');

    expect($field->getStep())->toBe(1);
});

it('has default size of 150', function () {
    $field = Knob::make('value');

    expect($field->getSize())->toBe(150);
});

it('has default stroke width of 14', function () {
    $field = Knob::make('value');

    expect($field->getStrokeWidth())->toBe(14);
});

it('shows value by default', function () {
    $field = Knob::make('value');

    expect($field->shouldShowValue())->toBeTrue();
});

it('can set min', function () {
    $field = Knob::make('value')->min(10);

    expect($field->getMin())->toBe(10);
});

it('can set max', function () {
    $field = Knob::make('value')->max(200);

    expect($field->getMax())->toBe(200);
});

it('can set size', function () {
    $field = Knob::make('value')->size(200);

    expect($field->getSize())->toBe(200);
});

it('can set stroke width', function () {
    $field = Knob::make('value')->strokeWidth(8);

    expect($field->getStrokeWidth())->toBe(8);
});

it('can hide value', function () {
    $field = Knob::make('value')->showValue(false);

    expect($field->shouldShowValue())->toBeFalse();
});

it('can set value template', function () {
    $field = Knob::make('value')->valueTemplate('{value}%');

    expect($field->getValueTemplate())->toBe('{value}%');
});

it('has null value template by default', function () {
    $field = Knob::make('value');

    expect($field->getValueTemplate())->toBeNull();
});

it('returns correct view', function () {
    $field = Knob::make('value');

    expect($field->getView())->toBe('primix-forms::components.fields.knob');
});

it('returns complete vue props', function () {
    $field = Knob::make('value')
        ->min(10)
        ->max(50)
        ->step(5)
        ->size(200)
        ->strokeWidth(10)
        ->showValue(false)
        ->valueTemplate('{value}%');

    $props = $field->toVueProps();

    expect($props)
        ->toHaveKey('min', 10)
        ->toHaveKey('max', 50)
        ->toHaveKey('step', 5)
        ->toHaveKey('size', 200)
        ->toHaveKey('strokeWidth', 10)
        ->toHaveKey('showValue', false)
        ->toHaveKey('valueTemplate', '{value}%');
});
