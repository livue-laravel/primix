<?php

use Primix\Details\Components\Entries\ListEntry;

it('normalizes scalar arrays into list items', function () {
    $entry = ListEntry::make('tags')->state(['news', 'events']);

    expect($entry->getItems())->toBe(['news', 'events']);
});

it('maps scalar items using options', function () {
    $entry = ListEntry::make('statuses')
        ->state(['draft', 'published'])
        ->options([
            'draft' => 'Draft',
            'published' => 'Published',
        ]);

    expect($entry->getItems())->toBe(['Draft', 'Published']);
});

it('flattens nested list arrays', function () {
    $entry = ListEntry::make('items')->state([
        ['A', 'B'],
        ['C'],
    ]);

    expect($entry->getItems())->toBe(['A', 'B', 'C']);
});

it('keeps associative arrays as json values', function () {
    $entry = ListEntry::make('rows')->state([
        ['label' => 'Name', 'value' => 'Mario'],
    ]);

    expect($entry->getItems())->toHaveCount(1);
    expect($entry->getItems()[0])->toContain('"label":"Name"');
});
