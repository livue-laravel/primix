<?php

namespace Primix\Details\Components\Entries;

use Closure;

class IconEntry extends Entry
{
    protected string|Closure|null $fallbackIcon = null;

    protected bool|Closure $showClassName = false;

    public function fallbackIcon(string|Closure|null $icon): static
    {
        $this->fallbackIcon = $icon;

        return $this;
    }

    public function showClassName(bool|Closure $condition = true): static
    {
        $this->showClassName = $condition;

        return $this;
    }

    public function shouldShowClassName(): bool
    {
        return (bool) $this->evaluate($this->showClassName);
    }

    public function getIcon(): ?string
    {
        $state = $this->getState();

        if (is_string($state) && trim($state) !== '') {
            return $state;
        }

        return $this->evaluate($this->fallbackIcon);
    }

    public function getView(): string
    {
        return 'primix-details::components.entries.icon-entry';
    }

    public function toVueProps(): array
    {
        return array_merge(parent::toVueProps(), [
            'icon' => $this->getIcon(),
            'fallbackIcon' => $this->evaluate($this->fallbackIcon),
            'showClassName' => $this->shouldShowClassName(),
        ]);
    }
}
