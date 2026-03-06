<?php

namespace Primix\Forms\Concerns;

use Closure;

trait HasRows
{
    protected int|Closure|null $rows = null;

    public function rows(int|Closure|null $rows): static
    {
        $this->rows = $rows;

        return $this;
    }

    public function getRows(): ?int
    {
        return $this->evaluate($this->rows);
    }
}
