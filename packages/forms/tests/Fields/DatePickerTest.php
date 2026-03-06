<?php

use Primix\Forms\Components\Fields\DatePicker;

it('can set format', function () {
    $field = DatePicker::make('date')->format('Y-m-d');

    expect($field->getFormat())->toBe('Y-m-d');
});

it('can set display format', function () {
    $field = DatePicker::make('date')->displayFormat('d/m/Y');

    expect($field->getDisplayFormat())->toBe('d/m/Y');
});

it('display format falls back to format', function () {
    $field = DatePicker::make('date')->format('Y-m-d');

    expect($field->getDisplayFormat())->toBe('Y-m-d');
});

it('can be native', function () {
    $field = DatePicker::make('date')->native();

    expect($field->isNative())->toBeTrue();
});

it('is not native by default', function () {
    $field = DatePicker::make('date');

    expect($field->isNative())->toBeFalse();
});

it('can set min date as string', function () {
    $field = DatePicker::make('date')->minDate('2024-01-01');

    expect($field->getMinDate())->toBe('2024-01-01');
});

it('can set max date as string', function () {
    $field = DatePicker::make('date')->maxDate('2024-12-31');

    expect($field->getMaxDate())->toBe('2024-12-31');
});

it('has null min/max date by default', function () {
    $field = DatePicker::make('date');

    expect($field->getMinDate())->toBeNull();
    expect($field->getMaxDate())->toBeNull();
});

it('can set disabled dates', function () {
    $dates = ['2024-12-25', '2024-01-01'];
    $field = DatePicker::make('date')->disabledDates($dates);

    expect($field->getDisabledDates())->toBe($dates);
});

it('has empty disabled dates by default', function () {
    $field = DatePicker::make('date');

    expect($field->getDisabledDates())->toBe([]);
});

it('closes on date selection by default', function () {
    $field = DatePicker::make('date');

    $props = $field->toVueProps();
    expect($props['closeOnDateSelection'])->toBeTrue();
});

it('can disable close on date selection', function () {
    $field = DatePicker::make('date')->closeOnDateSelection(false);

    $props = $field->toVueProps();
    expect($props['closeOnDateSelection'])->toBeFalse();
});

it('returns correct view', function () {
    $field = DatePicker::make('date');

    expect($field->getView())->toBe('primix-forms::components.fields.date-picker');
});

it('returns complete vue props', function () {
    $field = DatePicker::make('date')
        ->format('Y-m-d')
        ->displayFormat('d/m/Y')
        ->native()
        ->minDate('2024-01-01')
        ->maxDate('2024-12-31');

    $props = $field->toVueProps();

    expect($props)
        ->toHaveKey('format', 'Y-m-d')
        ->toHaveKey('displayFormat', 'd/m/Y')
        ->toHaveKey('native', true)
        ->toHaveKey('minDate', '2024-01-01')
        ->toHaveKey('maxDate', '2024-12-31')
        ->toHaveKey('disabledDates')
        ->toHaveKey('closeOnDateSelection');
});

it('can set month year view', function () {
    $field = DatePicker::make('date')->monthYear();

    expect($field->getDateView())->toBe('month');
});

it('can set year only view', function () {
    $field = DatePicker::make('date')->yearOnly();

    expect($field->getDateView())->toBe('year');
});

it('has null date view by default', function () {
    $field = DatePicker::make('date');

    expect($field->getDateView())->toBeNull();
});

it('can be range', function () {
    $field = DatePicker::make('dateRange')->range();

    expect($field->isRange())->toBeTrue();
});

it('is not range by default', function () {
    $field = DatePicker::make('date');

    expect($field->isRange())->toBeFalse();
});

it('includes date view and range in vue props', function () {
    $field = DatePicker::make('date')->monthYear()->range();

    $props = $field->toVueProps();

    expect($props)
        ->toHaveKey('dateView', 'month')
        ->toHaveKey('range', true);
});
