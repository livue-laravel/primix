<?php

use Primix\Forms\Components\Fields\TextInput;
use Primix\Forms\Components\Fields\Select;
use Primix\Forms\Components\Fields\Textarea;
use Primix\Forms\Components\Fields\DatePicker;
use Primix\Forms\Components\Fields\Repeater;
use Primix\Forms\Components\Layouts\Section;
use Primix\Forms\Components\Layouts\Grid;
use Primix\Forms\Components\Layouts\Tabs;
use Primix\Forms\Components\Layouts\Tabs\Tab;
use Primix\Tables\Columns\TextColumn;
use Primix\Tables\Columns\BadgeColumn;
use Primix\Tables\Filters\SelectFilter;
use Primix\Support\SchemaBuilder;
use Primix\Support\ComponentTypeRegistry;

beforeEach(function () {
    $this->builder = app(SchemaBuilder::class);
});

it('builds a simple field', function () {
    $components = $this->builder->build([
        ['type' => 'text-input', 'name' => 'title'],
    ], 'field');

    expect($components)->toHaveCount(1);
    expect($components[0])->toBeInstanceOf(TextInput::class);
    expect($components[0]->getName())->toBe('title');
});

it('builds multiple fields', function () {
    $components = $this->builder->build([
        ['type' => 'text-input', 'name' => 'title'],
        ['type' => 'select', 'name' => 'status'],
        ['type' => 'textarea', 'name' => 'body'],
    ], 'field');

    expect($components)->toHaveCount(3);
    expect($components[0])->toBeInstanceOf(TextInput::class);
    expect($components[1])->toBeInstanceOf(Select::class);
    expect($components[2])->toBeInstanceOf(Textarea::class);
});

it('applies fluent properties', function () {
    $components = $this->builder->build([
        ['type' => 'text-input', 'name' => 'title', 'required' => true, 'placeholder' => 'Enter title'],
    ], 'field');

    expect($components[0])->toBeInstanceOf(TextInput::class);
    expect($components[0]->isRequired())->toBeTrue();
});

it('applies select options', function () {
    $components = $this->builder->build([
        ['type' => 'select', 'name' => 'status', 'options' => ['draft' => 'Bozza', 'published' => 'Pubblicato']],
    ], 'field');

    expect($components[0])->toBeInstanceOf(Select::class);
    expect($components[0]->getOptions())->toBe(['draft' => 'Bozza', 'published' => 'Pubblicato']);
});

it('builds nested schema in section', function () {
    $components = $this->builder->build([
        [
            'type' => 'section',
            'label' => 'Dettagli',
            'schema' => [
                ['type' => 'text-input', 'name' => 'title'],
                ['type' => 'textarea', 'name' => 'body'],
            ],
        ],
    ], 'field');

    expect($components)->toHaveCount(1);
    expect($components[0])->toBeInstanceOf(Section::class);
    expect($components[0]->getLabel())->toBe('Dettagli');

    $children = $components[0]->getSchema();
    expect($children)->toHaveCount(2);
    expect($children[0])->toBeInstanceOf(TextInput::class);
    expect($children[1])->toBeInstanceOf(Textarea::class);
});

it('builds grid layout', function () {
    $components = $this->builder->build([
        [
            'type' => 'grid',
            'columns' => 3,
            'schema' => [
                ['type' => 'text-input', 'name' => 'first_name'],
                ['type' => 'text-input', 'name' => 'last_name'],
            ],
        ],
    ], 'field');

    expect($components)->toHaveCount(1);
    expect($components[0])->toBeInstanceOf(Grid::class);
});

it('builds tabs with tab children', function () {
    $components = $this->builder->build([
        [
            'type' => 'tabs',
            'label' => 'Info',
            'tabs' => [
                [
                    'label' => 'Generale',
                    'schema' => [
                        ['type' => 'text-input', 'name' => 'title'],
                    ],
                ],
                [
                    'label' => 'SEO',
                    'schema' => [
                        ['type' => 'text-input', 'name' => 'meta_title'],
                    ],
                ],
            ],
        ],
    ], 'field');

    expect($components)->toHaveCount(1);
    expect($components[0])->toBeInstanceOf(Tabs::class);

    $tabs = $components[0]->getSchema();
    expect($tabs)->toHaveCount(2);
    expect($tabs[0])->toBeInstanceOf(Tab::class);
    expect($tabs[0]->getLabel())->toBe('Generale');
    expect($tabs[1])->toBeInstanceOf(Tab::class);
    expect($tabs[1]->getLabel())->toBe('SEO');
});

