<?php

use Primix\Navigation\UserMenu;
use Primix\Navigation\UserMenuItem;

// ============================================================
// Creation
// ============================================================

it('can be created with make', function () {
    expect(UserMenu::make())->toBeInstanceOf(UserMenu::class);
});

// ============================================================
// Defaults
// ============================================================

it('has null userName by default', function () {
    expect(UserMenu::make()->getUserName())->toBeNull();
});

it('has null userEmail by default', function () {
    expect(UserMenu::make()->getUserEmail())->toBeNull();
});

it('has null avatarUrl by default', function () {
    expect(UserMenu::make()->getAvatarUrl())->toBeNull();
});

it('has empty items by default', function () {
    expect(UserMenu::make()->getItems())->toBe([]);
});

// ============================================================
// Setters / Getters
// ============================================================

it('can set userName', function () {
    expect(UserMenu::make()->userName('John Doe')->getUserName())->toBe('John Doe');
});

it('can set userEmail', function () {
    expect(UserMenu::make()->userEmail('john@example.com')->getUserEmail())->toBe('john@example.com');
});

it('can set avatarUrl', function () {
    expect(UserMenu::make()->avatarUrl('https://example.com/avatar.jpg')->getAvatarUrl())
        ->toBe('https://example.com/avatar.jpg');
});

// ============================================================
// Items
// ============================================================

it('addItem is fluent', function () {
    $menu = UserMenu::make();
    $result = $menu->addItem(UserMenuItem::make()->label('Test'));

    expect($result)->toBe($menu);
});

it('can add multiple items', function () {
    $menu = UserMenu::make()
        ->addItem(UserMenuItem::make()->label('A'))
        ->addItem(UserMenuItem::make()->label('B'));

    expect($menu->getItems())->toHaveCount(2);
});

it('getItems returns items sorted by sort order', function () {
    $item1 = UserMenuItem::make()->label('Third')->sort(3);
    $item2 = UserMenuItem::make()->label('First')->sort(1);
    $item3 = UserMenuItem::make()->label('Second')->sort(2);

    $menu = UserMenu::make()
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
    expect(UserMenu::make()->toArray())->toBe([
        'userName' => null,
        'userEmail' => null,
        'avatarUrl' => null,
        'items' => [],
    ]);
});
