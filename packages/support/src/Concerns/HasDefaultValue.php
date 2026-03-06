<?php

namespace Primix\Support\Concerns;

use Closure;

trait HasDefaultValue
{
    protected mixed $default = null;

    public function default(mixed $default): static
    {
        $this->default = $default;

        return $this;
    }

    public function getDefaultValue(): mixed
    {
        return $this->evaluate($this->default);
    }
}
