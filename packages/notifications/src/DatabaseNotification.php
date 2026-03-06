<?php

namespace Primix\Notifications;

use Illuminate\Notifications\DatabaseNotification as BaseDatabaseNotification;

class DatabaseNotification extends BaseDatabaseNotification
{
    public function getTitle(): ?string
    {
        return $this->data['title'] ?? null;
    }

    public function getBody(): ?string
    {
        return $this->data['body'] ?? null;
    }

    public function getIcon(): ?string
    {
        return $this->data['icon'] ?? null;
    }

    public function getColor(): ?string
    {
        return $this->data['color'] ?? null;
    }

    public function getUrl(): ?string
    {
        return $this->data['url'] ?? null;
    }

    public function getActions(): array
    {
        return $this->data['actions'] ?? [];
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->getTitle(),
            'body' => $this->getBody(),
            'icon' => $this->getIcon(),
            'color' => $this->getColor(),
            'url' => $this->getUrl(),
            'actions' => $this->getActions(),
            'read_at' => $this->read_at?->toISOString(),
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
