<?php

namespace Primix\Widgets;

use Closure;

abstract class StatsOverviewWidget extends Widget
{
    protected int|array|Closure|null $columns = null;

    public function columns(int|array|Closure $columns): static
    {
        $this->columns = $columns;

        return $this;
    }

    public function getColumns(): int|array
    {
        $columns = $this->columns !== null
            ? $this->evaluate($this->columns)
            : count($this->getStats());

        if (is_int($columns)) {
            return max($columns, 1);
        }

        if (is_array($columns) && $columns !== []) {
            return $columns;
        }

        return 1;
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

    protected function getStats(): array
    {
        return [];
    }

    protected function render(): string
    {
        return 'primix-widgets::stats-overview';
    }
}
