<?php

use Primix\GlobalSearch\GlobalSearchMode;

// ============================================================
// Enum Cases
// ============================================================

it('has Spotlight case', function () {
    expect(GlobalSearchMode::Spotlight->value)->toBe('spotlight');
});

it('has Dropdown case', function () {
    expect(GlobalSearchMode::Dropdown->value)->toBe('dropdown');
});

// ============================================================
// Count & From
// ============================================================

it('has exactly 2 cases', function () {
    expect(GlobalSearchMode::cases())->toHaveCount(2);
});

it('can be created from string value', function () {
    expect(GlobalSearchMode::from('spotlight'))->toBe(GlobalSearchMode::Spotlight);
    expect(GlobalSearchMode::from('dropdown'))->toBe(GlobalSearchMode::Dropdown);
});
