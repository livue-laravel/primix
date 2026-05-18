<?php

namespace Primix\Forms\Concerns;

use Closure;
use Illuminate\Database\Eloquent\Model;

trait HasDatabaseValidationRules
{
    public function unique(string $table, ?string $column = null, mixed $ignore = null): static
    {
        return $this->setDedicatedRule('unique', function () use ($table, $column, $ignore) {
            $resolved = $this->evaluate($ignore);

            if ($resolved instanceof Model) {
                $resolved = $resolved->getKey();
            }

            $hasIgnore = $resolved !== null;

            $resolvedColumn = $column ?? ($hasIgnore ? $this->getName() : null);

            $rule = 'unique:' . $table;

            if ($resolvedColumn !== null) {
                $rule .= ',' . $resolvedColumn;
            }

            if ($hasIgnore) {
                $rule .= ',' . $resolved;
            }

            return $rule;
        });
    }

    public function exists(string $table, ?string $column = null): static
    {
        $rule = 'exists:' . $table;

        if ($column !== null) {
            $rule .= ',' . $column;
        }

        return $this->setDedicatedRule('exists', $rule);
    }
}
