<?php

use Primix\Details\Details;
use Primix\Details\Components\Entries\TextEntry;

it('uses name as default state path', function () {
    $entry = TextEntry::make('status');

    expect($entry->getName())->toBe('status');
    expect($entry->getStatePath())->toBe('status');
});

it('can resolve explicit state', function () {
    $entry = TextEntry::make('status')->state('published');

    expect($entry->getState())->toBe('published');
});

it('can format state with callback', function () {
    $entry = TextEntry::make('status')
        ->state('published')
        ->formatStateUsing(fn (string $state) => strtoupper($state));

    expect($entry->getState())->toBe('PUBLISHED');
});

it('falls back to record when nested state path is missing in livue state', function () {
    $record = (object) [
        'role' => (object) [
            'name' => 'Admin',
        ],
    ];

    $livue = new class extends \LiVue\Component {
        public array $data = [];

        protected function render(): string
        {
            return 'test';
        }
    };

    $details = Details::make()
        ->livue($livue)
        ->statePath('data')
        ->record($record)
        ->schema([
            TextEntry::make('role.name'),
        ]);

    $entry = $details->getEntries()['data.role.name'];

    expect($entry->getState())->toBe('Admin');
});

it('uses livue nested state when available before record fallback', function () {
    $record = (object) [
        'role' => (object) [
            'name' => 'Admin',
        ],
    ];

    $livue = new class extends \LiVue\Component {
        public array $data = [
            'role' => [
                'name' => 'Editor',
            ],
        ];

        protected function render(): string
        {
            return 'test';
        }
    };

    $details = Details::make()
        ->livue($livue)
        ->statePath('data')
        ->record($record)
        ->schema([
            TextEntry::make('role.name'),
        ]);

    $entry = $details->getEntries()['data.role.name'];

    expect($entry->getState())->toBe('Editor');
});
