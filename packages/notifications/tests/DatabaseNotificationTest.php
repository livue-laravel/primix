<?php

uses(Tests\TestCase::class);

use Primix\Notifications\DatabaseNotification;

// ============================================================
// Model Extension
// ============================================================

it('extends Laravel DatabaseNotification', function () {
    expect(is_subclass_of(DatabaseNotification::class, \Illuminate\Notifications\DatabaseNotification::class))
        ->toBeTrue();
});

// ============================================================
// Getter Methods
// ============================================================

it('gets title from data', function () {
    $notification = new DatabaseNotification();
    $notification->data = ['title' => 'Test Title'];

    expect($notification->getTitle())->toBe('Test Title');
});

it('returns null for missing title', function () {
    $notification = new DatabaseNotification();
    $notification->data = [];

    expect($notification->getTitle())->toBeNull();
});

it('gets body from data', function () {
    $notification = new DatabaseNotification();
    $notification->data = ['body' => 'Test body text'];

    expect($notification->getBody())->toBe('Test body text');
});

it('returns null for missing body', function () {
    $notification = new DatabaseNotification();
    $notification->data = [];

    expect($notification->getBody())->toBeNull();
});

it('gets icon from data', function () {
    $notification = new DatabaseNotification();
    $notification->data = ['icon' => 'heroicon-o-check-circle'];

    expect($notification->getIcon())->toBe('heroicon-o-check-circle');
});

it('returns null for missing icon', function () {
    $notification = new DatabaseNotification();
    $notification->data = [];

    expect($notification->getIcon())->toBeNull();
});

it('gets color from data', function () {
    $notification = new DatabaseNotification();
    $notification->data = ['color' => 'success'];

    expect($notification->getColor())->toBe('success');
});

it('returns null for missing color', function () {
    $notification = new DatabaseNotification();
    $notification->data = [];

    expect($notification->getColor())->toBeNull();
});

it('gets url from data', function () {
    $notification = new DatabaseNotification();
    $notification->data = ['url' => '/admin/posts/1'];

    expect($notification->getUrl())->toBe('/admin/posts/1');
});

it('returns null for missing url', function () {
    $notification = new DatabaseNotification();
    $notification->data = [];

    expect($notification->getUrl())->toBeNull();
});

it('gets actions from data', function () {
    $actions = [['label' => 'View', 'url' => '/posts/1']];
    $notification = new DatabaseNotification();
    $notification->data = ['actions' => $actions];

    expect($notification->getActions())->toBe($actions);
});

it('returns empty array for missing actions', function () {
    $notification = new DatabaseNotification();
    $notification->data = [];

    expect($notification->getActions())->toBe([]);
});

// ============================================================
// toArray
// ============================================================

it('converts to array with all fields', function () {
    $notification = new DatabaseNotification();
    $notification->forceFill([
        'id' => 'test-uuid-123',
        'data' => [
            'title' => 'New Order',
            'body' => 'Order #123 received',
            'icon' => 'heroicon-o-check-circle',
            'color' => 'success',
            'url' => '/admin/orders/123',
            'actions' => [['label' => 'View', 'url' => '/admin/orders/123']],
        ],
        'read_at' => null,
        'created_at' => now(),
    ]);

    $array = $notification->toArray();

    expect($array['id'])->toBe('test-uuid-123')
        ->and($array['title'])->toBe('New Order')
        ->and($array['body'])->toBe('Order #123 received')
        ->and($array['icon'])->toBe('heroicon-o-check-circle')
        ->and($array['color'])->toBe('success')
        ->and($array['url'])->toBe('/admin/orders/123')
        ->and($array['actions'])->toHaveCount(1)
        ->and($array['read_at'])->toBeNull()
        ->and($array['created_at'])->not->toBeNull();
});

it('converts to array with minimal data', function () {
    $notification = new DatabaseNotification();
    $notification->forceFill([
        'id' => 'test-uuid-456',
        'data' => ['title' => 'Simple'],
        'read_at' => null,
        'created_at' => null,
    ]);

    $array = $notification->toArray();

    expect($array['id'])->toBe('test-uuid-456')
        ->and($array['title'])->toBe('Simple')
        ->and($array['body'])->toBeNull()
        ->and($array['icon'])->toBeNull()
        ->and($array['color'])->toBeNull()
        ->and($array['url'])->toBeNull()
        ->and($array['actions'])->toBe([]);
});
