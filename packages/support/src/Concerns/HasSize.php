<?php

namespace Primix\Support\Concerns;

use Closure;

trait HasSize
{
    protected string|Closure|null $size = null;

    public function size(string|Closure|null $size): static
    {
        $this->size = $size;

        return $this;
    }

    public function extraSmall(): static
    {
        return $this->size('xs');
    }

    public function small(): static
    {
        return $this->size('sm');
    }

    public function medium(): static
    {
        return $this->size('md');
    }

    public function large(): static
    {
        return $this->size('lg');
    }

    public function extraLarge(): static
    {
        return $this->size('xl');
    }

    public function getSize(): ?string
    {
        return $this->evaluate($this->size);
    }
}
