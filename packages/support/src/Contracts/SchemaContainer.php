<?php

namespace Primix\Support\Contracts;

use Primix\Support\Enums\SchemaContext;

interface SchemaContainer
{
    public function getContext(): SchemaContext;

    public function getStatePath(): ?string;

    public function getRecord(): mixed;
}
