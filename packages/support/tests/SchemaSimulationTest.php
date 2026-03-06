<?php

use Primix\Forms\Form;
use Primix\Forms\Components\Fields\TextInput;
use Primix\Forms\Components\Fields\Textarea;
use Primix\Forms\Components\Fields\Select;
use Primix\Forms\Components\Fields\Toggle;
use Primix\Forms\Components\Fields\DatePicker;
use Primix\Forms\Components\Fields\TagsInput;
use Primix\Forms\Components\Fields\Repeater;
use Primix\Forms\Components\Layouts\Section;
use Primix\Forms\Components\Layouts\Grid;
use Primix\Forms\Components\Layouts\Tabs;
use Primix\Forms\Components\Layouts\Tabs\Tab;
use Primix\Tables\Table;
use Primix\Tables\Columns\TextColumn;
use Primix\Tables\Columns\BadgeColumn;
use Primix\Tables\Columns\ToggleColumn;
use Primix\Tables\Filters\SelectFilter;
use Primix\Tables\Filters\TernaryFilter;
use Primix\Support\SchemaValidator;

it('simula un form PostResource completo via schema', function () {
    // ---- Schema JSON-like (potrebbe venire da DB, API, file config) ----
    $formSchema = [
        ['type' => 'tabs', 'label' => 'Post', 'tabs' => [
            [
                'label' => 'Contenuto',
                'schema' => [
                    ['type' => 'text-input', 'name' => 'title', 'required' => true, 'placeholder' => 'Titolo del post'],
                    ['type' => 'text-input', 'name' => 'slug', 'required' => true,
                        'hidden' => ['when' => 'status', 'is' => 'draft']],
                    ['type' => 'select', 'name' => 'status', 'options' => [
                        'draft' => 'Bozza',
                        'review' => 'In revisione',
                        'published' => 'Pubblicato',
                    ], 'required' => true],
                    ['type' => 'textarea', 'name' => 'excerpt', 'label' => 'Estratto'],
                    ['type' => 'rich-editor', 'name' => 'body', 'required' => true, 'label' => 'Contenuto'],
                ],
            ],
            [
                'label' => 'Metadati',
                'schema' => [
                    ['type' => 'grid', 'columns' => 2, 'schema' => [
                        ['type' => 'date-picker', 'name' => 'published_at', 'label' => 'Data pubblicazione'],
                        ['type' => 'select', 'name' => 'category_id', 'label' => 'Categoria', 'options' => '@getCategories'],
                    ]],
                    ['type' => 'tags-input', 'name' => 'tags', 'label' => 'Tag'],
                    ['type' => 'toggle', 'name' => 'is_featured', 'label' => 'In evidenza'],
                ],
            ],
            [
                'label' => 'SEO',
                'schema' => [
                    ['type' => 'text-input', 'name' => 'meta_title', 'label' => 'Meta Title'],
                    ['type' => 'textarea', 'name' => 'meta_description', 'label' => 'Meta Description'],
                ],
            ],
        ]],
    ];

    // ---- Callbacks PHP per logica dinamica ----
    $callbacks = [
        'getCategories' => fn () => ['1' => 'Tech', '2' => 'Design', '3' => 'Business'],
    ];

    // ---- Validazione schema ----
    $validator = app(SchemaValidator::class);
    $errors = $validator->validateFormSchema($formSchema);
    expect($errors)->toBeEmpty("Schema validation errors: " . implode(', ', $errors));

    // ---- Build del form ----
    $form = Form::make()->fromSchema($formSchema, $callbacks);

    // ---- Verifiche struttura ----
    $topLevel = $form->getComponents();
    expect($topLevel)->toHaveCount(1, 'Deve avere un solo componente top-level (Tabs)');
    expect($topLevel[0])->toBeInstanceOf(Tabs::class);
    expect($topLevel[0]->getLabel())->toBe('Post');

    // 3 tab
    $tabs = $topLevel[0]->getSchema();
    expect($tabs)->toHaveCount(3);
    expect($tabs[0]->getLabel())->toBe('Contenuto');
    expect($tabs[1]->getLabel())->toBe('Metadati');
    expect($tabs[2]->getLabel())->toBe('SEO');

    // Tab "Contenuto" ha 5 field
    $contenutoFields = $tabs[0]->getSchema();
    expect($contenutoFields)->toHaveCount(5);
    expect($contenutoFields[0])->toBeInstanceOf(TextInput::class);
    expect($contenutoFields[0]->getName())->toBe('title');
    expect($contenutoFields[0]->isRequired())->toBeTrue();

    // Slug ha hidden (closure da espressione dichiarativa)
    expect($contenutoFields[1])->toBeInstanceOf(TextInput::class);
    expect($contenutoFields[1]->getName())->toBe('slug');

    // Select status con opzioni
    expect($contenutoFields[2])->toBeInstanceOf(Select::class);
    expect($contenutoFields[2]->getOptions())->toBe([
        'draft' => 'Bozza',
        'review' => 'In revisione',
        'published' => 'Pubblicato',
    ]);

    // Tab "Metadati" ha Grid + TagsInput + Toggle
    $metadatiFields = $tabs[1]->getSchema();
    expect($metadatiFields)->toHaveCount(3);
    expect($metadatiFields[0])->toBeInstanceOf(Grid::class);
    expect($metadatiFields[1])->toBeInstanceOf(TagsInput::class);
    expect($metadatiFields[2])->toBeInstanceOf(Toggle::class);
    expect($metadatiFields[2]->getLabel())->toBe('In evidenza');

    // Grid contiene 2 field
    $gridFields = $metadatiFields[0]->getSchema();
    expect($gridFields)->toHaveCount(2);
    expect($gridFields[0])->toBeInstanceOf(DatePicker::class);
    expect($gridFields[1])->toBeInstanceOf(Select::class);

    // Tutti i leaf field accessibili via getFields()
    $allFields = $form->getFields();
    $fieldNames = array_keys($allFields);
    expect($fieldNames)->toContain('title');
    expect($fieldNames)->toContain('slug');
    expect($fieldNames)->toContain('status');
    expect($fieldNames)->toContain('body');
    expect($fieldNames)->toContain('tags');
    expect($fieldNames)->toContain('is_featured');
    expect($fieldNames)->toContain('meta_title');
    expect($fieldNames)->toContain('excerpt');
    expect($fieldNames)->toContain('meta_description');
    expect($fieldNames)->toContain('published_at');
    expect($fieldNames)->toContain('category_id');
    expect($allFields)->toHaveCount(11, 'Deve avere 11 field foglia totali');
});

