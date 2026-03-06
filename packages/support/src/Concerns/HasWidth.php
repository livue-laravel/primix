<?php

namespace Primix\Support\Concerns;

use Closure;

trait HasWidth
{
    protected string|Closure|null $width = null;

    public function width(string|Closure|null $width): static
    {
        $this->width = $width;

        return $this;
    }

    public function getWidth(): ?string
    {
        return $this->evaluate($this->width);
    }
}
