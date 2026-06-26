<?php

use Primix\Forms\Form;
use Primix\Forms\Components\Fields\TextInput;
use Primix\Forms\Components\Layouts\Section;

it('returns null operation by default', function () {
    $form = Form::make()->schema([
        TextInput::make('title'),
    ]);

    expect($form->getOperation())->toBeNull();
    expect($form->getComponents()[0]->getOperation())->toBeNull();
});

it('propagates the form operation down to its components', function () {
    $form = Form::make()->schema([
        TextInput::make('title'),
        Section::make('Meta')->schema([
            TextInput::make('slug'),
        ]),
    ])->operation('create');

    $title = $form->getComponents()[0];
    $section = $form->getComponents()[1];
    $slug = $section->getChildComponents()[0];

    expect($title->getOperation())->toBe('create');
    expect($section->getOperation())->toBe('create');
    expect($slug->getOperation())->toBe('create');
});

it('hides a field on the given operation with hiddenOn', function () {
    $form = Form::make()->schema([
        TextInput::make('slug')->hiddenOn('create'),
    ])->operation('create');

    expect($form->getComponents()[0]->isHidden())->toBeTrue();
});

it('keeps a hiddenOn field visible on other operations', function () {
    $form = Form::make()->schema([
        TextInput::make('slug')->hiddenOn('create'),
    ])->operation('edit');

    expect($form->getComponents()[0]->isHidden())->toBeFalse();
});

it('supports an array of operations in hiddenOn', function () {
    $form = Form::make()->schema([
        TextInput::make('slug')->hiddenOn(['create', 'view']),
    ])->operation('view');

    expect($form->getComponents()[0]->isHidden())->toBeTrue();
});

it('shows a field only on the given operation with visibleOn', function () {
    $createForm = Form::make()->schema([
        TextInput::make('password')->visibleOn('create'),
    ])->operation('create');

    $editForm = Form::make()->schema([
        TextInput::make('password')->visibleOn('create'),
    ])->operation('edit');

    expect($createForm->getComponents()[0]->isHidden())->toBeFalse();
    expect($editForm->getComponents()[0]->isHidden())->toBeTrue();
});

it('exposes the operation as a closure dependency', function () {
    $captured = null;

    $form = Form::make()->schema([
        TextInput::make('slug')->hidden(function (?string $operation) use (&$captured) {
            $captured = $operation;

            return false;
        }),
    ])->operation('edit');

    $form->getComponents()[0]->isHidden();

    expect($captured)->toBe('edit');
});
