<?php

namespace Primix\Concerns;

use Closure;
use Primix\Enums\DatabaseNotificationsDisplayMode;

trait HasDatabaseNotifications
{
    protected bool|Closure $databaseNotifications = false;

    protected DatabaseNotificationsDisplayMode|Closure $databaseNotificationsMode = DatabaseNotificationsDisplayMode::Popup;

    protected int|Closure $databaseNotificationsPollingInterval = 30;

    public function databaseNotifications(bool|Closure $condition = true): static
    {
        $this->databaseNotifications = $condition;

        return $this;
    }

    public function hasDatabaseNotifications(): bool
    {
        if ($this->databaseNotifications instanceof Closure) {
            return (bool) ($this->databaseNotifications)();
        }

        return $this->databaseNotifications;
    }

    public function databaseNotificationsMode(DatabaseNotificationsDisplayMode|Closure $mode = DatabaseNotificationsDisplayMode::Popup): static
    {
        $this->databaseNotificationsMode = $mode;

        return $this;
    }

    public function getDatabaseNotificationsMode(): DatabaseNotificationsDisplayMode
    {
        if ($this->databaseNotificationsMode instanceof Closure) {
            return ($this->databaseNotificationsMode)();
        }

        return $this->databaseNotificationsMode;
    }

    public function databaseNotificationsPollingInterval(int|Closure $interval = 30): static
    {
        $this->databaseNotificationsPollingInterval = $interval;

        return $this;
    }

    public function getDatabaseNotificationsPollingInterval(): int
    {
        if ($this->databaseNotificationsPollingInterval instanceof Closure) {
            return ($this->databaseNotificationsPollingInterval)();
        }

        return $this->databaseNotificationsPollingInterval;
    }
}
