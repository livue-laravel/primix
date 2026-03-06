<?php

use Primix\Forms\Components\Fields\Select;

it('can set options', function () {
    $field = Select::make('status')->options([
        'draft' => 'Draft',
        'published' => 'Published',
    ]);

    expect($field->getOptions())->toBe([
        'draft' => 'Draft',
        'published' => 'Published',
    ]);
});

it('returns empty array when no options set', function () {
    $field = Select::make('status');

    expect($field->getOptions())->toBe([]);
});

it('formats options for vue', function () {
    $field = Select::make('status')->options([
        'draft' => 'Draft',
        'published' => 'Published',
    ]);

    expect($field->getOptionsForVue())->toBe([
        ['label' => 'Draft', 'value' => 'draft'],
        ['label' => 'Published', 'value' => 'published'],
    ]);
});

it('can be multiple', function () {
    $field = Select::make('tags')->multiple();

    expect($field->isMultiple())->toBeTrue();
});

it('is not multiple by default', function () {
    $field = Select::make('status');

    expect($field->isMultiple())->toBeFalse();
});

it('can set in rule', function () {
    $field = Select::make('status')->in(['draft', 'published']);

    expect($field->getRules())->toBe('in:draft,published');
});

it('can set notIn rule', function () {
    $field = Select::make('status')->notIn(['archived']);

    expect($field->getRules())->toBe('not_in:archived');
});

it('can be searchable with boolean', function () {
    $field = Select::make('status')->searchable();

    expect($field->isSearchable())->toBeTrue();
    expect($field->getSearchColumns())->toBeNull();
});

it('can be searchable with array of columns', function () {
    $field = Select::make('user_id')->searchable(['name', 'email']);

    expect($field->isSearchable())->toBeTrue();
    expect($field->getSearchColumns())->toBe(['name', 'email']);
});

it('is not searchable by default', function () {
    $field = Select::make('status');

    expect($field->isSearchable())->toBeFalse();
});

it('can preload options', function () {
    $field = Select::make('status')->preload();

    expect($field->isPreload())->toBeTrue();
});

it('is not preload by default', function () {
    $field = Select::make('status');

    expect($field->isPreload())->toBeFalse();
});

it('detects async search mode', function () {
    $field = Select::make('status')->searchable();

    expect($field->isAsyncSearch())->toBeTrue();
});

it('async search is false when preload is true', function () {
    $field = Select::make('status')->searchable()->preload();

    expect($field->isAsyncSearch())->toBeFalse();
});

it('async search is false when not searchable', function () {
    $field = Select::make('status');

    expect($field->isAsyncSearch())->toBeFalse();
});

it('can set search debounce', function () {
    $field = Select::make('status')->searchDebounce(300);

    expect($field->getSearchDebounce())->toBe(300);
});

it('has default search debounce of 500', function () {
    $field = Select::make('status');

    expect($field->getSearchDebounce())->toBe(500);
});

it('can set min search length', function () {
    $field = Select::make('status')->minSearchLength(3);

    expect($field->getMinSearchLength())->toBe(3);
});

it('has default min search length of 1', function () {
    $field = Select::make('status');

    expect($field->getMinSearchLength())->toBe(1);
});

it('can be native', function () {
    $field = Select::make('status')->native();

    expect($field->isNative())->toBeTrue();
});

it('is not native by default', function () {
    $field = Select::make('status');

    expect($field->isNative())->toBeFalse();
});

it('can set search prompt', function () {
    $field = Select::make('status')->searchPrompt('Type to search...');

    $props = $field->toVueProps();
    expect($props['searchPrompt'])->toBe('Type to search...');
});

it('can set no search results message', function () {
    $field = Select::make('status')->noSearchResultsMessage('Nothing found');

    $props = $field->toVueProps();
    expect($props['noSearchResultsMessage'])->toBe('Nothing found');
});

it('can set loading message', function () {
    $field = Select::make('status')->loadingMessage('Loading...');

    $props = $field->toVueProps();
    expect($props['loadingMessage'])->toBe('Loading...');
});

it('can set options limit', function () {
    $field = Select::make('status')->optionsLimit(100);

    $props = $field->toVueProps();
    expect($props['optionsLimit'])->toBe(100);
});

it('returns correct view', function () {
    $field = Select::make('status');

    expect($field->getView())->toBe('primix-forms::components.fields.select');
});

it('returns complete vue props', function () {
    $field = Select::make('status')
        ->options(['a' => 'A'])
        ->multiple()
        ->searchable()
        ->native();

    $props = $field->toVueProps();

    expect($props)
        ->toHaveKey('options')
        ->toHaveKey('multiple', true)
        ->toHaveKey('searchable', true)
        ->toHaveKey('native', true)
        ->toHaveKey('preload', false)
        ->toHaveKey('searchDebounce')
        ->toHaveKey('minSearchLength');
});

