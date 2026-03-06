<?php

namespace Primix\Details\Components\Entries;

use Closure;

class ColorEntry extends Entry
{
    protected bool|Closure $showSwatch = true;

    protected int|Closure $swatchSize = 16;

    public function swatch(bool|Closure $condition = true): static
    {
        $this->showSwatch = $condition;

        return $this;
    }

    public function swatchSize(int|Closure $size): static
    {
        $this->swatchSize = $size;

        return $this;
    }

    public function shouldShowSwatch(): bool
    {
        return (bool) $this->evaluate($this->showSwatch);
    }

    public function getSwatchSize(): int
    {
        return (int) $this->evaluate($this->swatchSize);
    }

    public function getColor(): ?string
    {
        $state = $this->getState();

        if ($state === null) {
            return null;
        }

        if (is_string($state)) {
            $value = trim($state);

            return $value === '' ? null : $value;
        }

        return (string) $state;
    }

    public function getView(): string
    {
        return 'primix-details::components.entries.color-entry';
    }

    public function toVueProps(): array
    {
        return array_merge(parent::toVueProps(), [
            'color' => $this->getColor(),
            'showSwatch' => $this->shouldShowSwatch(),
            'swatchSize' => $this->getSwatchSize(),
        ]);
    }
}
