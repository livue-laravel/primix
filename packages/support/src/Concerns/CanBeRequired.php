<?php

namespace Primix\Support\Concerns;

use Closure;

trait CanBeRequired
{
    protected bool|Closure $isRequired = false;

    public function required(bool|Closure $condition = true): static
    {
        $this->isRequired = $condition;

        return $this;
    }

    public function isRequired(): bool
    {
        return (bool) $this->evaluate($this->isRequired);
    }
}
