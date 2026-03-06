<?php

use Primix\Forms\Components\Fields\Rating;

it('has default 5 stars', function () {
    $field = Rating::make('rating');

    expect($field->getStars())->toBe(5);
});

it('can set star count', function () {
    $field = Rating::make('rating')->stars(10);

    expect($field->getStars())->toBe(10);
});

it('is cancelable by default', function () {
    $field = Rating::make('rating');

    expect($field->isCancelable())->toBeTrue();
});

it('can disable cancel', function () {
    $field = Rating::make('rating')->cancelable(false);

    expect($field->isCancelable())->toBeFalse();
});

it('returns correct view', function () {
    $field = Rating::make('rating');

    expect($field->getView())->toBe('primix-forms::components.fields.rating');
});

it('returns complete vue props', function () {
    $field = Rating::make('rating')
        ->stars(10)
        ->cancelable(false);

    $props = $field->toVueProps();

    expect($props)
        ->toHaveKey('stars', 10)
        ->toHaveKey('cancelable', false);
});
