<?php

use Primix\Forms\Components\Fields\TagsInput;

it('has empty suggestions by default', function () {
    $field = TagsInput::make('tags');

    expect($field->getSuggestions())->toBe([]);
});

it('can set suggestions', function () {
    $field = TagsInput::make('tags')->suggestions(['php', 'laravel']);

    expect($field->getSuggestions())->toBe(['php', 'laravel']);
});

it('has null separator by default', function () {
    $field = TagsInput::make('tags');

    expect($field->getSeparator())->toBeNull();
});

it('can set separator', function () {
    $field = TagsInput::make('tags')->separator(',');

    expect($field->getSeparator())->toBe(',');
});

it('has null max items by default', function () {
    $field = TagsInput::make('tags');

    expect($field->getMaxItems())->toBeNull();
});

it('can set max items', function () {
    $field = TagsInput::make('tags')->maxItems(5);

    expect($field->getMaxItems())->toBe(5);
});

it('does not allow duplicates by default', function () {
    $field = TagsInput::make('tags');

    expect($field->doesAllowDuplicates())->toBeFalse();
});

it('can allow duplicates', function () {
    $field = TagsInput::make('tags')->allowDuplicates();

    expect($field->doesAllowDuplicates())->toBeTrue();
});

it('can disallow duplicates', function () {
    $field = TagsInput::make('tags')->allowDuplicates(false);

    expect($field->doesAllowDuplicates())->toBeFalse();
});

it('adds on blur by default', function () {
    $field = TagsInput::make('tags');

    expect($field->shouldAddOnBlur())->toBeTrue();
});

it('can disable add on blur', function () {
    $field = TagsInput::make('tags')->addOnBlur(false);

    expect($field->shouldAddOnBlur())->toBeFalse();
});

it('returns correct view', function () {
    $field = TagsInput::make('tags');

    expect($field->getView())->toBe('primix-forms::components.fields.tags-input');
});

it('returns complete vue props', function () {
    $field = TagsInput::make('tags')
        ->suggestions(['a'])
        ->separator(',')
        ->maxItems(3)
        ->allowDuplicates();

    $props = $field->toVueProps();

    expect($props)
        ->toHaveKey('suggestions', ['a'])
        ->toHaveKey('separator', ',')
        ->toHaveKey('maxItems', 3)
        ->toHaveKey('allowDuplicates', true)
        ->toHaveKey('addOnBlur', true);
});
