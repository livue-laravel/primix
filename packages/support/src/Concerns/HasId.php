<?php

namespace Primix\Support\Concerns;

use Closure;
use Illuminate\Support\Str;

trait HasId
{
    protected string|Closure|null $id = null;

    public function id(string|Closure|null $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getId(): string
    {
        if ($this->id === null) {
            // Memoized: callers pair the id across elements (label for= /
            // input id=), so repeated calls must return the same value.
            $this->id = Str::random(8);
        }

        return $this->evaluate($this->id);
    }
}
