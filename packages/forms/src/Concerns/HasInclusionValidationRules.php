<?php

namespace Primix\Forms\Concerns;

trait HasInclusionValidationRules
{
    public function in(array $values): static
    {
        return $this->setDedicatedRule('in', 'in:' . implode(',', $values));
    }

    public function notIn(array $values): static
    {
        return $this->setDedicatedRule('not_in', 'not_in:' . implode(',', $values));
    }
}
