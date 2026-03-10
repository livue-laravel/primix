<?php

namespace Primix\Concerns;

use Closure;

trait HasModalConfiguration
{
    protected bool|Closure $stackBasedModals = true;

    public function stackBasedModals(bool|Closure $condition = true): static
    {
        $this->stackBasedModals = $condition;

        return $this;
    }

    public function disableStackBasedModals(): static
    {
        return $this->stackBasedModals(false);
    }

    public function hasStackBasedModals(): bool
    {
        if ($this->stackBasedModals instanceof Closure) {
            return (bool) ($this->stackBasedModals)();
        }

        return $this->stackBasedModals;
    }
}
