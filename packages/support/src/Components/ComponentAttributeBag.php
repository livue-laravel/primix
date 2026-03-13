<?php

namespace Primix\Support\Components;

use Stringable;

class ComponentAttributeBag implements Stringable
{
    protected array $attributes = [];

    public function __construct(array $attributes = [])
    {
        $this->attributes = $attributes;
    }

    public function merge(array $defaults): static
    {
        $merged = $defaults;

        foreach ($this->attributes as $key => $value) {
            if ($key === 'class' && isset($merged['class'])) {
                $merged['class'] = trim($merged['class'] . ' ' . $value);
            } elseif ($key === 'style' && isset($merged['style'])) {
                $merged['style'] = rtrim($merged['style'], '; ') . '; ' . $value;
            } else {
                $merged[$key] = $value;
            }
        }

        return new static($merged);
    }

    public function class(array $classes): static
    {
        $classString = collect($classes)
            ->map(function ($value, $key) {
                if (is_numeric($key)) {
                    return $value;
                }

                return $value ? $key : null;
            })
            ->filter()
            ->implode(' ');

        if ($classString === '') {
            return $this;
        }

        $attributes = $this->attributes;
        $attributes['class'] = isset($attributes['class'])
            ? trim($attributes['class'] . ' ' . $classString)
            : $classString;

        return new static($attributes);
    }

    public function get(string $key, mixed $default = null): mixed
    {
        return $this->attributes[$key] ?? $default;
    }

    public function has(string $key): bool
    {
        return array_key_exists($key, $this->attributes);
    }

    public function isEmpty(): bool
    {
        return empty($this->attributes);
    }

    public function isNotEmpty(): bool
    {
        return ! $this->isEmpty();
    }

    public function getAttributes(): array
    {
        return $this->attributes;
    }

    public function except(string|array $keys): static
    {
        $keys = is_array($keys) ? $keys : [$keys];
        $keys = array_fill_keys($keys, true);

        return new static(array_filter(
            $this->attributes,
            fn (mixed $value, mixed $key): bool => ! isset($keys[$key]),
            ARRAY_FILTER_USE_BOTH
        ));
    }

    public function toHtml(): string
    {
        return collect($this->attributes)
            ->map(function ($value, $key) {
                if (is_bool($value)) {
                    return $value ? $key : null;
                }

                return $key . '="' . e($value) . '"';
            })
            ->filter()
            ->implode(' ');
    }

    public function __toString(): string
    {
        return $this->toHtml();
    }
}
