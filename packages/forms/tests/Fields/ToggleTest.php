<?php

use Primix\Forms\Components\Fields\Toggle;

it('can set on icon', function () {
    $field = Toggle::make('active')->onIcon('heroicon-o-check');

    expect($field->getOnIcon())->toBe('heroicon-o-check');
});

it('can set off icon', function () {
    $field = Toggle::make('active')->offIcon('heroicon-o-x-mark');

    expect($field->getOffIcon())->toBe('heroicon-o-x-mark');
});

it('can set on color', function () {
    $field = Toggle::make('active')->onColor('success');

    expect($field->getOnColor())->toBe('success');
});

it('can set off color', function () {
    $field = Toggle::make('active')->offColor('danger');

    expect($field->getOffColor())->toBe('danger');
});

it('has null icons by default', function () {
    $field = Toggle::make('active');

    expect($field->getOnIcon())->toBeNull();
    expect($field->getOffIcon())->toBeNull();
});

it('has null colors by default', function () {
    $field = Toggle::make('active');

    expect($field->getOnColor())->toBeNull();
    expect($field->getOffColor())->toBeNull();
});

it('returns correct view', function () {
    $field = Toggle::make('active');

    expect($field->getView())->toBe('primix-forms::components.fields.toggle');
});

it('returns vue props with icons and colors', function () {
    $field = Toggle::make('active')
        ->onIcon('heroicon-o-check')
        ->offIcon('heroicon-o-x-mark')
        ->onColor('success')
        ->offColor('danger');

    $props = $field->toVueProps();

    expect($props)
        ->toHaveKey('onIcon', 'heroicon-o-check')
        ->toHaveKey('offIcon', 'heroicon-o-x-mark')
        ->toHaveKey('onColor', 'success')
        ->toHaveKey('offColor', 'danger');
});

it('can be button', function () {
    $field = Toggle::make('active')->button();

    expect($field->isButton())->toBeTrue();
});

it('is not button by default', function () {
    $field = Toggle::make('active');

    expect($field->isButton())->toBeFalse();
});

it('can set on label', function () {
    $field = Toggle::make('active')->button()->onLabel('Yes');

    expect($field->getOnLabel())->toBe('Yes');
});

it('can set off label', function () {
    $field = Toggle::make('active')->button()->offLabel('No');

    expect($field->getOffLabel())->toBe('No');
});

it('has null labels by default', function () {
    $field = Toggle::make('active');

    expect($field->getOnLabel())->toBeNull();
    expect($field->getOffLabel())->toBeNull();
});

it('includes button props in vue props', function () {
    $field = Toggle::make('active')->button()->onLabel('On')->offLabel('Off');

    $props = $field->toVueProps();

    expect($props)
        ->toHaveKey('button', true)
        ->toHaveKey('onLabel', 'On')
        ->toHaveKey('offLabel', 'Off');
});
