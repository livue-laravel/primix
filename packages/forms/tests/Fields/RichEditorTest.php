<?php

use Primix\Forms\Components\Fields\RichEditor;

it('has default toolbar buttons', function () {
    $field = RichEditor::make('content');

    expect($field->getToolbarButtons())->toBe([
        'bold', 'italic', 'underline', 'strike',
        '|',
        'heading',
        'bulletList', 'orderedList',
        '|',
        'link', 'blockquote', 'codeBlock',
        '|',
        'undo', 'redo',
    ]);
});

it('can set toolbar buttons', function () {
    $field = RichEditor::make('content')->toolbarButtons(['bold', 'italic']);

    expect($field->getToolbarButtons())->toBe(['bold', 'italic']);
});

it('has empty disabled toolbar buttons by default', function () {
    $field = RichEditor::make('content');

    expect($field->getDisabledToolbarButtons())->toBe([]);
});

it('can disable toolbar buttons', function () {
    $field = RichEditor::make('content')->disableToolbarButtons(['bold', 'italic']);

    expect($field->getDisabledToolbarButtons())->toBe(['bold', 'italic']);
});

it('has null max length by default', function () {
    $field = RichEditor::make('content');

    expect($field->getMaxLength())->toBeNull();
});

it('can set max length', function () {
    $field = RichEditor::make('content')->maxLength(500);

    expect($field->getMaxLength())->toBe(500);
});

it('has null editor height by default', function () {
    $field = RichEditor::make('content');

    expect($field->getEditorHeight())->toBeNull();
});

it('can set editor height', function () {
    $field = RichEditor::make('content')->editorHeight('400px');

    expect($field->getEditorHeight())->toBe('400px');
});

it('returns correct view', function () {
    $field = RichEditor::make('content');

    expect($field->getView())->toBe('primix-forms::components.fields.rich-editor');
});

it('returns complete vue props', function () {
    $field = RichEditor::make('content')
        ->toolbarButtons(['bold'])
        ->disableToolbarButtons(['italic'])
        ->maxLength(1000)
        ->editorHeight('300px');

    $props = $field->toVueProps();

    expect($props)
        ->toHaveKey('toolbarButtons', ['bold'])
        ->toHaveKey('disabledToolbarButtons', ['italic'])
        ->toHaveKey('maxLength', 1000)
        ->toHaveKey('editorHeight', '300px');
});
