<?php

namespace Primix\Support\Concerns;

use Closure;

trait CanBeHidden
{
    protected bool|Closure $isHidden = false;

    protected bool|Closure $isVisible = true;

    protected bool $hasExplicitVisibility = false;

    public function hidden(bool|Closure $condition = true): static
    {
        $this->isHidden = $condition;
        $this->hasExplicitVisibility = true;

        return $this;
    }

    public function visible(bool|Closure $condition = true): static
    {
        $this->isVisible = $condition;
        $this->hasExplicitVisibility = true;

        return $this;
    }

    public function hasExplicitVisibility(): bool
    {
        return $this->hasExplicitVisibility;
    }

    public function isHidden(): bool
    {
        if ((bool) $this->evaluate($this->isHidden)) {
            return true;
        }

        return ! (bool) $this->evaluate($this->isVisible);
    }

    public function isVisible(): bool
    {
        return ! $this->isHidden();
    }
}
