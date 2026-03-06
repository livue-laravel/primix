<?php

use Primix\Forms\Components\Fields\Checkbox;

it('can be inline', function () {
    $field = Checkbox::make('agree')->inline();

    expect($field->isInline())->toBeTrue();
});

it('is not inline by default', function () {
    $field = Checkbox::make('agree');

    expect($field->isInline())->toBeFalse();
});

it('returns correct view', function () {
    $field = Checkbox::make('agree');

    expect($field->getView())->toBe('primix-forms::components.fields.checkbox');
});

it('returns vue props with inline', function () {
    $field = Checkbox::make('agree')->inline();

    $props = $field->toVueProps();

    expect($props)->toHaveKey('inline', true);
});
