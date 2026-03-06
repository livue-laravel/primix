<?php

namespace Primix\Support;

use Closure;

class SchemaExpressions
{
    /**
     * Resolve a declarative expression into a Closure.
     *
     * Supported formats:
     * - ['when' => 'status', 'is' => 'draft']
     * - ['when' => 'status', 'isNot' => 'published']
     * - ['when' => 'status', 'in' => ['draft', 'review']]
     * - ['when' => 'status', 'notIn' => ['archived']]
     * - ['when' => 'email', 'filled' => true]
     * - ['when' => 'email', 'filled' => false]
     */
    public static function resolve(array $expression): Closure
    {
        $field = $expression['when'];

        if (array_key_exists('is', $expression)) {
            $value = $expression['is'];

            return fn (callable $get) => $get($field) === $value;
        }

        if (array_key_exists('isNot', $expression)) {
            $value = $expression['isNot'];

            return fn (callable $get) => $get($field) !== $value;
        }

        if (array_key_exists('in', $expression)) {
            $values = $expression['in'];

            return fn (callable $get) => in_array($get($field), $values, true);
        }

        if (array_key_exists('notIn', $expression)) {
            $values = $expression['notIn'];

            return fn (callable $get) => ! in_array($get($field), $values, true);
        }

        if (array_key_exists('filled', $expression)) {
            $shouldBeFilled = $expression['filled'];

            return fn (callable $get) => $shouldBeFilled
                ? filled($get($field))
                : blank($get($field));
        }

        throw new \InvalidArgumentException(
            'Invalid schema expression: missing operator (is, isNot, in, notIn, filled).'
        );
    }

    /**
     * Check if a value looks like a declarative expression.
     */
    public static function isExpression(mixed $value): bool
    {
        return is_array($value) && isset($value['when']);
    }
}
