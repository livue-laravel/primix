<?php

use Primix\Tables\Table;
use Primix\Tables\Columns\TextColumn;
use Primix\Tables\Columns\BadgeColumn;
use Primix\Tables\Filters\SelectFilter;

it('builds a table from schema array', function () {
    $table = Table::make()->fromSchema([
        'columns' => [
            ['type' => 'text-column', 'name' => 'title', 'searchable' => true, 'sortable' => true],
            ['type' => 'badge-column', 'name' => 'status'],
        ],
    ]);

    expect($table)->toBeInstanceOf(Table::class);

    $columns = $table->getColumns();
    expect($columns)->toHaveCount(2);
    expect($columns[0])->toBeInstanceOf(TextColumn::class);
    expect($columns[0]->isSearchable())->toBeTrue();
    expect($columns[0]->isSortable())->toBeTrue();
    expect($columns[1])->toBeInstanceOf(BadgeColumn::class);
});

it('builds table with filters', function () {
    $table = Table::make()->fromSchema([
        'columns' => [
            ['type' => 'text-column', 'name' => 'title'],
        ],
        'filters' => [
            ['type' => 'select-filter', 'name' => 'status', 'options' => ['draft' => 'Bozza']],
        ],
    ]);

    $filters = $table->getFilters();
    expect($filters)->toHaveCount(1);
    expect($filters[0])->toBeInstanceOf(SelectFilter::class);
});

it('applies table-level properties', function () {
    $table = Table::make()->fromSchema([
        'columns' => [
            ['type' => 'text-column', 'name' => 'title'],
        ],
        'defaultPerPage' => 25,
        'striped' => true,
    ]);

    expect($table->getDefaultPerPage())->toBe(25);
    expect($table->isStriped())->toBeTrue();
});

it('builds table with columns and actions', function () {
    $table = Table::make()->fromSchema([
        'columns' => [
            ['type' => 'text-column', 'name' => 'title'],
        ],
        'actions' => [
            ['type' => 'edit-action'],
            ['type' => 'delete-action'],
        ],
        'bulkActions' => [
            ['type' => 'delete-bulk-action'],
        ],
    ]);

    expect($table->getColumns())->toHaveCount(1);
    expect($table->getActions())->toHaveCount(2);
    expect($table->getBulkActions())->toHaveCount(1);
});

it('handles empty schema gracefully', function () {
    $table = Table::make()->fromSchema([]);

    expect($table->getColumns())->toBeEmpty();
    expect($table->getFilters())->toBeEmpty();
});

it('produces same columns as PHP fluent API', function () {
    // Build via schema
    $schemaTable = Table::make()->fromSchema([
        'columns' => [
            ['type' => 'text-column', 'name' => 'title', 'searchable' => true],
            ['type' => 'text-column', 'name' => 'created_at'],
        ],
    ]);

    // Build via PHP
    $phpTable = Table::make()
        ->columns([
            TextColumn::make('title')->searchable(),
            TextColumn::make('created_at'),
        ]);

    // Compare column counts and names
    $schemaColumns = array_map(fn ($c) => $c->getName(), $schemaTable->getColumns());
    $phpColumns = array_map(fn ($c) => $c->getName(), $phpTable->getColumns());

    expect($schemaColumns)->toBe($phpColumns);
});
