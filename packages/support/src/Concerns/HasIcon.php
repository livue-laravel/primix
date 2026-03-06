<?php

namespace Primix\Support\Concerns;

use Closure;

trait HasIcon
{
    protected string|Closure|null $icon = null;

    protected string|Closure|null $iconPosition = 'before';

    public function icon(string|Closure|null $icon): static
    {
        $this->icon = $icon;

        return $this;
    }

    public function iconPosition(string|Closure|null $position): static
    {
        $this->iconPosition = $position;

        return $this;
    }

    public function getIcon(): ?string
    {
        return $this->evaluate($this->icon);
    }

    public function getIconPosition(): string
    {
        return $this->evaluate($this->iconPosition) ?? 'before';
    }

    public function renderIcon(?string $class = null, ?string $size = null): string
    {
        $icon = $this->getIcon();

        if ($icon === null) {
            return '';
        }

        return app(\Primix\Support\Icons\IconManager::class)->render($icon, $class, $size);
    }
}
