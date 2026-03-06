<?php

use Primix\Forms\Form;
use Primix\Forms\Components\Fields\TextInput;
use Primix\Forms\Components\Fields\Select;
use Primix\Forms\Components\Layouts\Section;
use Primix\Forms\Components\Layouts\Grid;
use Primix\Forms\Components\Layouts\Tabs;
use Primix\Forms\Components\Layouts\Tabs\Tab;

// We test Schema through Form, its concrete implementation

it('sets components via schema method', function () {
    $form = Form::make()->schema([
        TextInput::make('title'),
        TextInput::make('body'),
    ]);

    expect($form->getComponents())->toHaveCount(2);
});

it('returns empty components by default', function () {
    $form = Form::make();

    expect($form->getComponents())->toBe([]);
});

it('can set and get state path', function () {
    $form = Form::make()->statePath('formData');

    expect($form->getStatePath())->toBe('formData');
});

it('can set and get record', function () {
    $record = new stdClass();
    $record->id = 1;

    $form = Form::make()->record($record);

    expect($form->getRecord())->toBe($record);
});

it('has null record by default', function () {
    $form = Form::make();

    expect($form->getRecord())->toBeNull();
});

it('can fill state', function () {
    $state = ['title' => 'Hello', 'body' => 'World'];
    $form = Form::make()->fill($state);

    expect($form->getState())->toBe($state);
});

it('has empty state by default', function () {
    $form = Form::make();

    expect($form->getState())->toBe([]);
});

it('flattens leaf components from flat schema', function () {
    $form = Form::make()->schema([
        TextInput::make('title'),
        TextInput::make('body'),
    ]);

    $leaves = $form->getLeafComponents();

    expect($leaves)->toHaveCount(2);
    expect(array_keys($leaves))->toBe(['title', 'body']);
});

it('flattens leaf components from nested layouts', function () {
    $form = Form::make()->schema([
        Section::make('Details')->schema([
            TextInput::make('title'),
            TextInput::make('slug'),
        ]),
        Grid::make(2)->schema([
            TextInput::make('author'),
            TextInput::make('date'),
        ]),
    ]);

    $leaves = $form->getLeafComponents();

    expect($leaves)->toHaveCount(4);
});

it('flattens leaf components from deeply nested layouts', function () {
    $form = Form::make()->schema([
        Tabs::make('Settings')->tabs([
            Tab::make('General')->schema([
                Section::make('Info')->schema([
                    TextInput::make('name'),
                ]),
            ]),
            Tab::make('Advanced')->schema([
                TextInput::make('key'),
            ]),
        ]),
    ]);

    $leaves = $form->getLeafComponents();

    expect($leaves)->toHaveCount(2);
});

it('can set columns', function () {
    $form = Form::make()->columns(3);

    expect($form->getColumns())->toBe(3);
});

it('serializes to array with state', function () {
    $form = Form::make()
        ->statePath('data')
        ->fill(['title' => 'Hello'])
        ->schema([TextInput::make('title')]);

    $array = $form->toArray();

    expect($array['statePath'])->toBe('data');
    expect($array['state'])->toBe(['title' => 'Hello']);
    expect($array['components'])->toHaveCount(1);
});
