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

    /**
     * Hide the component on the given resource operation(s) (e.g. 'create', 'edit', 'view').
     *
     * @param  string|array<string>  $operations
     */
    public function hiddenOn(string|array $operations): static
    {
        return $this->hidden(static fn (?string $operation): bool => in_array($operation, (array) $operations, true));
    }

    /**
     * Show the component only on the given resource operation(s) (e.g. 'create', 'edit', 'view').
     *
     * @param  string|array<string>  $operations
     */
    public function visibleOn(string|array $operations): static
    {
        return $this->visible(static fn (?string $operation): bool => in_array($operation, (array) $operations, true));
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
