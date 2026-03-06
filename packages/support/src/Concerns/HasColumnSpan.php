<?php

namespace Primix\Support\Concerns;

use Closure;

trait HasColumnSpan
{
    protected int|string|array|Closure|null $columnSpan = null;

    protected int|string|array|Closure|null $columnStart = null;

    public function columnSpan(int|string|array|Closure|null $span): static
    {
        $this->columnSpan = $span;

        return $this;
    }

    public function columnSpanFull(): static
    {
        $this->columnSpan = 'full';

        return $this;
    }

    public function columnStart(int|string|array|Closure|null $start): static
    {
        $this->columnStart = $start;

        return $this;
    }

    public function getColumnSpan(): int|string|array|null
    {
        return $this->evaluate($this->columnSpan);
    }

    public function getColumnStart(): int|string|array|null
    {
        return $this->evaluate($this->columnStart);
    }

    public function isColumnSpanFull(): bool
    {
        return $this->getColumnSpan() === 'full';
    }

    public function getGridItemStyle(): string
    {
        $styles = [];
        $span = $this->getColumnSpan();
        $start = $this->getColumnStart();

        if ($span !== null && $span !== 'full') {
            if (is_array($span)) {
                foreach ($span as $breakpoint => $value) {
                    $suffix = $breakpoint === 'default' ? '' : "-{$breakpoint}";
                    $styles[] = "--col-span{$suffix}: {$value}";
                }
            } else {
                $styles[] = "--col-span: {$span}";
            }
        }

        if ($start !== null) {
            if (is_array($start)) {
                foreach ($start as $breakpoint => $value) {
                    $suffix = $breakpoint === 'default' ? '' : "-{$breakpoint}";
                    $styles[] = "--col-start{$suffix}: {$value}";
                }
            } else {
                $styles[] = "--col-start: {$start}";
            }
        }

        return implode('; ', $styles);
    }
}
