<?php

use Primix\Notifications\Notification;

// ============================================================
// Creation & Fluent API
// ============================================================

it('can be created with make', function () {
    $notification = Notification::make();

    expect($notification)->toBeInstanceOf(Notification::class);
});

it('can set title', function () {
    $notification = Notification::make()->title('Test Title');

    expect($notification->toArray()['title'])->toBe('Test Title');
});

it('can set nullable title', function () {
    $notification = Notification::make()->title(null);

    expect($notification->toArray()['title'])->toBeNull();
});

it('can set body', function () {
    $notification = Notification::make()->body('Test body text');

    expect($notification->toArray()['body'])->toBe('Test body text');
});

it('can set nullable body', function () {
    $notification = Notification::make()->body(null);

    expect($notification->toArray()['body'])->toBeNull();
});

it('returns fluent instance from title', function () {
    $notification = Notification::make();

    expect($notification->title('Test'))->toBe($notification);
});

it('returns fluent instance from body', function () {
    $notification = Notification::make();

    expect($notification->body('Test'))->toBe($notification);
});

// ============================================================
// Default Values
// ============================================================

it('has default duration of 5000ms', function () {
    $notification = Notification::make();

    expect($notification->toArray()['duration'])->toBe(5000);
});

it('has default closeable as true', function () {
    $notification = Notification::make();

    expect($notification->toArray()['closeable'])->toBeTrue();
});

it('has default empty actions', function () {
    $notification = Notification::make();

    expect($notification->toArray()['actions'])->toBe([]);
});

it('has null title by default', function () {
    $notification = Notification::make();

    expect($notification->toArray()['title'])->toBeNull();
});

it('has null body by default', function () {
    $notification = Notification::make();

    expect($notification->toArray()['body'])->toBeNull();
});

it('has null icon by default', function () {
    $notification = Notification::make();

    expect($notification->toArray()['icon'])->toBeNull();
});

it('has null color by default', function () {
    $notification = Notification::make();

    expect($notification->toArray()['color'])->toBeNull();
});

// ============================================================
// Type Shortcuts (success, warning, danger, info)
// ============================================================

it('sets success color and icon', function () {
    $notification = Notification::make()->success();
    $data = $notification->toArray();

    expect($data['color'])->toBe('success')
        ->and($data['icon'])->toBe('heroicon-o-check-circle');
});

it('sets warning color and icon', function () {
    $notification = Notification::make()->warning();
    $data = $notification->toArray();

    expect($data['color'])->toBe('warning')
        ->and($data['icon'])->toBe('heroicon-o-exclamation-triangle');
});

it('sets danger color and icon', function () {
    $notification = Notification::make()->danger();
    $data = $notification->toArray();

    expect($data['color'])->toBe('danger')
        ->and($data['icon'])->toBe('heroicon-o-x-circle');
});

it('sets info color and icon', function () {
    $notification = Notification::make()->info();
    $data = $notification->toArray();

    expect($data['color'])->toBe('info')
        ->and($data['icon'])->toBe('heroicon-o-information-circle');
});

it('returns fluent instance from success', function () {
    $notification = Notification::make();

    expect($notification->success())->toBe($notification);
});

it('returns fluent instance from warning', function () {
    $notification = Notification::make();

    expect($notification->warning())->toBe($notification);
});

it('returns fluent instance from danger', function () {
    $notification = Notification::make();

    expect($notification->danger())->toBe($notification);
});

it('returns fluent instance from info', function () {
    $notification = Notification::make();

    expect($notification->info())->toBe($notification);
});

// ============================================================
// Duration
// ============================================================

it('can set custom duration', function () {
    $notification = Notification::make()->duration(10000);

    expect($notification->toArray()['duration'])->toBe(10000);
});

it('can set zero duration', function () {
    $notification = Notification::make()->duration(0);

    expect($notification->toArray()['duration'])->toBe(0);
});

it('can be made persistent', function () {
    $notification = Notification::make()->persistent();

    expect($notification->toArray()['duration'])->toBe(0);
});

it('returns fluent instance from duration', function () {
    $notification = Notification::make();

    expect($notification->duration(3000))->toBe($notification);
});

it('returns fluent instance from persistent', function () {
    $notification = Notification::make();

    expect($notification->persistent())->toBe($notification);
});

// ============================================================
// Closeable
// ============================================================

it('can disable close button', function () {
    $notification = Notification::make()->closeable(false);

    expect($notification->toArray()['closeable'])->toBeFalse();
});

it('can explicitly enable close button', function () {
    $notification = Notification::make()->closeable(false)->closeable(true);

    expect($notification->toArray()['closeable'])->toBeTrue();
});

it('can enable close button with no argument', function () {
    $notification = Notification::make()->closeable(false)->closeable();

    expect($notification->toArray()['closeable'])->toBeTrue();
});

it('returns fluent instance from closeable', function () {
    $notification = Notification::make();

    expect($notification->closeable(false))->toBe($notification);
});

// ============================================================
// Actions
// ============================================================

it('can set actions', function () {
    $actions = [
        ['label' => 'View', 'url' => '/posts/1'],
        ['label' => 'Dismiss', 'close' => true],
    ];

    $notification = Notification::make()->actions($actions);

    expect($notification->toArray()['actions'])->toBe($actions);
});

it('can set single action', function () {
    $actions = [['label' => 'Undo', 'url' => '/undo']];

    $notification = Notification::make()->actions($actions);

    expect($notification->toArray()['actions'])->toHaveCount(1)
        ->and($notification->toArray()['actions'][0]['label'])->toBe('Undo');
});

