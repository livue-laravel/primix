<?php

use Primix\Forms\Components\Fields\Repeater;
use Primix\Forms\Components\Fields\TextInput;

it('can set schema', function () {
    $field = Repeater::make('items')->schema([
        TextInput::make('name'),
    ]);

    expect($field->getSchema())->toHaveCount(1);
});

it('can set min items', function () {
    $field = Repeater::make('items')->minItems(1);

    expect($field->getMinItems())->toBe(1);
});

it('can set max items', function () {
    $field = Repeater::make('items')->maxItems(5);

    expect($field->getMaxItems())->toBe(5);
});

it('has null min/max items by default', function () {
    $field = Repeater::make('items');

    expect($field->getMinItems())->toBeNull();
    expect($field->getMaxItems())->toBeNull();
});

it('is reorderable by default', function () {
    $field = Repeater::make('items');

    expect($field->isReorderable())->toBeTrue();
});

it('can disable reordering', function () {
    $field = Repeater::make('items')->reorderable(false);

    expect($field->isReorderable())->toBeFalse();
});

it('is addable by default', function () {
    $field = Repeater::make('items');

    expect($field->isAddable())->toBeTrue();
});

it('can disable adding', function () {
    $field = Repeater::make('items')->addable(false);

    expect($field->isAddable())->toBeFalse();
});

it('is deletable by default', function () {
    $field = Repeater::make('items');

    expect($field->isDeletable())->toBeTrue();
});

it('can disable deleting', function () {
    $field = Repeater::make('items')->deletable(false);

    expect($field->isDeletable())->toBeFalse();
});

it('is not collapsible by default', function () {
    $field = Repeater::make('items');

    expect($field->isCollapsible())->toBeFalse();
});

it('can be collapsible', function () {
    $field = Repeater::make('items')->collapsible();

    expect($field->isCollapsible())->toBeTrue();
});

it('is not cloneable by default', function () {
    $field = Repeater::make('items');

    expect($field->isCloneable())->toBeFalse();
});

it('can be cloneable', function () {
    $field = Repeater::make('items')->cloneable();

    expect($field->isCloneable())->toBeTrue();
});

it('has default add action label', function () {
    $field = Repeater::make('items');

    expect($field->getAddActionLabel())->toBe('Add item');
});

it('can set custom add action label', function () {
    $field = Repeater::make('items')->addActionLabel('Add row');

    expect($field->getAddActionLabel())->toBe('Add row');
});

it('can set item label', function () {
    $field = Repeater::make('items')->itemLabel('Item');

    expect($field->getItemLabel())->toBe('Item');
});

it('has null item label by default', function () {
    $field = Repeater::make('items');

    expect($field->getItemLabel())->toBeNull();
});

it('can set grid columns', function () {
    $field = Repeater::make('items')->grid(3);

    expect($field->getGridColumns())->toBe(3);
});

it('has 1 grid column by default', function () {
    $field = Repeater::make('items');

    expect($field->getGridColumns())->toBe(1);
});

it('generates blank item data from schema defaults', function () {
    $field = Repeater::make('items')->schema([
        TextInput::make('name')->default('Untitled'),
        TextInput::make('value')->default(0),
    ]);

    expect($field->getBlankItemData())->toBe([
        'name' => 'Untitled',
        'value' => 0,
    ]);
});

it('generates blank item data with null defaults', function () {
    $field = Repeater::make('items')->schema([
        TextInput::make('name'),
        TextInput::make('value'),
    ]);

    expect($field->getBlankItemData())->toBe([
        'name' => null,
        'value' => null,
    ]);
});

it('returns correct view', function () {
    $field = Repeater::make('items');

    expect($field->getView())->toBe('primix-forms::components.fields.repeater');
});

it('returns complete vue props', function () {
    $field = Repeater::make('items')
        ->minItems(1)
        ->maxItems(5)
        ->reorderable(false)
        ->collapsible()
        ->addActionLabel('Add row')
        ->grid(2);

    $props = $field->toVueProps();

    expect($props)
        ->toHaveKey('minItems', 1)
        ->toHaveKey('maxItems', 5)
        ->toHaveKey('reorderable', false)
        ->toHaveKey('collapsible', true)
        ->toHaveKey('addActionLabel', 'Add row')
        ->toHaveKey('gridColumns', 2)
        ->toHaveKey('addable', true)
        ->toHaveKey('deletable', true)
        ->toHaveKey('cloneable', false)
        ->toHaveKey('blankItem');
});
