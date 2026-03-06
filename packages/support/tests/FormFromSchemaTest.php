<?php

use Primix\Forms\Form;
use Primix\Forms\Components\Fields\TextInput;
use Primix\Forms\Components\Fields\Select;
use Primix\Forms\Components\Fields\Textarea;
use Primix\Forms\Components\Fields\DatePicker;
use Primix\Forms\Components\Layouts\Section;

it('builds a form from schema array', function () {
    $form = Form::make()->fromSchema([
        ['type' => 'text-input', 'name' => 'title', 'required' => true],
        ['type' => 'select', 'name' => 'status', 'options' => ['draft' => 'Bozza', 'published' => 'Pubblicato']],
    ]);

    expect($form)->toBeInstanceOf(Form::class);

    $fields = $form->getFields();
    expect($fields)->toHaveCount(2);
});

it('builds a form with nested section', function () {
    $form = Form::make()->fromSchema([
        ['type' => 'text-input', 'name' => 'title'],
        [
            'type' => 'section',
            'label' => 'Dettagli',
            'schema' => [
                ['type' => 'textarea', 'name' => 'body'],
                ['type' => 'date-picker', 'name' => 'published_at'],
            ],
        ],
    ]);

    $schema = $form->getComponents();
    expect($schema)->toHaveCount(2);
    expect($schema[0])->toBeInstanceOf(TextInput::class);
    expect($schema[1])->toBeInstanceOf(Section::class);

    // All leaf fields should be accessible
    $fields = $form->getFields();
    expect($fields)->toHaveCount(3);
});

it('builds a form with callbacks', function () {
    $optionsClosure = fn () => ['a' => 'Option A', 'b' => 'Option B'];

    $form = Form::make()->fromSchema([
        ['type' => 'select', 'name' => 'category', 'options' => '@getCategories'],
    ], [
        'getCategories' => $optionsClosure,
    ]);

    $schema = $form->getComponents();
    expect($schema)->toHaveCount(1);
    expect($schema[0])->toBeInstanceOf(Select::class);
});

it('builds a form with declarative expressions', function () {
    $form = Form::make()->fromSchema([
        ['type' => 'select', 'name' => 'status', 'options' => ['draft' => 'Bozza', 'published' => 'Pubblicato']],
        ['type' => 'text-input', 'name' => 'slug', 'hidden' => ['when' => 'status', 'is' => 'draft']],
    ]);

    $schema = $form->getComponents();
    expect($schema)->toHaveCount(2);
});

it('produces same result as PHP fluent API', function () {
    // Build via schema
    $schemaForm = Form::make()->fromSchema([
        ['type' => 'text-input', 'name' => 'title', 'required' => true],
        ['type' => 'textarea', 'name' => 'body'],
    ]);

    // Build via PHP
    $phpForm = Form::make()->schema([
        TextInput::make('title')->required(),
        Textarea::make('body'),
    ]);

    // Compare field names
    $schemaFields = array_keys($schemaForm->getFields());
    $phpFields = array_keys($phpForm->getFields());

    expect($schemaFields)->toBe($phpFields);
});
