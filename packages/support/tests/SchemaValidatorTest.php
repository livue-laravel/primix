<?php

use Primix\Support\SchemaValidator;

beforeEach(function () {
    $this->validator = app(SchemaValidator::class);
});

it('validates a correct form schema', function () {
    $errors = $this->validator->validateFormSchema([
        ['type' => 'text-input', 'name' => 'title'],
        ['type' => 'select', 'name' => 'status', 'options' => ['draft' => 'Bozza']],
    ]);

    expect($errors)->toBeEmpty();
});

it('detects missing type key', function () {
    $errors = $this->validator->validateFormSchema([
        ['name' => 'title'],
    ]);

    expect($errors)->toHaveCount(1);
    expect($errors[0])->toContain('missing required \'type\'');
});

it('detects unknown type', function () {
    $errors = $this->validator->validateFormSchema([
        ['type' => 'unknown-widget', 'name' => 'foo'],
    ]);

    expect($errors)->toHaveCount(1);
    expect($errors[0])->toContain('unknown type');
});

it('detects missing name for fields', function () {
    $errors = $this->validator->validateFormSchema([
        ['type' => 'text-input'],
    ]);

    expect($errors)->toHaveCount(1);
    expect($errors[0])->toContain('missing required \'name\'');
});

it('allows layouts without name', function () {
    $errors = $this->validator->validateFormSchema([
        [
            'type' => 'section',
            'label' => 'Details',
            'schema' => [
                ['type' => 'text-input', 'name' => 'title'],
            ],
        ],
    ]);

    expect($errors)->toBeEmpty();
});

it('validates nested schema recursively', function () {
    $errors = $this->validator->validateFormSchema([
        [
            'type' => 'section',
            'label' => 'Details',
            'schema' => [
                ['type' => 'text-input', 'name' => 'title'],
                ['type' => 'unknown-type', 'name' => 'bad'],
            ],
        ],
    ]);

    expect($errors)->toHaveCount(1);
    expect($errors[0])->toContain('unknown type');
});

it('validates table schema columns', function () {
    $errors = $this->validator->validateTableSchema([
        'columns' => [
            ['type' => 'text-column', 'name' => 'title'],
            ['type' => 'badge-column', 'name' => 'status'],
        ],
    ]);

    expect($errors)->toBeEmpty();
});

it('validates table schema filters', function () {
    $errors = $this->validator->validateTableSchema([
        'filters' => [
            ['type' => 'select-filter', 'name' => 'status'],
        ],
    ]);

    expect($errors)->toBeEmpty();
});

it('detects errors in table columns', function () {
    $errors = $this->validator->validateTableSchema([
        'columns' => [
            ['type' => 'unknown-column', 'name' => 'title'],
        ],
    ]);

    expect($errors)->toHaveCount(1);
    expect($errors[0])->toContain('unknown type');
});

it('detects missing name in table columns', function () {
    $errors = $this->validator->validateTableSchema([
        'columns' => [
            ['type' => 'text-column'],
        ],
    ]);

    expect($errors)->toHaveCount(1);
    expect($errors[0])->toContain('missing required \'name\'');
});

it('validates tabs in nested schema', function () {
    $errors = $this->validator->validateFormSchema([
        [
            'type' => 'tabs',
            'label' => 'Info',
            'tabs' => [
                [
                    'label' => 'General',
                    'schema' => [
                        ['type' => 'text-input', 'name' => 'title'],
                    ],
                ],
            ],
        ],
    ]);

    expect($errors)->toBeEmpty();
});

it('validates multiple sections in table schema', function () {
    $errors = $this->validator->validateTableSchema([
        'columns' => [
            ['type' => 'text-column', 'name' => 'title'],
        ],
        'filters' => [
            ['type' => 'select-filter', 'name' => 'status'],
        ],
        'actions' => [
            ['type' => 'edit-action'],
        ],
    ]);

    expect($errors)->toBeEmpty();
});

it('returns empty errors for empty schema', function () {
    expect($this->validator->validateFormSchema([]))->toBeEmpty();
    expect($this->validator->validateTableSchema([]))->toBeEmpty();
});
