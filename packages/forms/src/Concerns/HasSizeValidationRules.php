<?php

namespace Primix\Forms\Concerns;

trait HasSizeValidationRules
{
    public function minValue(int|float $value): static
    {
        return $this->setDedicatedRule('min', 'min:' . $value);
    }

    public function maxValue(int|float $value): static
    {
        return $this->setDedicatedRule('max', 'max:' . $value);
    }

    public function length(int $value): static
    {
        return $this->setDedicatedRule('size', 'size:' . $value);
    }
}
