<?php

namespace Primix\Support\Concerns;

trait HasPrimixSearchMetadata
{
    /**
     * Columns that can be used for generic search integrations.
     *
     * @return string[]
     */
    public static function getPrimixSearchableColumns(): array
    {
        return [];
    }

    public static function hasPrimixSearchableColumns(): bool
    {
        return static::getPrimixSearchableColumns() !== [];
    }
}