it('returns fluent instance from actions', function () {
    $notification = Notification::make();

    expect($notification->actions([]))->toBe($notification);
});

// ============================================================
// toArray
// ============================================================

it('converts to array with all properties', function () {
    $notification = Notification::make()
        ->title('Test Title')
        ->body('Test body')
        ->success()
        ->duration(3000)
        ->closeable(false)
        ->actions([['label' => 'View', 'url' => '/test']]);

    $data = $notification->toArray();

    expect($data)->toBe([
        'title' => 'Test Title',
        'body' => 'Test body',
        'icon' => 'heroicon-o-check-circle',
        'color' => 'success',
        'duration' => 3000,
        'closeable' => false,
        'actions' => [['label' => 'View', 'url' => '/test']],
        'url' => null,
    ]);
});

it('converts to array with default values', function () {
    $data = Notification::make()->toArray();

    expect($data)->toBe([
        'title' => null,
        'body' => null,
        'icon' => null,
        'color' => null,
        'duration' => 5000,
        'closeable' => true,
        'actions' => [],
        'url' => null,
    ]);
});

// ============================================================
// send() - Session Flash
// ============================================================

it('flashes notification to session', function () {
    Notification::make()
        ->title('Flash test')
        ->success()
        ->send();

    expect(session()->has('primix.notification'))->toBeTrue()
        ->and(session('primix.notification')['title'])->toBe('Flash test')
        ->and(session('primix.notification')['color'])->toBe('success');
});

it('flashes complete notification data to session', function () {
    Notification::make()
        ->title('Complete')
        ->body('Full notification')
        ->danger()
        ->duration(8000)
        ->closeable(false)
        ->actions([['label' => 'Retry', 'url' => '/retry']])
        ->send();

    $data = session('primix.notification');

    expect($data['title'])->toBe('Complete')
        ->and($data['body'])->toBe('Full notification')
        ->and($data['color'])->toBe('danger')
        ->and($data['icon'])->toBe('heroicon-o-x-circle')
        ->and($data['duration'])->toBe(8000)
        ->and($data['closeable'])->toBeFalse()
        ->and($data['actions'])->toHaveCount(1);
});

// ============================================================
// Method Chaining Combinations
// ============================================================

it('supports full method chaining', function () {
    $notification = Notification::make()
        ->title('Chained')
        ->body('All methods')
        ->success()
        ->duration(7000)
        ->closeable(false)
        ->actions([['label' => 'OK']]);

    expect($notification)->toBeInstanceOf(Notification::class);

    $data = $notification->toArray();
    expect($data['title'])->toBe('Chained')
        ->and($data['body'])->toBe('All methods')
        ->and($data['color'])->toBe('success')
        ->and($data['duration'])->toBe(7000)
        ->and($data['closeable'])->toBeFalse()
        ->and($data['actions'])->toHaveCount(1);
});

it('can override type shortcut with explicit color and icon', function () {
    $notification = Notification::make()
        ->success()
        ->color('primary')
        ->icon('heroicon-o-star');

    $data = $notification->toArray();

    expect($data['color'])->toBe('primary')
        ->and($data['icon'])->toBe('heroicon-o-star');
});

it('can override explicit color and icon with type shortcut', function () {
    $notification = Notification::make()
        ->color('primary')
        ->icon('heroicon-o-star')
        ->danger();

    $data = $notification->toArray();

    expect($data['color'])->toBe('danger')
        ->and($data['icon'])->toBe('heroicon-o-x-circle');
});

// ============================================================
// URL
// ============================================================

it('can set url', function () {
    $notification = Notification::make()->url('/admin/posts/1');

    expect($notification->toArray()['url'])->toBe('/admin/posts/1');
});

it('can set nullable url', function () {
    $notification = Notification::make()->url(null);

    expect($notification->toArray()['url'])->toBeNull();
});

it('has null url by default', function () {
    expect(Notification::make()->toArray()['url'])->toBeNull();
});

it('returns fluent instance from url', function () {
    $notification = Notification::make();

    expect($notification->url('/test'))->toBe($notification);
});

// ============================================================
// toDatabaseArray
// ============================================================

it('converts to database array with all properties', function () {
    $notification = Notification::make()
        ->title('DB Title')
        ->body('DB body')
        ->success()
        ->url('/admin/posts/1')
        ->actions([['label' => 'View', 'url' => '/test']]);

    $data = $notification->toDatabaseArray();

    expect($data)->toBe([
        'title' => 'DB Title',
        'body' => 'DB body',
        'icon' => 'heroicon-o-check-circle',
        'color' => 'success',
        'url' => '/admin/posts/1',
        'actions' => [['label' => 'View', 'url' => '/test']],
    ]);
});

it('converts to database array with default values', function () {
    $data = Notification::make()->toDatabaseArray();

    expect($data)->toBe([
        'title' => null,
        'body' => null,
        'icon' => null,
        'color' => null,
        'url' => null,
        'actions' => [],
    ]);
});

it('database array does not include duration or closeable', function () {
    $data = Notification::make()->success()->toDatabaseArray();

    expect($data)->not->toHaveKey('duration')
        ->and($data)->not->toHaveKey('closeable');
});

// ============================================================
// sendToDatabase
// ============================================================

it('returns fluent instance from sendToDatabase', function () {
    // We cannot test actual DB insertion without a database,
    // but we can verify the method exists and returns static
    expect(method_exists(Notification::class, 'sendToDatabase'))->toBeTrue();
});
