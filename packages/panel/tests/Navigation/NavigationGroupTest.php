<?php

use Primix\Navigation\NavigationGroup;
use Primix\Navigation\NavigationItem;

// ============================================================
// Creation
// ============================================================

it('can be created with make', function () {
    $group = NavigationGroup::make();

    expect($group)->toBeInstanceOf(NavigationGroup::class);
});

it('supports fluent chaining', function () {
    $group = NavigationGroup::make()
        ->label('Test')
        ->icon('test-icon')
        ->sort(10);

    expect($group)->toBeInstanceOf(NavigationGroup::class)
        ->and($group->getLabel())->toBe('Test');
});

// ============================================================
// Defaults
// ============================================================

it('has null label by default', function () {
    expect(NavigationGroup::make()->getLabel())->toBeNull();
});

it('has null icon by default', function () {
    expect(NavigationGroup::make()->getIcon())->toBeNull();
});

it('has null sort by default', function () {
    expect(NavigationGroup::make()->getSort())->toBeNull();
});

it('is collapsible by default', function () {
    expect(NavigationGroup::make()->isCollapsible())->toBeTrue();
});

it('is not collapsed by default', function () {
    expect(NavigationGroup::make()->isCollapsed())->toBeFalse();
});

it('has empty items by default', function () {
    expect(NavigationGroup::make()->getItems())->toBe([]);
});

// ============================================================
// Setters / Getters
// ============================================================

it('can set label', function () {
    expect(NavigationGroup::make()->label('Settings')->getLabel())->toBe('Settings');
});

it('can set icon', function () {
    expect(NavigationGroup::make()->icon('heroicon-o-cog')->getIcon())->toBe('heroicon-o-cog');
});

it('can set sort', function () {
    expect(NavigationGroup::make()->sort(42)->getSort())->toBe(42);
});

it('can disable collapsibility', function () {
    expect(NavigationGroup::make()->collapsible(false)->isCollapsible())->toBeFalse();
});

it('can set collapsed', function () {
    expect(NavigationGroup::make()->collapsed(true)->isCollapsed())->toBeTrue();
});

// ============================================================
// Serialization
// ============================================================

it('serializes to array with defaults', function () {
    expect(NavigationGroup::make()->toArray())->toBe([
        'label' => null,
        'icon' => null,
        'sort' => null,
        'collapsible' => true,
        'collapsed' => false,
        'items' => [],
    ]);
});

it('serializes to array with all values and nested items', function () {
    $group = NavigationGroup::make()
        ->label('Content')
        ->icon('heroicon-o-document')
        ->sort(1)
        ->collapsible(false)
        ->collapsed(true)
        ->items([
            NavigationItem::make()->label('Posts')->icon('heroicon-o-pencil'),
        ]);

    $array = $group->toArray();

    expect($array['label'])->toBe('Content')
        ->and($array['icon'])->toBe('heroicon-o-document')
        ->and($array['sort'])->toBe(1)
        ->and($array['collapsible'])->toBeFalse()
        ->and($array['collapsed'])->toBeTrue()
        ->and($array['items'])->toHaveCount(1)
        ->and($array['items'][0]['label'])->toBe('Posts');
});
