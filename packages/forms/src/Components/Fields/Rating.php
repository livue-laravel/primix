<?php

namespace Primix\Forms\Components\Fields;

use Closure;

class Rating extends Field
{
    protected int|Closure $stars = 5;

    protected bool|Closure $isCancelable = true;

    public function stars(int|Closure $count): static
    {
        $this->stars = $count;

        return $this;
    }

    public function cancelable(bool|Closure $condition = true): static
    {
        $this->isCancelable = $condition;

        return $this;
    }

    public function getStars(): int
    {
        return (int) $this->evaluate($this->stars);
    }

    public function isCancelable(): bool
    {
        return (bool) $this->evaluate($this->isCancelable);
    }

    protected function getAutoRules(): array
    {
        return [
            'integer',
            'between:0,' . $this->getStars(),
        ];
    }

    public function getView(): string
    {
        return 'primix-forms::components.fields.rating';
    }

    public function toVueProps(): array
    {
        return array_merge(parent::toVueProps(), [
            'stars' => $this->getStars(),
            'cancelable' => $this->isCancelable(),
        ]);
    }
}
