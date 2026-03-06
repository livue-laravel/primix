<?php

namespace Primix\Concerns;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;
use LiVue\Attributes\Composable;
use LiVue\Attributes\Json;
use LiVue\Features\SupportComposables\HandlesComposables;
use Primix\PanelRegistry;
use Primix\Notifications\DatabaseNotification;

trait UseDatabaseNotifications
{
    use HandlesComposables;

    protected ?bool $notificationsTableExists = null;

    #[Composable(as: 'databaseNotifications')]
    public function useDatabaseNotifications(): array
    {
        return [
            'isAuthenticated' => $this->resolveNotificationsUser() !== null,
            'unreadCount' => $this->resolveUnreadNotificationsCount(),
            'fetch' => fn (int $page = 1, int $perPage = 15): array => $this->resolveNotificationsPayload($page, $perPage),
            'markAsRead' => fn (string $id): array => $this->resolveMarkNotificationAsRead($id),
            'markAllAsRead' => fn (): array => $this->resolveMarkAllNotificationsAsRead(),
        ];
    }

    #[Json]
    public function getUnreadNotificationsCount(): array
    {
        return ['count' => $this->resolveUnreadNotificationsCount()];
    }

    #[Json]
    public function getNotifications(int $page = 1, int $perPage = 15): array
    {
        return $this->resolveNotificationsPayload($page, $perPage);
    }

    #[Json]
    public function markNotificationAsRead(string $id): array
    {
        return $this->resolveMarkNotificationAsRead($id);
    }

    #[Json]
    public function markAllNotificationsAsRead(): array
    {
        return $this->resolveMarkAllNotificationsAsRead();
    }

    protected function resolveUnreadNotificationsCount(): int
    {
        $user = $this->resolveNotificationsUser();

        if (! $user || ! $this->canQueryNotifications()) {
            return 0;
        }

        return $this->notificationsQuery($user)
            ->whereNull('read_at')
            ->count();
    }

    protected function resolveNotificationsPayload(int $page = 1, int $perPage = 15): array
    {
        $user = $this->resolveNotificationsUser();

        if (! $user || ! $this->canQueryNotifications()) {
            return ['data' => [], 'hasMore' => false, 'unreadCount' => 0];
        }

        $page = max(1, $page);
        $perPage = max(1, $perPage);

        $notifications = $this->notificationsQuery($user)
            ->latest()
            ->skip(($page - 1) * $perPage)
            ->take($perPage + 1)
            ->get();

        $hasMore = $notifications->count() > $perPage;

        return [
            'data' => $notifications->take($perPage)->map->toArray()->values()->all(),
            'hasMore' => $hasMore,
            'unreadCount' => $this->resolveUnreadNotificationsCount(),
        ];
    }

    protected function resolveMarkNotificationAsRead(string $id): array
    {
        $user = $this->resolveNotificationsUser();

        if (! $user || ! $this->canQueryNotifications()) {
            return ['success' => false];
        }

        $this->notificationsQuery($user)
            ->where('id', $id)
            ->whereNull('read_at')
            ->update(['read_at' => now()]);

        return ['success' => true];
    }

    protected function resolveMarkAllNotificationsAsRead(): array
    {
        $user = $this->resolveNotificationsUser();

        if (! $user || ! $this->canQueryNotifications()) {
            return ['success' => false, 'unreadCount' => 0];
        }

        $this->notificationsQuery($user)
            ->whereNull('read_at')
            ->update(['read_at' => now()]);

        return ['success' => true, 'unreadCount' => 0];
    }

    protected function resolveNotificationsUser(): ?Model
    {
        $user = auth()->user();

        return $user instanceof Model ? $user : null;
    }

    protected function notificationsQuery(Model $user): Builder
    {
        return DatabaseNotification::query()
            ->where('notifiable_type', $user->getMorphClass())
            ->where('notifiable_id', $user->getKey());
    }

    protected function canQueryNotifications(): bool
    {
        return $this->isDatabaseNotificationsEnabled() && $this->notificationsTableExists();
    }

    protected function isDatabaseNotificationsEnabled(): bool
    {
        if (property_exists($this, 'hasDatabaseNotifications') && $this->hasDatabaseNotifications === false) {
            return false;
        }

        $panel = app(PanelRegistry::class)->getCurrentPanel();

        return $panel?->hasDatabaseNotifications() ?? true;
    }

    protected function notificationsTableExists(): bool
    {
        if ($this->notificationsTableExists !== null) {
            return $this->notificationsTableExists;
        }

        $model = new DatabaseNotification();

        return $this->notificationsTableExists = Schema::connection($model->getConnectionName())
            ->hasTable($model->getTable());
    }
}