it('simula una table PostResource completa via schema', function () {
    $tableSchema = [
        'columns' => [
            ['type' => 'text-column', 'name' => 'title', 'searchable' => true, 'sortable' => true],
            ['type' => 'badge-column', 'name' => 'status', 'colors' => [
                'warning' => 'draft',
                'info' => 'review',
                'success' => 'published',
            ]],
            ['type' => 'text-column', 'name' => 'category.name', 'label' => 'Categoria', 'sortable' => true],
            ['type' => 'toggle-column', 'name' => 'is_featured'],
            ['type' => 'text-column', 'name' => 'published_at', 'sortable' => true],
        ],
        'filters' => [
            ['type' => 'select-filter', 'name' => 'status', 'options' => [
                'draft' => 'Bozza', 'review' => 'In revisione', 'published' => 'Pubblicato',
            ]],
            ['type' => 'ternary-filter', 'name' => 'is_featured', 'label' => 'In evidenza'],
        ],
        'actions' => [
            ['type' => 'view-action'],
            ['type' => 'edit-action'],
            ['type' => 'delete-action'],
        ],
        'bulkActions' => [
            ['type' => 'delete-bulk-action'],
        ],
        'defaultPerPage' => 25,
        'striped' => true,
    ];

    // Validazione
    $validator = app(SchemaValidator::class);
    $errors = $validator->validateTableSchema($tableSchema);
    expect($errors)->toBeEmpty("Schema validation errors: " . implode(', ', $errors));

    // Build
    $table = Table::make()->fromSchema($tableSchema);

    // Colonne
    $columns = $table->getColumns();
    expect($columns)->toHaveCount(5);
    expect($columns[0])->toBeInstanceOf(TextColumn::class);
    expect($columns[0]->getName())->toBe('title');
    expect($columns[0]->isSearchable())->toBeTrue();
    expect($columns[0]->isSortable())->toBeTrue();
    expect($columns[1])->toBeInstanceOf(BadgeColumn::class);
    expect($columns[1]->getName())->toBe('status');
    expect($columns[3])->toBeInstanceOf(ToggleColumn::class);

    // Filtri
    $filters = $table->getFilters();
    expect($filters)->toHaveCount(2);
    expect($filters[0])->toBeInstanceOf(SelectFilter::class);
    expect($filters[1])->toBeInstanceOf(TernaryFilter::class);

    // Azioni
    expect($table->getActions())->toHaveCount(3);
    expect($table->getBulkActions())->toHaveCount(1);

    // Proprieta' table-level
    expect($table->getDefaultPerPage())->toBe(25);
    expect($table->isStriped())->toBeTrue();
});

