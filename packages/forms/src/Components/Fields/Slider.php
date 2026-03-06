<?php

namespace Primix\Forms\Components\Fields;

use Closure;

class Slider extends Field
{
    protected int|float|Closure $min = 0;

    protected int|float|Closure $max = 100;

    protected int|float|Closure $step = 1;

    protected bool|Closure $isRange = false;

    protected string|Closure $orientation = 'horizontal';

    public function min(int|float|Closure $value): static
    {
        $this->min = $value;

        return $this;
    }

    public function max(int|float|Closure $value): static
    {
        $this->max = $value;

        return $this;
    }

    public function step(int|float|Closure $value): static
    {
        $this->step = $value;

        return $this;
    }

    public function range(bool|Closure $condition = true): static
    {
        $this->isRange = $condition;

        return $this;
    }

    public function vertical(bool|Closure $condition = true): static
    {
        $this->orientation = $condition ? 'vertical' : 'horizontal';

        return $this;
    }

    public function getMin(): int|float
    {
        return $this->evaluate($this->min);
    }

    public function getMax(): int|float
    {
        return $this->evaluate($this->max);
    }

    public function getStep(): int|float
    {
        return $this->evaluate($this->step);
    }

    public function isRange(): bool
    {
        return (bool) $this->evaluate($this->isRange);
    }

    public function getOrientation(): string
    {
        return $this->evaluate($this->orientation);
    }

    protected function getAutoRules(): array
    {
        return [
            'numeric',
            'min:' . $this->getMin(),
            'max:' . $this->getMax(),
        ];
    }

    public function getView(): string
    {
        return 'primix-forms::components.fields.slider';
    }

    public function toVueProps(): array
    {
        return array_merge(parent::toVueProps(), [
            'min' => $this->getMin(),
            'max' => $this->getMax(),
            'step' => $this->getStep(),
            'range' => $this->isRange(),
            'orientation' => $this->getOrientation(),
        ]);
    }
}
