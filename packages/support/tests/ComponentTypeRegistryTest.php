<?php

use Primix\Support\ComponentTypeRegistry;

beforeEach(function () {
    $this->registry = new ComponentTypeRegistry();
});

it('can register and resolve a type', function () {
    $this->registry->register('field', 'text-input', 'App\\TextInput');

    expect($this->registry->resolve('text-input', 'field'))->toBe('App\\TextInput');
});

it('can register many types at once', function () {
    $this->registry->registerMany('field', [
        'text-input' => 'App\\TextInput',
        'textarea' => 'App\\Textarea',
    ]);

    expect($this->registry->resolve('text-input', 'field'))->toBe('App\\TextInput');
    expect($this->registry->resolve('textarea', 'field'))->toBe('App\\Textarea');
});

it('returns null for unregistered types', function () {
    expect($this->registry->resolve('unknown'))->toBeNull();
});

it('checks if type exists', function () {
    $this->registry->register('column', 'text-column', 'App\\TextColumn');

    expect($this->registry->has('text-column', 'column'))->toBeTrue();
    expect($this->registry->has('unknown', 'column'))->toBeFalse();
});

it('falls back to cross-category search', function () {
    $this->registry->register('field', 'text-input', 'App\\TextInput');

    // Search without category
    expect($this->registry->resolve('text-input'))->toBe('App\\TextInput');

    // Search in wrong category falls back
    expect($this->registry->resolve('text-input', 'column'))->toBe('App\\TextInput');
});

it('infers category from alias suffix', function () {
    $this->registry->register('column', 'text-column', 'App\\TextColumn');
    $this->registry->register('filter', 'select-filter', 'App\\SelectFilter');
    $this->registry->register('action', 'delete-action', 'App\\DeleteAction');

    // Resolve without explicit category, inference from suffix
    expect($this->registry->resolve('text-column'))->toBe('App\\TextColumn');
    expect($this->registry->resolve('select-filter'))->toBe('App\\SelectFilter');
    expect($this->registry->resolve('delete-action'))->toBe('App\\DeleteAction');
});

it('returns all types in a category', function () {
    $this->registry->registerMany('field', [
        'text-input' => 'App\\TextInput',
        'select' => 'App\\Select',
    ]);

    expect($this->registry->getCategory('field'))->toBe([
        'text-input' => 'App\\TextInput',
        'select' => 'App\\Select',
    ]);
});

it('returns empty array for unknown category', function () {
    expect($this->registry->getCategory('unknown'))->toBe([]);
});

it('returns all registered types', function () {
    $this->registry->register('field', 'text-input', 'App\\TextInput');
    $this->registry->register('column', 'text-column', 'App\\TextColumn');

    $all = $this->registry->all();

    expect($all)->toHaveKeys(['field', 'column']);
    expect($all['field'])->toBe(['text-input' => 'App\\TextInput']);
    expect($all['column'])->toBe(['text-column' => 'App\\TextColumn']);
});

it('prefers exact category match over cross-category', function () {
    $this->registry->register('field', 'select', 'App\\Fields\\Select');
    $this->registry->register('column', 'select', 'App\\Columns\\Select');

    expect($this->registry->resolve('select', 'field'))->toBe('App\\Fields\\Select');
    expect($this->registry->resolve('select', 'column'))->toBe('App\\Columns\\Select');
});
