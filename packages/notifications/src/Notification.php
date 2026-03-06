<?php

namespace Primix\Notifications;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Primix\Support\Concerns\EvaluatesClosures;
use Primix\Support\Concerns\HasColor;
use Primix\Support\Concerns\HasIcon;
use Primix\Support\Concerns\Makeable;

class Notification
{
    use EvaluatesClosures;
    use HasColor;
    use HasIcon;
    use Makeable;

    protected ?string $title = null;

    protected ?string $body = null;

    protected int $duration = 5000;

    protected bool $closeable = true;

    protected array $actions = [];

    protected ?string $url = null;

    public function title(?string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function body(?string $body): static
    {
        $this->body = $body;

        return $this;
    }

    public function success(): static
    {
        $this->color('success');
        $this->icon('heroicon-o-check-circle');

        return $this;
    }

    public function warning(): static
    {
        $this->color('warning');
        $this->icon('heroicon-o-exclamation-triangle');

        return $this;
    }

    public function danger(): static
    {
        $this->color('danger');
        $this->icon('heroicon-o-x-circle');

        return $this;
    }

    public function info(): static
    {
        $this->color('info');
        $this->icon('heroicon-o-information-circle');

        return $this;
    }

    public function duration(int $milliseconds): static
    {
        $this->duration = $milliseconds;

        return $this;
    }

    public function persistent(): static
    {
        $this->duration = 0;

        return $this;
    }

    public function closeable(bool $condition = true): static
    {
        $this->closeable = $condition;

        return $this;
    }

    public function actions(array $actions): static
    {
        $this->actions = $actions;

        return $this;
    }

    public function url(?string $url): static
    {
        $this->url = $url;

        return $this;
    }

    public function send(): void
    {
        session()->flash('primix.notification', $this->toArray());
    }

    public function sendToDatabase(Model|Collection $recipients): static
    {
        if (! $recipients instanceof Collection) {
            $recipients = collect([$recipients]);
        }

        foreach ($recipients as $recipient) {
            $recipient->notifications()->create([
                'id' => \Illuminate\Support\Str::uuid()->toString(),
                'type' => static::class,
                'data' => $this->toDatabaseArray(),
            ]);
        }

        return $this;
    }

    public function toArray(): array
    {
        return [
            'title' => $this->title,
            'body' => $this->body,
            'icon' => $this->getIcon(),
            'color' => $this->getColor(),
            'duration' => $this->duration,
            'closeable' => $this->closeable,
            'actions' => $this->actions,
            'url' => $this->url,
        ];
    }

    public function toDatabaseArray(): array
    {
        return [
            'title' => $this->title,
            'body' => $this->body,
            'icon' => $this->getIcon(),
            'color' => $this->getColor(),
            'url' => $this->url,
            'actions' => $this->actions,
        ];
    }
}
