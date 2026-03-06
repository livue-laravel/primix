<?php

use Primix\Details\Components\Entries\ListEntry;
use Primix\Details\Components\Entries\TextEntry;
use Primix\Details\Details;
use Primix\Forms\Components\Fields\TextInput;
use Primix\Forms\Components\Layouts\Section;
use Primix\Forms\Form;
use Primix\Support\Enums\SchemaContext;

it('can be created with make', function () {
    $details = Details::make();

    expect($details)->toBeInstanceOf(Details::class);
});

it('has default name of details', function () {
    $details = Details::make();

    expect($details->getName())->toBe('details');
});

it('has infolist schema context', function () {
    $details = Details::make();

    expect($details->getContext())->toBe(SchemaContext::Infolist);
});

it('can set schema with entries', function () {
    $details = Details::make()->schema([
        TextEntry::make('name'),
        TextEntry::make('email'),
    ]);

    expect($details->getComponents())->toHaveCount(2);
});

it('extracts entries from nested schema', function () {
    $details = Details::make()->schema([
        Section::make('Info')->schema([
            TextEntry::make('name'),
            TextEntry::make('email'),
        ]),
    ]);

    $entries = $details->getEntries();

    expect($entries)->toHaveCount(2);
    expect(array_keys($entries))->toBe(['name', 'email']);
});

it('text entries can be used inside form schemas without validation rules', function () {
    $form = Form::make()->schema([
        TextInput::make('title')->required(),
        TextEntry::make('status'),
        ListEntry::make('tags'),
    ]);

    $rules = $form->getValidationRules();

    expect($rules)->toHaveCount(1);
    expect($rules)->toHaveKey('title');
    expect($rules)->not->toHaveKey('status');
    expect($rules)->not->toHaveKey('tags');
});
