<?php

use Primix\Navigation\UserMenuItem;

// ============================================================
// Creation
// ============================================================

it('can be created with make', function () {
    expect(UserMenuItem::make())->toBeInstanceOf(UserMenuItem::class);
});

// ============================================================
// Defaults
// ============================================================

it('has null label by default', function () {
    expect(UserMenuItem::make()->getLabel())->toBeNull();
});

it('has null icon by default', function () {
    expect(UserMenuItem::make()->getIcon())->toBeNull();
});

it('has null url by default', function () {
    expect(UserMenuItem::make()->getUrl())->toBeNull();
});

it('has null color by default', function () {
    expect(UserMenuItem::make()->getColor())->toBeNull();
});

it('has null sort by default', function () {
    expect(UserMenuItem::make()->getSort())->toBeNull();
});

it('is not a post action by default', function () {
    expect(UserMenuItem::make()->isPostAction())->toBeFalse();
});

// ============================================================
// Setters / Getters
// ============================================================

it('can set label', function () {
    expect(UserMenuItem::make()->label('Profile')->getLabel())->toBe('Profile');
});

it('can set icon', function () {
    expect(UserMenuItem::make()->icon('heroicon-o-user')->getIcon())->toBe('heroicon-o-user');
});

it('can set url', function () {
    expect(UserMenuItem::make()->url('/profile')->getUrl())->toBe('/profile');
});

it('can set color', function () {
    expect(UserMenuItem::make()->color('danger')->getColor())->toBe('danger');
});

it('can set sort', function () {
    expect(UserMenuItem::make()->sort(10)->getSort())->toBe(10);
});

// ============================================================
// Post Action
// ============================================================

it('can be set as post action', function () {
    expect(UserMenuItem::make()->postAction()->isPostAction())->toBeTrue();
});

// ============================================================
// Serialization
// ============================================================

it('serializes to array with defaults', function () {
    expect(UserMenuItem::make()->toArray())->toBe([
        'label' => null,
        'icon' => null,
        'url' => null,
        'color' => null,
        'sort' => null,
        'isPostAction' => false,
    ]);
});

it('serializes to array with all values', function () {
    $item = UserMenuItem::make()
        ->label('Sign out')
        ->icon('heroicon-o-arrow-left')
        ->url('/logout')
        ->color('danger')
        ->sort(99)
        ->postAction();

    expect($item->toArray())->toBe([
        'label' => 'Sign out',
        'icon' => 'heroicon-o-arrow-left',
        'url' => '/logout',
        'color' => 'danger',
        'sort' => 99,
        'isPostAction' => true,
    ]);
});
