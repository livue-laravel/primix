<?php

namespace Primix\Forms\Concerns;

use Closure;

/**
 * Trait for fields that handle arrays and need nested validation.
 *
 * Allows defining validation rules for:
 * - The array itself (e.g., ['array', 'max:5'])
 * - Each item in the array (e.g., ['image', 'max:2048'])
 *
 * Usage:
 *   $field->nestedRules(['image', 'max:2048']);
 *   $field->arrayRules(['array', 'min:1', 'max:5']);
 *
 * This generates Laravel validation rules like:
 *   'gallery' => ['array', 'min:1', 'max:5']
 *   'gallery.*' => ['image', 'max:2048']
 */
trait HasNestedValidation
{
    protected string|array|Closure|null $nestedRules = null;

    protected string|array|Closure|null $arrayRules = null;

    /**
     * Set validation rules for each item in the array.
     * These rules are applied with the .* suffix (e.g., 'gallery.*').
     */
    public function nestedRules(string|array|Closure|null $rules): static
    {
        $this->nestedRules = $rules;

        return $this;
    }

    /**
     * Set validation rules for the array itself.
     * These rules are applied directly to the field (e.g., 'gallery').
     */
    public function arrayRules(string|array|Closure|null $rules): static
    {
        $this->arrayRules = $rules;

        return $this;
    }

    /**
     * Get validation rules for each item in the array.
     */
    public function getNestedRules(): array
    {
        $rules = $this->evaluate($this->nestedRules);

        if ($rules === null) {
            return [];
        }

        if (is_string($rules)) {
            return explode('|', $rules);
        }

        return $rules;
    }

    /**
     * Get validation rules for the array itself.
     */
    public function getArrayRules(): array
    {
        $rules = $this->evaluate($this->arrayRules);

        if ($rules === null) {
            return [];
        }

        if (is_string($rules)) {
            return explode('|', $rules);
        }

        return $rules;
    }

    /**
     * Check if this field has nested validation rules.
     */
    public function hasNestedValidation(): bool
    {
        return ! empty($this->getNestedRules()) || ! empty($this->getArrayRules());
    }

    /**
     * Get all validation rules including nested ones.
     * Returns an array keyed by the rule path:
     *   ['field' => [...], 'field.*' => [...]]
     */
    public function getNestedValidationRules(string $basePath): array
    {
        $rules = [];

        $arrayRules = $this->getArrayRules();
        if (! empty($arrayRules)) {
            $rules[$basePath] = $arrayRules;
        }

        $nestedRules = $this->getNestedRules();
        if (! empty($nestedRules)) {
            $rules[$basePath . '.*'] = $nestedRules;
        }

        return $rules;
    }
}
