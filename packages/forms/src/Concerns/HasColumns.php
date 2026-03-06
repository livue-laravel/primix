<?php

namespace Primix\Forms\Concerns;

use Closure;

trait HasColumns
{
    protected int|array|Closure $columns = 1;

    public function columns(int|array|Closure $columns): static
    {
        $this->columns = $columns;

        return $this;
    }

    public function getColumns(): int|array
    {
        return $this->evaluate($this->columns);
    }

    public function getGridStyle(): string
    {
        $columns = $this->getColumns();

        if (is_int($columns)) {
            return "--cols: {$columns};";
        }

        $styles = [];

        foreach ($columns as $breakpoint => $value) {
            $suffix = $breakpoint === 'default' ? '' : "-{$breakpoint}";
            $styles[] = "--cols{$suffix}: {$value}";
        }

        return implode('; ', $styles) . ';';
    }
}
