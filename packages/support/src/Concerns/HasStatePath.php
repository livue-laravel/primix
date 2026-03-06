<?php

namespace Primix\Support\Concerns;

trait HasStatePath
{
    protected ?string $statePath = null;

    public function statePath(?string $path): static
    {
        $this->statePath = $path;

        return $this;
    }

    public function getStatePath(): ?string
    {
        return $this->statePath;
    }

    /**
     * Convert a dot-notation path to a JS-safe expression.
     * Numeric segments use bracket notation for valid JavaScript.
     * e.g. "data.items.0.name" → "data.items[0].name"
     */
    public static function toJsExpression(string $path): string
    {
        return preg_replace('/\.(\d+)(?=\.|$)/', '[$1]', $path);
    }
}
