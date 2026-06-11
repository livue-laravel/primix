<?php

use Primix\Details\Components\Entries\BooleanEntry;
use Primix\Details\Components\Entries\ColorEntry;
use Primix\Details\Components\Entries\HtmlEntry;
use Primix\Details\Components\Entries\IconEntry;
use Primix\Details\Components\Entries\LongTextEntry;

it('boolean entry resolves boolean-like states', function () {
    expect(BooleanEntry::make('active')->state('yes')->resolveBooleanState())->toBeTrue();
    expect(BooleanEntry::make('active')->state('0')->resolveBooleanState())->toBeFalse();
    expect(BooleanEntry::make('active')->state(null)->resolveBooleanState())->toBeNull();
});

it('icon entry uses fallback icon when state is empty', function () {
    $entry = IconEntry::make('icon')->fallbackIcon('pi pi-user');

    expect($entry->getIcon())->toBe('pi pi-user');
});

it('color entry normalizes color values', function () {
    expect(ColorEntry::make('color')->state(' #ff0000 ')->getColor())->toBe('#ff0000');
    expect(ColorEntry::make('color')->state(null)->getColor())->toBeNull();
});

it('html entry is html by default', function () {
    $entry = HtmlEntry::make('content');

    expect($entry->isHtml())->toBeTrue();
});

it('html entry is not markdown by default', function () {
    $entry = HtmlEntry::make('content');

    expect($entry->isMarkdown())->toBeFalse();
});

it('html entry converts markdown state to html', function () {
    $entry = HtmlEntry::make('content')->markdown()->state('# Title');

    expect($entry->getState())->toContain('<h1>Title</h1>');
});

it('html entry strips raw html from markdown state', function () {
    $entry = HtmlEntry::make('content')->markdown()->state('**bold** <script>alert(1)</script>');

    expect($entry->getState())
        ->not->toContain('<script>')
        ->toContain('<strong>bold</strong>');
});

it('html entry leaves state untouched without markdown mode', function () {
    $entry = HtmlEntry::make('content')->state('# Title');

    expect($entry->getState())->toBe('# Title');
});

it('html entry applies markdown after formatStateUsing', function () {
    $entry = HtmlEntry::make('content')
        ->markdown()
        ->state('title')
        ->formatStateUsing(fn ($state) => '## ' . $state);

    expect($entry->getState())->toContain('<h2>title</h2>');
});

it('long text entry preserves line breaks by default', function () {
    $entry = LongTextEntry::make('description');

    expect($entry->shouldPreserveLineBreaks())->toBeTrue();
});
