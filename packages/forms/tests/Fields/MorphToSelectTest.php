<?php

use Primix\Forms\Components\Fields\MorphToSelect;
use Primix\Forms\Components\Fields\MorphType;

// --- MorphToSelect ---

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

it('getTypes returns MorphType objects keyed by model class', function () {
    $field = MorphToSelect::make('morph')->types([
        MorphType::make('App\\Models\\Post')->titleAttribute('title'),
    ]);

    $types = $field->getTypes();

    expect($types)->toHaveKey('App\\Models\\Post')
        ->and($types['App\\Models\\Post'])->toBeInstanceOf(MorphType::class);
});

it('getTypes handles MorphType with custom label', function () {
    $field = MorphToSelect::make('morph')->types([
        MorphType::make('App\\Models\\Post')->titleAttribute('name')->label('Blog Posts'),
    ]);

    $types = $field->getTypes();

    expect($types['App\\Models\\Post']->getLabel())->toBe('Blog Posts');
});

it('returns type options', function () {
    $field = MorphToSelect::make('morph')->types([
        MorphType::make('App\\Models\\Post')->titleAttribute('title'),
        MorphType::make('App\\Models\\Video')->titleAttribute('name'),
    ]);

    expect($field->getTypeOptions())->toBe([
        'App\\Models\\Post' => 'Posts',
        'App\\Models\\Video' => 'Videos',
    ]);
});

it('returns type options for vue', function () {
    $field = MorphToSelect::make('morph')->types([
        MorphType::make('App\\Models\\Post')->titleAttribute('title'),
    ]);

    expect($field->getTypeOptionsForVue())->toBe([
        ['label' => 'Posts', 'value' => 'App\\Models\\Post'],
    ]);
});

it('generates label from camel case model name', function () {
    $field = MorphToSelect::make('morph')->types([
        MorphType::make('App\\Models\\BlogPost')->titleAttribute('title'),
    ]);

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
        ->types([MorphType::make('App\\Models\\Post')->titleAttribute('title')])
        ->searchable();

    $props = $field->toVueProps();

    expect($props)
        ->toHaveKey('types')
        ->toHaveKey('searchable', true);
});

// --- MorphType ---

it('MorphType can be created with model class', function () {
    $type = MorphType::make('App\\Models\\Post');

    expect($type->getModelClass())->toBe('App\\Models\\Post');
});

it('MorphType has default titleAttribute of id', function () {
    $type = MorphType::make('App\\Models\\Post');

    expect($type->getTitleAttribute())->toBe('id');
});

it('MorphType can set titleAttribute as string', function () {
    $type = MorphType::make('App\\Models\\Post')->titleAttribute('title');

    expect($type->getTitleAttribute())->toBe('title');
});

it('MorphType can set titleAttribute as closure', function () {
    $type = MorphType::make('App\\Models\\Post')->titleAttribute(fn ($r) => $r->name);

    expect($type->getTitleAttribute())->toBeInstanceOf(Closure::class);
});

it('MorphType auto-generates label from model class', function () {
    $type = MorphType::make('App\\Models\\Post');

    expect($type->getLabel())->toBe('Posts');
});

it('MorphType auto-generates label from camel case model', function () {
    $type = MorphType::make('App\\Models\\BlogPost');

    expect($type->getLabel())->toBe('Blog Posts');
});

it('MorphType can set custom label as string', function () {
    $type = MorphType::make('App\\Models\\Post')->label('Articoli');

    expect($type->getLabel())->toBe('Articoli');
});

it('MorphType can set custom label as closure', function () {
    $type = MorphType::make('App\\Models\\Post')->label(fn () => 'Dynamic Label');

    expect($type->getLabel())->toBe('Dynamic Label');
});

it('MorphType has null modifyQueryUsing by default', function () {
    $type = MorphType::make('App\\Models\\Post');

    expect($type->getModifyQueryUsing())->toBeNull();
});

it('MorphType can set modifyQueryUsing', function () {
    $type = MorphType::make('App\\Models\\Post')->modifyQueryUsing(fn ($q) => $q);

    expect($type->getModifyQueryUsing())->toBeInstanceOf(Closure::class);
});

it('MorphType resolves title from string attribute', function () {
    $type = MorphType::make('App\\Models\\Post')->titleAttribute('title');
    $record = new class extends \Illuminate\Database\Eloquent\Model {
        public string $title = 'Hello World';
    };

    expect($type->resolveTitle($record))->toBe('Hello World');
});

it('MorphType resolves title from closure', function () {
    $type = MorphType::make('App\\Models\\Post')->titleAttribute(fn ($r) => strtoupper($r->name));
    $record = new class extends \Illuminate\Database\Eloquent\Model {
        public string $name = 'hello';
    };

    expect($type->resolveTitle($record))->toBe('HELLO');
});
