<?php

namespace Primix\Forms\Components\Fields;

use Closure;

class Knob extends Field
{
    protected int|float|Closure $min = 0;

    protected int|float|Closure $max = 100;

    protected int|float|Closure $step = 1;

    protected int|Closure $size = 150;

    protected int|Closure $strokeWidth = 14;

    protected bool|Closure $showValue = true;

    protected string|Closure|null $valueTemplate = null;

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

    public function size(int|Closure $pixels): static
    {
        $this->size = $pixels;

        return $this;
    }

    public function strokeWidth(int|Closure $width): static
    {
        $this->strokeWidth = $width;

        return $this;
    }

    public function showValue(bool|Closure $condition = true): static
    {
        $this->showValue = $condition;

        return $this;
    }

    public function valueTemplate(string|Closure|null $template): static
    {
        $this->valueTemplate = $template;

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

    public function getSize(): int
    {
        return (int) $this->evaluate($this->size);
    }

    public function getStrokeWidth(): int
    {
        return (int) $this->evaluate($this->strokeWidth);
    }

    public function shouldShowValue(): bool
    {
        return (bool) $this->evaluate($this->showValue);
    }

    public function getValueTemplate(): ?string
    {
        return $this->evaluate($this->valueTemplate);
    }

    protected function getAutoRules(): array
    {
        return [
            'numeric',
            'between:' . $this->getMin() . ',' . $this->getMax(),
        ];
    }

    public function getView(): string
    {
        return 'primix-forms::components.fields.knob';
    }

    public function toVueProps(): array
    {
        return array_merge(parent::toVueProps(), [
            'min' => $this->getMin(),
            'max' => $this->getMax(),
            'step' => $this->getStep(),
            'size' => $this->getSize(),
            'strokeWidth' => $this->getStrokeWidth(),
            'showValue' => $this->shouldShowValue(),
            'valueTemplate' => $this->getValueTemplate(),
        ]);
    }
}
