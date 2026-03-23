<?php

use Primix\Notifications\Notification;
use Primix\View\Components\Notifications;

// ============================================================
// View Component: shouldRender
// ============================================================

it('should not render when no notification in session', function () {
    $component = new Notifications();

    expect($component->shouldRender())->toBeFalse();
});

it('should render when notification exists in session', function () {
    Notification::make()
        ->title('Test')
        ->success()
        ->send();

    $component = new Notifications();

    expect($component->shouldRender())->toBeTrue();
});

it('notification persists for one request cycle', function () {
    Notification::make()
        ->title('Test')
        ->success()
        ->send();

    // First age: flash data moves from "new" to "old" (still available)
    session()->ageFlashData();

    $component = new Notifications();
    expect($component->shouldRender())->toBeTrue();
});

it('notification is removed after two request cycles', function () {
    Notification::make()
        ->title('Test')
        ->success()
        ->send();

    // First age: "new" → "old"
    session()->ageFlashData();
    // Second age: "old" is removed
    session()->ageFlashData();

    $component = new Notifications();
    expect($component->shouldRender())->toBeFalse();
});

// ============================================================
// Session Flash Behavior
// ============================================================

it('overwrites previous notification when sending a new one', function () {
    Notification::make()
        ->title('First')
        ->success()
        ->send();

    Notification::make()
        ->title('Second')
        ->danger()
        ->send();

    $data = session('primix.notification');

    expect($data['title'])->toBe('Second')
        ->and($data['color'])->toBe('danger');
});

it('stores notification under the correct session key', function () {
    Notification::make()
        ->title('Key test')
        ->send();

    expect(session()->has('primix.notification'))->toBeTrue()
        ->and(session()->has('other.key'))->toBeFalse();
});
