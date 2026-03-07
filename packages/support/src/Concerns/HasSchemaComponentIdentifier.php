<?php

namespace Primix\Support\Concerns;

use Illuminate\Support\Str;

trait HasSchemaComponentIdentifier
{
    public static function getSchemaComponentCategory(): ?string
    {
        return property_exists(static::class, 'schemaComponentCategory')
            ? static::$schemaComponentCategory
            : null;
    }

    public static function getSchemaComponentType(): ?string
    {
        if (property_exists(static::class, 'schemaComponentType') && static::$schemaComponentType !== null) {
            return static::$schemaComponentType;
        }

        return Str::of(static::class)->afterLast('\\')->kebab()->toString();
    }
}
