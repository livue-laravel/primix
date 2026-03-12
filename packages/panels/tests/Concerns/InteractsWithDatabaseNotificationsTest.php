<?php

use App\Models\User;
use Primix\Components\Topbar;
use Primix\Concerns\InteractsWithDatabaseNotifications;
use Primix\Concerns\UseDatabaseNotifications;
use Primix\Pages\BasePage;

it('base page uses the canonical notifications composable trait', function () {
    expect(class_uses_recursive(BasePage::class))
        ->toContain(UseDatabaseNotifications::class);
});

it('topbar reuses the canonical notifications composable trait', function () {
    expect(class_uses_recursive(Topbar::class))
        ->toContain(UseDatabaseNotifications::class);
});

it('keeps compatibility alias for previous InteractsWith trait', function () {
    expect(class_uses_recursive(InteractsWithDatabaseNotifications::class))
        ->toContain(UseDatabaseNotifications::class);
});

it('exposes composable and json notification APIs', function () {
    $methods = [
        'useDatabaseNotifications',
        'getUnreadNotificationsCount',
        'getNotifications',
        'markNotificationAsRead',
        'markAllNotificationsAsRead',
    ];

    foreach ($methods as $method) {
        expect(method_exists(BasePage::class, $method))->toBeTrue()
            ->and(method_exists(Topbar::class, $method))->toBeTrue();
    }
});

it('returns a valid notifications composable payload shape', function () {
    $payload = (new Topbar())->useDatabaseNotifications();

    expect($payload)->toBeArray()
        ->and($payload)->toHaveKeys(['isAuthenticated', 'unreadCount', 'fetch', 'markAsRead', 'markAllAsRead'])
        ->and($payload['isAuthenticated'])->toBeBool()
        ->and($payload['unreadCount'])->toBeInt()
        ->and($payload['fetch'])->toBeCallable()
        ->and($payload['markAsRead'])->toBeCallable()
        ->and($payload['markAllAsRead'])->toBeCallable();
});

it('returns safe payload when notifications are enabled but table is unavailable', function () {
    $user = new User();
    $user->setAttribute($user->getKeyName(), 12);
    $user->exists = true;

    auth()->setUser($user);

    $component = new class extends Topbar
    {
        public bool $hasDatabaseNotifications = true;

        protected function notificationsTableExists(): bool
        {
            return false;
        }
    };

    $payload = $component->useDatabaseNotifications();

    expect($payload['unreadCount'])->toBe(0)
        ->and(($payload['fetch'])())->toBe(['data' => [], 'hasMore' => false, 'unreadCount' => 0])
        ->and($component->getUnreadNotificationsCount())->toBe(['count' => 0])
        ->and($component->getNotifications())->toBe(['data' => [], 'hasMore' => false, 'unreadCount' => 0])
        ->and($component->markNotificationAsRead('id'))->toBe(['success' => false])
        ->and($component->markAllNotificationsAsRead())->toBe(['success' => false, 'unreadCount' => 0]);

    auth()->logout();
});
