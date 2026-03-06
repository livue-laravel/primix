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

it('long text entry preserves line breaks by default', function () {
    $entry = LongTextEntry::make('description');

    expect($entry->shouldPreserveLineBreaks())->toBeTrue();
});
