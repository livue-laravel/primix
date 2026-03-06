<?php

use Primix\Forms\Components\Fields\MorphToSelect;

it('has null relationship by default', function () {
    $field = MorphToSelect::make('morph');

    expect($field->getRelationshipName())->toBeNull();
});

it('can set relationship', function () {
    $field = MorphToSelect::make('morph')->relationship('commentable');

    expect($field->getRelationshipName())->toBe('commentable');
});

it('has no relationship by default', function () {
    $field = MorphToSelect::make('morph');

    expect($field->hasRelationship())->toBeFalse();
});

it('detects relationship is set', function () {
    $field = MorphToSelect::make('morph')->relationship('commentable');

    expect($field->hasRelationship())->toBeTrue();
});

it('is not searchable by default', function () {
    $field = MorphToSelect::make('morph');

    expect($field->isSearchable())->toBeFalse();
});

it('can be searchable', function () {
    $field = MorphToSelect::make('morph')->searchable();

    expect($field->isSearchable())->toBeTrue();
});

it('can be searchable with columns', function () {
    $field = MorphToSelect::make('morph')->searchable(['name', 'email']);

    expect($field->isSearchable())->toBeTrue()
        ->and($field->getSearchColumns())->toBe(['name', 'email']);
});

it('has null search columns by default', function () {
    $field = MorphToSelect::make('morph');

    expect($field->getSearchColumns())->toBeNull();
});

it('has null search columns when searchable with boolean', function () {
    $field = MorphToSelect::make('morph')->searchable();

    expect($field->getSearchColumns())->toBeNull();
});

it('is not preload by default', function () {
    $field = MorphToSelect::make('morph');

    expect($field->isPreload())->toBeFalse();
});

it('can preload', function () {
    $field = MorphToSelect::make('morph')->preload();

    expect($field->isPreload())->toBeTrue();
});

it('detects async search mode', function () {
    $field = MorphToSelect::make('morph')->searchable();

    expect($field->isAsyncSearch())->toBeTrue();
});

it('async search is false when preload is true', function () {
    $field = MorphToSelect::make('morph')->searchable()->preload();

    expect($field->isAsyncSearch())->toBeFalse();
});

it('async search is false when not searchable', function () {
    $field = MorphToSelect::make('morph');

    expect($field->isAsyncSearch())->toBeFalse();
});

it('has default search debounce of 500', function () {
    $field = MorphToSelect::make('morph');

    expect($field->getSearchDebounce())->toBe(500);
});

it('can set search debounce', function () {
    $field = MorphToSelect::make('morph')->searchDebounce(300);

    expect($field->getSearchDebounce())->toBe(300);
});

it('has default min search length of 1', function () {
    $field = MorphToSelect::make('morph');

    expect($field->getMinSearchLength())->toBe(1);
});

it('can set min search length', function () {
    $field = MorphToSelect::make('morph')->minSearchLength(3);

    expect($field->getMinSearchLength())->toBe(3);
});

it('has default options limit of 50', function () {
    $field = MorphToSelect::make('morph');

    expect($field->getOptionsLimit())->toBe(50);
});

it('can set options limit', function () {
    $field = MorphToSelect::make('morph')->optionsLimit(100);

    expect($field->getOptionsLimit())->toBe(100);
});

it('has empty types by default', function () {
    $field = MorphToSelect::make('morph');

    expect($field->getTypes())->toBe([]);
});

it('normalizes simple type config', function () {
    $field = MorphToSelect::make('morph')->types(['App\\Models\\Post' => 'title']);

    expect($field->getTypes())->toBe([
        'App\\Models\\Post' => [
            'titleAttribute' => 'title',
            'label' => 'Posts',
            'modifyQueryUsing' => null,
        ],
    ]);
});

it('normalizes full type config', function () {
    $field = MorphToSelect::make('morph')->types([
        'App\\Models\\Post' => [
            'titleAttribute' => 'name',
            'label' => 'Blog Posts',
        ],
    ]);

    expect($field->getTypes())->toBe([
        'App\\Models\\Post' => [
            'titleAttribute' => 'name',
            'label' => 'Blog Posts',
            'modifyQueryUsing' => null,
        ],
    ]);
});

it('returns type options', function () {
    $field = MorphToSelect::make('morph')->types([
        'App\\Models\\Post' => 'title',
        'App\\Models\\Video' => 'name',
    ]);

    expect($field->getTypeOptions())->toBe([
        'App\\Models\\Post' => 'Posts',
        'App\\Models\\Video' => 'Videos',
    ]);
});

it('returns type options for vue', function () {
    $field = MorphToSelect::make('morph')->types(['App\\Models\\Post' => 'title']);

    expect($field->getTypeOptionsForVue())->toBe([
        [
            'label' => 'Posts',
            'value' => 'App\\Models\\Post',
        ],
    ]);
});

it('generates label from camel case model name', function () {
    $field = MorphToSelect::make('morph')->types(['App\\Models\\BlogPost' => 'title']);

    expect($field->getTypeOptions())->toBe([
        'App\\Models\\BlogPost' => 'Blog Posts',
    ]);
});

it('returns correct view', function () {
    $field = MorphToSelect::make('morph');

    expect($field->getView())->toBe('primix-forms::components.fields.morph-to-select');
});

it('returns complete vue props', function () {
    $field = MorphToSelect::make('morph')
        ->types(['App\\Models\\Post' => 'title'])
        ->searchable();

    $props = $field->toVueProps();

    expect($props)
        ->toHaveKey('types')
        ->toHaveKey('searchable', true);
});
