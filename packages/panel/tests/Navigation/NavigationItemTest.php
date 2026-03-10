<?php

use Primix\Navigation\NavigationItem;

// ============================================================
// Creation
// ============================================================

it('can be created with make', function () {
    expect(NavigationItem::make())->toBeInstanceOf(NavigationItem::class);
});

it('supports fluent chaining', function () {
    $item = NavigationItem::make()
        ->label('Posts')
        ->icon('heroicon-o-pencil')
        ->url('/admin/posts')
        ->sort(1);

    expect($item->getLabel())->toBe('Posts')
        ->and($item->getUrl())->toBe('/admin/posts');
});

// ============================================================
// Defaults
// ============================================================

it('has null label by default', function () {
    expect(NavigationItem::make()->getLabel())->toBeNull();
});

it('has null icon by default', function () {
    expect(NavigationItem::make()->getIcon())->toBeNull();
});

it('has null url by default', function () {
    expect(NavigationItem::make()->getUrl())->toBeNull();
});

it('has null sort by default', function () {
    expect(NavigationItem::make()->getSort())->toBeNull();
});

it('has null badge by default', function () {
    expect(NavigationItem::make()->getBadge())->toBeNull()
        ->and(NavigationItem::make()->getBadgeColor())->toBeNull();
});

it('has empty children by default', function () {
    expect(NavigationItem::make()->getChildren())->toBe([])
        ->and(NavigationItem::make()->hasChildren())->toBeFalse();
});

// ============================================================
// Setters / Getters
// ============================================================

it('can set label', function () {
    expect(NavigationItem::make()->label('Dashboard')->getLabel())->toBe('Dashboard');
});

it('can set icon', function () {
    expect(NavigationItem::make()->icon('heroicon-o-home')->getIcon())->toBe('heroicon-o-home');
});

it('can set url', function () {
    expect(NavigationItem::make()->url('/dashboard')->getUrl())->toBe('/dashboard');
});

it('can set group', function () {
    expect(NavigationItem::make()->group('Content')->getGroup())->toBe('Content');
});

it('can set subGroup', function () {
    expect(NavigationItem::make()->subGroup('Blog')->getSubGroup())->toBe('Blog');
});

it('can set sort', function () {
    expect(NavigationItem::make()->sort(5)->getSort())->toBe(5);
});

it('can set badge with color', function () {
    $item = NavigationItem::make()->badge('3', 'danger');

    expect($item->getBadge())->toBe('3')
        ->and($item->getBadgeColor())->toBe('danger');
});

// ============================================================
// Active Icon
// ============================================================

it('falls back to icon when no activeIcon set', function () {
    $item = NavigationItem::make()->icon('heroicon-o-home');

    expect($item->getActiveIcon())->toBe('heroicon-o-home');
});

it('returns custom activeIcon when set', function () {
    $item = NavigationItem::make()
        ->icon('heroicon-o-home')
        ->activeIcon('heroicon-s-home');

    expect($item->getActiveIcon())->toBe('heroicon-s-home');
});

// ============================================================
// Active State
// ============================================================

it('is not active by default', function () {
    expect(NavigationItem::make()->isActive())->toBeFalse();
});

it('can be set active with bool', function () {
    expect(NavigationItem::make()->isActiveWhen(true)->isActive())->toBeTrue();
});

it('can be set active with closure', function () {
    $item = NavigationItem::make()->isActiveWhen(fn () => true);

    expect($item->isActive())->toBeTrue();
});

it('closure returning false keeps item inactive', function () {
    $item = NavigationItem::make()->isActiveWhen(fn () => false);

    expect($item->isActive())->toBeFalse();
});

// ============================================================
// Children
// ============================================================

it('hasChildren returns true when children set', function () {
    $item = NavigationItem::make()->children([
        NavigationItem::make()->label('Sub'),
    ]);

    expect($item->hasChildren())->toBeTrue()
        ->and($item->getChildren())->toHaveCount(1);
});

// ============================================================
// Serialization
// ============================================================

it('serializes to array', function () {
    $item = NavigationItem::make()
        ->label('Posts')
        ->icon('heroicon-o-pencil')
        ->activeIcon('heroicon-s-pencil')
        ->url('/posts')
        ->group('Content')
        ->subGroup('Blog')
        ->sort(1)
        ->isActiveWhen(fn () => true)
        ->badge('5', 'warning');

    $array = $item->toArray();

    expect($array['label'])->toBe('Posts')
        ->and($array['icon'])->toBe('heroicon-o-pencil')
        ->and($array['activeIcon'])->toBe('heroicon-s-pencil')
        ->and($array['url'])->toBe('/posts')
        ->and($array['group'])->toBe('Content')
        ->and($array['subGroup'])->toBe('Blog')
        ->and($array['sort'])->toBe(1)
        ->and($array['isActive'])->toBeTrue()
        ->and($array['badge'])->toBe('5')
        ->and($array['badgeColor'])->toBe('warning')
        ->and($array['children'])->toBe([]);
});
