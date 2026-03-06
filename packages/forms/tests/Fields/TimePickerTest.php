<?php

use Primix\Forms\Components\Fields\TimePicker;

it('is 24 hour by default', function () {
    $field = TimePicker::make('time');

    expect($field->is24Hour())->toBeTrue();
});

it('can set twelve hour format', function () {
    $field = TimePicker::make('time')->twelveHour();

    expect($field->is24Hour())->toBeFalse();
});

it('can set twenty four hour format', function () {
    $field = TimePicker::make('time')->twentyFourHour();

    expect($field->is24Hour())->toBeTrue();
});

it('can toggle twenty four hour', function () {
    $field = TimePicker::make('time')->twentyFourHour(false);

    expect($field->is24Hour())->toBeFalse();
});

it('does not show seconds by default', function () {
    $field = TimePicker::make('time');

    expect($field->hasSeconds())->toBeFalse();
});

it('can show seconds', function () {
    $field = TimePicker::make('time')->withSeconds();

    expect($field->hasSeconds())->toBeTrue();
});

it('can disable seconds', function () {
    $field = TimePicker::make('time')->withSeconds(false);

    expect($field->hasSeconds())->toBeFalse();
});

it('has default hour step of 1', function () {
    $field = TimePicker::make('time');

    expect($field->getHourStep())->toBe(1);
});

it('can set hour step', function () {
    $field = TimePicker::make('time')->hourStep(2);

    expect($field->getHourStep())->toBe(2);
});

it('has default minute step of 1', function () {
    $field = TimePicker::make('time');

    expect($field->getMinuteStep())->toBe(1);
});

it('can set minute step', function () {
    $field = TimePicker::make('time')->minuteStep(15);

    expect($field->getMinuteStep())->toBe(15);
});

it('has default second step of 1', function () {
    $field = TimePicker::make('time');

    expect($field->getSecondStep())->toBe(1);
});

it('can set second step', function () {
    $field = TimePicker::make('time')->secondStep(30);

    expect($field->getSecondStep())->toBe(30);
});

it('returns correct view', function () {
    $field = TimePicker::make('time');

    expect($field->getView())->toBe('primix-forms::components.fields.time-picker');
});

it('returns complete vue props', function () {
    $field = TimePicker::make('time')
        ->twelveHour()
        ->withSeconds()
        ->hourStep(2)
        ->minuteStep(15)
        ->secondStep(30);

    $props = $field->toVueProps();

    expect($props)
        ->toHaveKey('is24Hour', false)
        ->toHaveKey('withSeconds', true)
        ->toHaveKey('hourStep', 2)
        ->toHaveKey('minuteStep', 15)
        ->toHaveKey('secondStep', 30);
});
