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

it('is not markdown by default', function () {
    $field = RichEditor::make('content');

    expect($field->isMarkdown())->toBeFalse();
});

it('can enable markdown mode', function () {
    $field = RichEditor::make('content')->markdown();

    expect($field->isMarkdown())->toBeTrue();
});

it('accepts a closure for markdown mode', function () {
    $field = RichEditor::make('content')->markdown(fn () => true);

    expect($field->isMarkdown())->toBeTrue();
});

it('removes underline from toolbar buttons in markdown mode', function () {
    $field = RichEditor::make('content')->markdown();

    expect($field->getToolbarButtons())
        ->not->toContain('underline')
        ->toContain('bold', 'italic', 'strike');
});

it('removes underline from custom toolbar buttons in markdown mode', function () {
    $field = RichEditor::make('content')
        ->toolbarButtons(['bold', 'underline', 'italic'])
        ->markdown();

    expect($field->getToolbarButtons())->toBe(['bold', 'italic']);
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
        ->toHaveKey('editorHeight', '300px')
        ->toHaveKey('markdown', false);
});

it('includes markdown in vue props when enabled', function () {
    $field = RichEditor::make('content')->markdown();

    expect($field->toVueProps())->toHaveKey('markdown', true);
});
