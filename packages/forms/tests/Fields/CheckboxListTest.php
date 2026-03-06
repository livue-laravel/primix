<?php

use Primix\Forms\Components\Fields\CheckboxList;

it('can be buttons', function () {
    $field = CheckboxList::make('tags')->buttons();

    expect($field->isButtons())->toBeTrue();
});

it('is not buttons by default', function () {
    $field = CheckboxList::make('tags');

    expect($field->isButtons())->toBeFalse();
});

it('includes buttons in vue props', function () {
    $field = CheckboxList::make('tags')->buttons();

    $props = $field->toVueProps();

    expect($props)->toHaveKey('buttons', true);
});

it('can set inclusion validation rules', function () {
    $field = CheckboxList::make('tags')->in(['php', 'js'])->notIn(['deprecated']);

    expect($field->getRules())->toBe('array|in:php,js|not_in:deprecated');
});

it('can filter options using hide mode', function () {
    $field = CheckboxList::make('tags')
        ->options([
            'php' => 'PHP',
            'js' => 'JavaScript',
            'rust' => 'Rust',
        ])
        ->filterOptionsUsing(fn (string $value) => $value !== 'rust');

    $vueOptions = $field->getOptionsForVue();

    expect($vueOptions)->toHaveCount(2);
    expect(collect($vueOptions)->pluck('value')->all())->toBe(['php', 'js']);
});

it('can filter options using disabled mode', function () {
    $field = CheckboxList::make('tags')
        ->options([
            'php' => 'PHP',
            'js' => 'JavaScript',
            'rust' => 'Rust',
        ])
        ->filterOptionsUsing(fn (string $value) => $value !== 'rust', disabled: true);

    $vueOptions = $field->getOptionsForVue();

    expect($vueOptions)->toHaveCount(3);
    expect($vueOptions[2])->toHaveKey('disabled', true);
    expect($vueOptions[0])->not->toHaveKey('disabled');
});