it('lo schema produce gli stessi componenti del codice PHP equivalente', function () {
    // ---- Versione Schema ----
    $schemaForm = Form::make()->fromSchema([
        ['type' => 'section', 'label' => 'Informazioni', 'collapsible' => true, 'schema' => [
            ['type' => 'text-input', 'name' => 'name', 'required' => true],
            ['type' => 'text-input', 'name' => 'email', 'required' => true],
        ]],
        ['type' => 'grid', 'columns' => 2, 'schema' => [
            ['type' => 'select', 'name' => 'role', 'options' => ['admin' => 'Admin', 'user' => 'User']],
            ['type' => 'toggle', 'name' => 'active'],
        ]],
    ]);

    // ---- Versione PHP Fluent ----
    $phpForm = Form::make()->schema([
        Section::make('Informazioni')->collapsible()->schema([
            TextInput::make('name')->required(),
            TextInput::make('email')->required(),
        ]),
        Grid::make(2)->schema([
            Select::make('role')->options(['admin' => 'Admin', 'user' => 'User']),
            Toggle::make('active'),
        ]),
    ]);

    // ---- Confronto struttura ----

    // Stesso numero di componenti top-level
    expect($schemaForm->getComponents())->toHaveCount(count($phpForm->getComponents()));

    // Stessi tipi
    $schemaTypes = array_map(fn ($c) => get_class($c), $schemaForm->getComponents());
    $phpTypes = array_map(fn ($c) => get_class($c), $phpForm->getComponents());
    expect($schemaTypes)->toBe($phpTypes);

    // Stessi field foglia
    $schemaFields = array_keys($schemaForm->getFields());
    $phpFields = array_keys($phpForm->getFields());
    sort($schemaFields);
    sort($phpFields);
    expect($schemaFields)->toBe($phpFields);

    // Stessi required
    foreach ($schemaForm->getFields() as $name => $field) {
        $phpField = $phpForm->getFields()[$name];
        expect($field->isRequired())->toBe($phpField->isRequired(), "Field '{$name}' required mismatch");
    }

    // Stessi tipi field
    foreach ($schemaForm->getFields() as $name => $field) {
        $phpField = $phpForm->getFields()[$name];
        expect(get_class($field))->toBe(get_class($phpField), "Field '{$name}' type mismatch");
    }

    // Section collapsible
    $schemaSection = $schemaForm->getComponents()[0];
    $phpSection = $phpForm->getComponents()[0];
    expect($schemaSection->isCollapsible())->toBe($phpSection->isCollapsible());
    expect($schemaSection->getLabel())->toBe($phpSection->getLabel());
});
