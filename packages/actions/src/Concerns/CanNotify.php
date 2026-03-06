<?php

namespace Primix\Actions\Concerns;

use Closure;
use Primix\Notifications\Notification;

trait CanNotify
{
    protected string|Closure|null $successNotificationTitle = null;

    public function successNotificationTitle(string|Closure|null $title): static
    {
        $this->successNotificationTitle = $title;

        return $this;
    }

    protected function sendSuccessNotification(): void
    {
        $title = $this->evaluate($this->successNotificationTitle);

        if ($title) {
            Notification::make()->title($title)->success()->send();
        }
    }
}
