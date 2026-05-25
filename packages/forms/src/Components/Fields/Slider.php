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

    protected bool|array|Closure $ticks = false;

    protected string|Closure $tickLabelSuffix = '';

    protected bool|Closure $showCurrentValue = false;

    protected string|Closure $currentValueSuffix = '';

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

    /**
     * Render tick labels beneath the track. Pass `true` to auto-generate ticks
     * from min/max/step, an explicit array of numeric values to render exactly
     * those, or `false` to disable. Default: false.
     */
    public function ticks(bool|array|Closure $values = true): static
    {
        $this->ticks = $values;

        return $this;
    }

    public function getTicks(): array
    {
        $value = $this->evaluate($this->ticks);

        if ($value === false) {
            return [];
        }

        if (is_array($value)) {
            return $value;
        }

        // true → generate from min/max/step
        $min = $this->getMin();
        $max = $this->getMax();
        $step = max($this->getStep(), 0.0001);
        $ticks = [];
        for ($v = $min; $v <= $max + 1e-9; $v += $step) {
            $ticks[] = (int) round($v) == $v ? (int) round($v) : (float) $v;
        }

        return $ticks;
    }

    public function tickLabelSuffix(string|Closure $suffix): static
    {
        $this->tickLabelSuffix = $suffix;

        return $this;
    }

    public function getTickLabelSuffix(): string
    {
        return (string) $this->evaluate($this->tickLabelSuffix);
    }

    public function showCurrentValue(bool|Closure $condition = true): static
    {
        $this->showCurrentValue = $condition;

        return $this;
    }

    public function shouldShowCurrentValue(): bool
    {
        return (bool) $this->evaluate($this->showCurrentValue);
    }

    public function currentValueSuffix(string|Closure $suffix): static
    {
        $this->currentValueSuffix = $suffix;

        return $this;
    }

    public function getCurrentValueSuffix(): string
    {
        return (string) $this->evaluate($this->currentValueSuffix);
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
            'ticks' => $this->getTicks(),
            'tickLabelSuffix' => $this->getTickLabelSuffix(),
            'showCurrentValue' => $this->shouldShowCurrentValue(),
            'currentValueSuffix' => $this->getCurrentValueSuffix(),
        ]);
    }
}
