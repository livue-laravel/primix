<?php

use Primix\Navigation\TenantMenuItem;

// ============================================================
// Creation
// ============================================================

it('can be created with make', function () {
    expect(TenantMenuItem::make())->toBeInstanceOf(TenantMenuItem::class);
});

// ============================================================
// Defaults
// ============================================================

it('has all null defaults', function () {
    $item = TenantMenuItem::make();

    expect($item->getLabel())->toBeNull()
        ->and($item->getIcon())->toBeNull()
        ->and($item->getUrl())->toBeNull()
        ->and($item->getColor())->toBeNull()
        ->and($item->getSort())->toBeNull()
        ->and($item->getPage())->toBeNull();
});

// ============================================================
// Setters / Getters
// ============================================================

it('can set label', function () {
    expect(TenantMenuItem::make()->label('Settings')->getLabel())->toBe('Settings');
});

it('can set icon', function () {
    expect(TenantMenuItem::make()->icon('heroicon-o-cog')->getIcon())->toBe('heroicon-o-cog');
});

it('can set url', function () {
    expect(TenantMenuItem::make()->url('/settings')->getUrl())->toBe('/settings');
});

it('can set color', function () {
    expect(TenantMenuItem::make()->color('primary')->getColor())->toBe('primary');
});

it('can set sort', function () {
    expect(TenantMenuItem::make()->sort(5)->getSort())->toBe(5);
});

it('can set page class', function () {
    expect(TenantMenuItem::make()->page('App\\Pages\\Settings')->getPage())->toBe('App\\Pages\\Settings');
});

// ============================================================
// Fluent
// ============================================================

it('all setters return static', function () {
    $item = TenantMenuItem::make();

    expect($item->label('A'))->toBe($item)
        ->and($item->icon('B'))->toBe($item)
        ->and($item->url('C'))->toBe($item)
        ->and($item->color('D'))->toBe($item)
        ->and($item->sort(1))->toBe($item)
        ->and($item->page('E'))->toBe($item);
});

// ============================================================
// Serialization
// ============================================================

it('serializes to array with defaults', function () {
    expect(TenantMenuItem::make()->toArray())->toBe([
        'label' => null,
        'icon' => null,
        'url' => null,
        'color' => null,
        'sort' => null,
    ]);
});

it('serializes to array with all values', function () {
    $item = TenantMenuItem::make()
        ->label('Create organization')
        ->icon('heroicon-o-plus')
        ->url('/create-org')
        ->color('success')
        ->sort(99);

    expect($item->toArray())->toBe([
        'label' => 'Create organization',
        'icon' => 'heroicon-o-plus',
        'url' => '/create-org',
        'color' => 'success',
        'sort' => 99,
    ]);
});

it('does not include page in toArray', function () {
    $item = TenantMenuItem::make()->page('App\\Pages\\Settings');

    expect($item->toArray())->not->toHaveKey('page');
});
