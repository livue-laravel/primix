<?php

use Primix\Navigation\TenantMenu;
use Primix\Navigation\TenantMenuItem;

// ============================================================
// Creation
// ============================================================

it('can be created with make', function () {
    expect(TenantMenu::make())->toBeInstanceOf(TenantMenu::class);
});

// ============================================================
// Defaults
// ============================================================

it('has null currentTenantName by default', function () {
    expect(TenantMenu::make()->getCurrentTenantName())->toBeNull();
});

it('has null currentTenantId by default', function () {
    expect(TenantMenu::make()->getCurrentTenantId())->toBeNull();
});

it('has empty tenants by default', function () {
    expect(TenantMenu::make()->getTenants())->toBe([]);
});

it('has empty items by default', function () {
    expect(TenantMenu::make()->getItems())->toBe([]);
});

// ============================================================
// Setters / Getters
// ============================================================

it('can set currentTenantName', function () {
    expect(TenantMenu::make()->currentTenantName('Acme Corp')->getCurrentTenantName())->toBe('Acme Corp');
});

it('can set currentTenantId as int', function () {
    expect(TenantMenu::make()->currentTenantId(42)->getCurrentTenantId())->toBe(42);
});

it('can set tenants array', function () {
    $tenants = [
        ['id' => 1, 'name' => 'Acme', 'url' => '/acme/admin'],
        ['id' => 2, 'name' => 'Beta', 'url' => '/beta/admin'],
    ];

    expect(TenantMenu::make()->tenants($tenants)->getTenants())->toBe($tenants);
});

// ============================================================
// Items
// ============================================================

it('addItem is fluent', function () {
    $menu = TenantMenu::make();
    $result = $menu->addItem(TenantMenuItem::make()->label('Settings'));

    expect($result)->toBe($menu);
});

it('getItems returns items sorted by sort order', function () {
    $item1 = TenantMenuItem::make()->label('Third')->sort(3);
    $item2 = TenantMenuItem::make()->label('First')->sort(1);
    $item3 = TenantMenuItem::make()->label('Second')->sort(2);

    $menu = TenantMenu::make()
        ->addItem($item1)
        ->addItem($item2)
        ->addItem($item3);

    $sorted = $menu->getItems();

    expect($sorted[0]->getLabel())->toBe('First')
        ->and($sorted[1]->getLabel())->toBe('Second')
        ->and($sorted[2]->getLabel())->toBe('Third');
});

// ============================================================
// Serialization
// ============================================================

it('serializes to array with defaults', function () {
    expect(TenantMenu::make()->toArray())->toBe([
        'currentTenantName' => null,
        'currentTenantId' => null,
        'tenants' => [],
        'items' => [],
    ]);
});
