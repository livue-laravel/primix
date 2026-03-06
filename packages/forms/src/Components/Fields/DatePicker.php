<?php

namespace Primix\Forms\Components\Fields;

use Carbon\CarbonInterface;
use Closure;

class DatePicker extends Field
{
    protected ?string $format = null;

    protected ?string $displayFormat = null;

    protected bool|Closure $isNative = false;

    protected CarbonInterface|string|Closure|null $minDate = null;

    protected CarbonInterface|string|Closure|null $maxDate = null;

    protected array|Closure $disabledDates = [];

    protected bool|Closure $closeOnDateSelection = true;

    protected ?string $dateView = null;

    protected bool|Closure $isRange = false;

    public function format(?string $format): static
    {
        $this->format = $format;

        return $this;
    }

    public function displayFormat(?string $format): static
    {
        $this->displayFormat = $format;

        return $this;
    }

    public function native(bool|Closure $condition = true): static
    {
        $this->isNative = $condition;

        return $this;
    }

    public function minDate(CarbonInterface|string|Closure|null $date): static
    {
        $this->minDate = $date;

        return $this;
    }

    public function maxDate(CarbonInterface|string|Closure|null $date): static
    {
        $this->maxDate = $date;

        return $this;
    }

    public function disabledDates(array|Closure $dates): static
    {
        $this->disabledDates = $dates;

        return $this;
    }

    public function closeOnDateSelection(bool|Closure $condition = true): static
    {
        $this->closeOnDateSelection = $condition;

        return $this;
    }

    public function monthYear(): static
    {
        $this->dateView = 'month';

        return $this;
    }

    public function yearOnly(): static
    {
        $this->dateView = 'year';

        return $this;
    }

    public function getDateView(): ?string
    {
        return $this->dateView;
    }

    public function range(bool|Closure $condition = true): static
    {
        $this->isRange = $condition;

        return $this;
    }

    public function isRange(): bool
    {
        return (bool) $this->evaluate($this->isRange);
    }

    public function getFormat(): ?string
    {
        return $this->format;
    }

    public function getDisplayFormat(): ?string
    {
        return $this->displayFormat ?? $this->format;
    }

    public function isNative(): bool
    {
        return (bool) $this->evaluate($this->isNative);
    }

    public function getMinDate(): ?string
    {
        $date = $this->evaluate($this->minDate);

        if ($date instanceof CarbonInterface) {
            return $date->toDateString();
        }

        return $date;
    }

    public function getMaxDate(): ?string
    {
        $date = $this->evaluate($this->maxDate);

        if ($date instanceof CarbonInterface) {
            return $date->toDateString();
        }

        return $date;
    }

    public function getDisabledDates(): array
    {
        return $this->evaluate($this->disabledDates);
    }

    protected function getAutoRules(): array
    {
        $rules = ['date'];

        $minDate = $this->getMinDate();
        if ($minDate !== null) {
            $rules[] = 'after_or_equal:' . $minDate;
        }

        $maxDate = $this->getMaxDate();
        if ($maxDate !== null) {
            $rules[] = 'before_or_equal:' . $maxDate;
        }

        return $rules;
    }

    protected function getUnwrappedStyle(): array
    {
        return [
            'picker' => ['style' => 'border: 0; background: transparent; box-shadow: none;'],
        ];
    }

    public function getView(): string
    {
        return 'primix-forms::components.fields.date-picker';
    }

    public function toVueProps(): array
    {
        return array_merge(parent::toVueProps(), [
            'format' => $this->getFormat(),
            'displayFormat' => $this->getDisplayFormat(),
            'native' => $this->isNative(),
            'minDate' => $this->getMinDate(),
            'maxDate' => $this->getMaxDate(),
            'disabledDates' => $this->getDisabledDates(),
            'closeOnDateSelection' => (bool) $this->evaluate($this->closeOnDateSelection),
            'dateView' => $this->getDateView(),
            'range' => $this->isRange(),
        ]);
    }
}