it('builds repeater with nested schema', function () {
    $components = $this->builder->build([
        [
            'type' => 'repeater',
            'name' => 'items',
            'schema' => [
                ['type' => 'text-input', 'name' => 'name', 'required' => true],
                ['type' => 'text-input', 'name' => 'value'],
            ],
        ],
    ], 'field');

    expect($components)->toHaveCount(1);
    expect($components[0])->toBeInstanceOf(Repeater::class);
    expect($components[0]->getName())->toBe('items');

    $children = $components[0]->getSchema();
    expect($children)->toHaveCount(2);
});

it('resolves named callbacks with @ prefix', function () {
    $called = false;
    $callbacks = [
        'myCallback' => function () use (&$called) {
            $called = true;
        },
    ];

    $components = $this->builder->build([
        ['type' => 'select', 'name' => 'status', 'options' => '@myCallback'],
    ], 'field', $callbacks);

    expect($components[0])->toBeInstanceOf(Select::class);
    // The callback was set as the options value
    expect($components[0]->getOptions())->toBeArray();
});

it('resolves declarative expressions', function () {
    $components = $this->builder->build([
        [
            'type' => 'text-input',
            'name' => 'slug',
            'hidden' => ['when' => 'status', 'is' => 'draft'],
        ],
    ], 'field');

    expect($components[0])->toBeInstanceOf(TextInput::class);
    // The hidden property should be set to a closure
});

it('skips definitions without type', function () {
    $components = $this->builder->build([
        ['name' => 'title'],
        ['type' => 'text-input', 'name' => 'body'],
    ], 'field');

    expect($components)->toHaveCount(1);
    expect($components[0])->toBeInstanceOf(TextInput::class);
});

it('skips unknown types', function () {
    $components = $this->builder->build([
        ['type' => 'unknown-widget', 'name' => 'foo'],
        ['type' => 'text-input', 'name' => 'bar'],
    ], 'field');

    expect($components)->toHaveCount(1);
    expect($components[0])->toBeInstanceOf(TextInput::class);
});

it('builds table columns', function () {
    $components = $this->builder->build([
        ['type' => 'text-column', 'name' => 'title', 'searchable' => true, 'sortable' => true],
        ['type' => 'badge-column', 'name' => 'status'],
    ], 'column');

    expect($components)->toHaveCount(2);
    expect($components[0])->toBeInstanceOf(TextColumn::class);
    expect($components[0]->getName())->toBe('title');
    expect($components[0]->isSearchable())->toBeTrue();
    expect($components[0]->isSortable())->toBeTrue();
    expect($components[1])->toBeInstanceOf(BadgeColumn::class);
});

it('builds table filters', function () {
    $components = $this->builder->build([
        ['type' => 'select-filter', 'name' => 'status', 'options' => ['draft' => 'Bozza']],
    ], 'filter');

    expect($components)->toHaveCount(1);
    expect($components[0])->toBeInstanceOf(SelectFilter::class);
    expect($components[0]->getName())->toBe('status');
});

it('converts kebab-case keys to camelCase methods', function () {
    $components = $this->builder->build([
        ['type' => 'text-input', 'name' => 'email', 'helper-text' => 'Your email address'],
    ], 'field');

    expect($components[0])->toBeInstanceOf(TextInput::class);
});

it('resolves cross-category types', function () {
    // A layout type used in a field context
    $components = $this->builder->build([
        [
            'type' => 'section',
            'label' => 'Test',
            'schema' => [
                ['type' => 'text-input', 'name' => 'title'],
            ],
        ],
    ], 'field');

    expect($components)->toHaveCount(1);
    expect($components[0])->toBeInstanceOf(Section::class);
});
