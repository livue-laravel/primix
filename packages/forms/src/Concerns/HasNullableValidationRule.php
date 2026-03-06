<?php

namespace Primix\Forms\Concerns;

trait HasNullableValidationRule
{
    public function nullable(bool $condition = true): static
    {
        if ($condition) {
            return $this->setDedicatedRule('nullable', 'nullable');
        }

        return $this->removeDedicatedRule('nullable');
    }
}
