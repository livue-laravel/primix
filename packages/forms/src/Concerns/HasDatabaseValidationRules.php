<?php

namespace Primix\Forms\Concerns;

trait HasDatabaseValidationRules
{
    public function unique(string $table, ?string $column = null, mixed $ignore = null): static
    {
        $rule = 'unique:' . $table . ',' . ($column ?? $this->getName());

        if ($ignore !== null) {
            $rule .= ',' . $ignore;
        }

        return $this->setDedicatedRule('unique', $rule);
    }

    public function exists(string $table, ?string $column = null): static
    {
        $rule = 'exists:' . $table . ',' . ($column ?? $this->getName());

        return $this->setDedicatedRule('exists', $rule);
    }
}
