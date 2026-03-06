<?php

use Primix\Forms\Components\Fields\Textarea;

it('has 3 rows by default', function () {
    $field = Textarea::make('content');

    expect($field->getRows())->toBe(3);
});

it('can set custom rows', function () {
    $field = Textarea::make('content')->rows(10);

    expect($field->getRows())->toBe(10);
});

it('can enable autosize', function () {
    $field = Textarea::make('content')->autosize();

    expect($field->isAutosize())->toBeTrue();
});

it('is not autosize by default', function () {
    $field = Textarea::make('content');

    expect($field->isAutosize())->toBeFalse();
});

it('can set max length', function () {
    $field = Textarea::make('content')->maxLength(1000);

    expect($field->getMaxLength())->toBe(1000);
});

it('can set min length', function () {
    $field = Textarea::make('content')->minLength(10);

    expect($field->getMinLength())->toBe(10);
});

it('can be autofocused', function () {
    $field = Textarea::make('content')->autofocus();

    expect($field->isAutofocused())->toBeTrue();
});

it('can be readonly', function () {
    $field = Textarea::make('content')->readonly();

    expect($field->isReadOnly())->toBeTrue();
});

it('returns correct view', function () {
    $field = Textarea::make('content');

    expect($field->getView())->toBe('primix-forms::components.fields.textarea');
});

it('returns vue props', function () {
    $field = Textarea::make('content')
        ->rows(5)
        ->maxLength(1000)
        ->autosize()
        ->readonly();

    $props = $field->toVueProps();

    expect($props)
        ->toHaveKey('rows', 5)
        ->toHaveKey('maxLength', 1000)
        ->toHaveKey('autosize', true)
        ->toHaveKey('readonly', true);
});
