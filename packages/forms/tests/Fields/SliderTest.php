<?php

use Primix\Forms\Components\Fields\Slider;

it('has default min of 0', function () {
    $field = Slider::make('value');

    expect($field->getMin())->toBe(0);
});

it('has default max of 100', function () {
    $field = Slider::make('value');

    expect($field->getMax())->toBe(100);
});

it('has default step of 1', function () {
    $field = Slider::make('value');

    expect($field->getStep())->toBe(1);
});

it('can set min', function () {
    $field = Slider::make('value')->min(10);

    expect($field->getMin())->toBe(10);
});

it('can set max', function () {
    $field = Slider::make('value')->max(200);

    expect($field->getMax())->toBe(200);
});

it('can set step', function () {
    $field = Slider::make('value')->step(5);

    expect($field->getStep())->toBe(5);
});

it('can be range', function () {
    $field = Slider::make('range')->range();

    expect($field->isRange())->toBeTrue();
});

it('is not range by default', function () {
    $field = Slider::make('value');

    expect($field->isRange())->toBeFalse();
});

it('has horizontal orientation by default', function () {
    $field = Slider::make('value');

    expect($field->getOrientation())->toBe('horizontal');
});

it('can be vertical', function () {
    $field = Slider::make('value')->vertical();

    expect($field->getOrientation())->toBe('vertical');
});

it('returns correct view', function () {
    $field = Slider::make('value');

    expect($field->getView())->toBe('primix-forms::components.fields.slider');
});

it('returns complete vue props', function () {
    $field = Slider::make('value')
        ->min(10)
        ->max(50)
        ->step(2)
        ->range()
        ->vertical();

    $props = $field->toVueProps();

    expect($props)
        ->toHaveKey('min', 10)
        ->toHaveKey('max', 50)
        ->toHaveKey('step', 2)
        ->toHaveKey('range', true)
        ->toHaveKey('orientation', 'vertical');
});
