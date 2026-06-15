<?php

use Primix\Forms\Concerns\ManagesRepeaterItems;

function makeRepeaterHost(array $data): object
{
    return new class($data)
    {
        use ManagesRepeaterItems;

        public array $data;

        public function __construct(array $data)
        {
            $this->data = $data;
        }
    };
}

it('adds a top-level item via a dot statePath', function () {
    $host = makeRepeaterHost(['items' => [['label' => 'First']]]);

    $host->repeaterAddItem('data.items', ['label' => 'Second']);

    expect($host->data['items'])->toHaveCount(2);
    expect($host->data['items'][1]['label'])->toBe('Second');
});

it('adds a nested item via a JS-expression (bracketed) statePath', function () {
    // The repeater blade emits the statePath as a JS expression for v-model
    // (e.g. "data.items[0].children"); the trait must translate it back to
    // Laravel dot notation so data_get()/data_set() resolve nested repeaters.
    $host = makeRepeaterHost(['items' => [['label' => 'Parent', 'children' => []]]]);

    $host->repeaterAddItem('data.items[0].children', ['label' => 'Child']);

    expect($host->data['items'][0]['children'])->toHaveCount(1);
    expect($host->data['items'][0]['children'][0]['label'])->toBe('Child');
    // Must NOT create a stray literal "items[0]" key.
    expect($host->data)->not->toHaveKey('items[0]');
});

it('removes a nested item via a bracketed statePath', function () {
    $host = makeRepeaterHost([
        'items' => [['label' => 'Parent', 'children' => [['label' => 'A'], ['label' => 'B']]]],
    ]);

    $host->repeaterRemoveItem('data.items[0].children', 0);

    expect($host->data['items'][0]['children'])->toHaveCount(1);
    expect($host->data['items'][0]['children'][0]['label'])->toBe('B');
});

it('moves a nested item via a bracketed statePath', function () {
    $host = makeRepeaterHost([
        'items' => [['label' => 'Parent', 'children' => [['label' => 'A'], ['label' => 'B']]]],
    ]);

    $host->repeaterMoveItem('data.items[0].children', 0, 1);

    expect($host->data['items'][0]['children'][0]['label'])->toBe('B');
    expect($host->data['items'][0]['children'][1]['label'])->toBe('A');
});

it('clones a nested item via a bracketed statePath', function () {
    $host = makeRepeaterHost([
        'items' => [['label' => 'Parent', 'children' => [['label' => 'A']]]],
    ]);

    $host->repeaterCloneItem('data.items[0].children', 0);

    expect($host->data['items'][0]['children'])->toHaveCount(2);
    expect($host->data['items'][0]['children'][1]['label'])->toBe('A');
});