it('can use custom search callback', function () {
    $callback = fn (string $search) => ['result' => $search];
    $field = Select::make('status')->getSearchResultsUsing($callback);

    expect($field->searchOptions('test'))->toBe(['result' => 'test']);
});

it('can be tree select', function () {
    $field = Select::make('category')->tree();

    expect($field->isTree())->toBeTrue();
});

it('is not tree by default', function () {
    $field = Select::make('category');

    expect($field->isTree())->toBeFalse();
});

it('can be cascading select', function () {
    $field = Select::make('location')->cascading();

    expect($field->isCascading())->toBeTrue();
});

it('is not cascading by default', function () {
    $field = Select::make('location');

    expect($field->isCascading())->toBeFalse();
});

it('can be listbox', function () {
    $field = Select::make('items')->listbox();

    expect($field->isListbox())->toBeTrue();
});

it('is not listbox by default', function () {
    $field = Select::make('items');

    expect($field->isListbox())->toBeFalse();
});

it('can be autocomplete', function () {
    $field = Select::make('search')->autoComplete();

    expect($field->isAutocomplete())->toBeTrue();
});

it('is not autocomplete by default', function () {
    $field = Select::make('search');

    expect($field->isAutocomplete())->toBeFalse();
});

it('includes variant props in vue props', function () {
    $field = Select::make('test')->tree();

    $props = $field->toVueProps();

    expect($props)
        ->toHaveKey('tree', true)
        ->toHaveKey('cascading', false)
        ->toHaveKey('listbox', false)
        ->toHaveKey('autoComplete', false);
});

it('can filter options using hide mode', function () {
    $field = Select::make('status')
        ->options([
            'draft' => 'Draft',
            'published' => 'Published',
            'archived' => 'Archived',
        ])
        ->filterOptionsUsing(fn (string $value) => $value !== 'archived');

    expect($field->getFilteredOptions())->toBe([
        'draft' => 'Draft',
        'published' => 'Published',
    ]);
});

it('can filter options using disabled mode', function () {
    $field = Select::make('status')
        ->options([
            'draft' => 'Draft',
            'published' => 'Published',
            'archived' => 'Archived',
        ])
        ->filterOptionsUsing(fn (string $value) => $value !== 'archived', disabled: true);

    // In disabled mode, all options are returned
    expect($field->getFilteredOptions())->toBe([
        'draft' => 'Draft',
        'published' => 'Published',
        'archived' => 'Archived',
    ]);

    // But the filtered option is marked as disabled
    expect($field->isOptionDisabled('archived', 'Archived'))->toBeTrue();
    expect($field->isOptionDisabled('draft', 'Draft'))->toBeFalse();
});

it('formats filtered options for vue with disabled flag', function () {
    $field = Select::make('status')
        ->options([
            'draft' => 'Draft',
            'published' => 'Published',
            'archived' => 'Archived',
        ])
        ->filterOptionsUsing(fn (string $value) => $value !== 'archived', disabled: true);

    $vueOptions = $field->getOptionsForVue();

    expect($vueOptions)->toHaveCount(3);
    expect($vueOptions[2])->toHaveKey('disabled', true);
    expect($vueOptions[0])->not->toHaveKey('disabled');
});

it('hides options from vue in hide mode', function () {
    $field = Select::make('status')
        ->options([
            'draft' => 'Draft',
            'published' => 'Published',
            'archived' => 'Archived',
        ])
        ->filterOptionsUsing(fn (string $value) => $value !== 'archived');

    $vueOptions = $field->getOptionsForVue();

    expect($vueOptions)->toHaveCount(2);
    expect($vueOptions)->toBe([
        ['label' => 'Draft', 'value' => 'draft'],
        ['label' => 'Published', 'value' => 'published'],
    ]);
});

it('returns all options when no filter is set', function () {
    $field = Select::make('status')
        ->options([
            'draft' => 'Draft',
            'published' => 'Published',
        ]);

    expect($field->getFilteredOptions())->toBe($field->getOptions());
    expect($field->isOptionDisabled('draft', 'Draft'))->toBeFalse();
});

it('filter callback receives value and label', function () {
    $receivedArgs = [];

    $field = Select::make('status')
        ->options([
            'draft' => 'Draft',
        ])
        ->filterOptionsUsing(function (string $value, string $label) use (&$receivedArgs) {
            $receivedArgs = ['value' => $value, 'label' => $label];
            return true;
        });

    $field->getFilteredOptions();

    expect($receivedArgs)->toBe(['value' => 'draft', 'label' => 'Draft']);
});
