<?php

namespace Primix\Forms\Concerns;

use Closure;

trait HasMaxLength
{
    protected int|Closure|null $maxLength = null;

    protected int|Closure|null $minLength = null;

    public function maxLength(int|Closure|null $length): static
    {
        $this->maxLength = $length;

        return $this;
    }

    public function minLength(int|Closure|null $length): static
    {
        $this->minLength = $length;

        return $this;
    }

    public function getMaxLength(): ?int
    {
        return $this->evaluate($this->maxLength);
    }

    public function getMinLength(): ?int
    {
        return $this->evaluate($this->minLength);
    }
}
