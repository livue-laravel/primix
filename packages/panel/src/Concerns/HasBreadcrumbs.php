<?php

namespace Primix\Concerns;

use Closure;

trait HasBreadcrumbs
{
    protected bool|Closure $breadcrumbs = true;

    public function breadcrumbs(bool|Closure $condition = true): static
    {
        $this->breadcrumbs = $condition;

        return $this;
    }

    public function hasBreadcrumbs(): bool
    {
        if ($this->breadcrumbs instanceof Closure) {
            return (bool) ($this->breadcrumbs)();
        }

        return $this->breadcrumbs;
    }
}
