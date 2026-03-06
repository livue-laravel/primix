<?php

namespace Primix\Forms\Components\Fields;

use Closure;

class TimePicker extends Field
{
    protected bool|Closure $is24Hour = true;

    protected bool|Closure $withSeconds = false;

    protected int|Closure $hourStep = 1;

    protected int|Closure $minuteStep = 1;

    protected int|Closure $secondStep = 1;

    public function twentyFourHour(bool|Closure $condition = true): static
    {
        $this->is24Hour = $condition;

        return $this;
    }

    public function twelveHour(): static
    {
        return $this->twentyFourHour(false);
    }

    public function withSeconds(bool|Closure $condition = true): static
    {
        $this->withSeconds = $condition;

        return $this;
    }

    public function hourStep(int|Closure $step): static
    {
        $this->hourStep = $step;

        return $this;
    }

    public function minuteStep(int|Closure $step): static
    {
        $this->minuteStep = $step;

        return $this;
    }

    public function secondStep(int|Closure $step): static
    {
        $this->secondStep = $step;

        return $this;
    }

    public function is24Hour(): bool
    {
        return (bool) $this->evaluate($this->is24Hour);
    }

    public function hasSeconds(): bool
    {
        return (bool) $this->evaluate($this->withSeconds);
    }

    public function getHourStep(): int
    {
        return $this->evaluate($this->hourStep);
    }

    public function getMinuteStep(): int
    {
        return $this->evaluate($this->minuteStep);
    }

    public function getSecondStep(): int
    {
        return $this->evaluate($this->secondStep);
    }

    protected function getAutoRules(): array
    {
        return [$this->hasSeconds() ? 'date_format:H:i:s' : 'date_format:H:i'];
    }

    public function getView(): string
    {
        return 'primix-forms::components.fields.time-picker';
    }

    public function toVueProps(): array
    {
        return array_merge(parent::toVueProps(), [
            'is24Hour' => $this->is24Hour(),
            'withSeconds' => $this->hasSeconds(),
            'hourStep' => $this->getHourStep(),
            'minuteStep' => $this->getMinuteStep(),
            'secondStep' => $this->getSecondStep(),
        ]);
    }
}
