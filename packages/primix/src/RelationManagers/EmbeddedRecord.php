<?php

namespace Primix\RelationManagers;

use Illuminate\Support\Fluent;

/**
 * Wraps an embedded (in-memory) relation table item as an object.
 *
 * Allows the table blade and action system to treat embedded items
 * like Eloquent models: property access via Fluent, and getKey()
 * returning the item's position index in the embeddedItems array.
 */
class EmbeddedRecord extends Fluent
{
    public function getKey(): int
    {
        return (int) $this->__embedded_index;
    }
}
