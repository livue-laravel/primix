<?php

namespace Primix\Forms\Concerns;

use Primix\Support\Concerns\HasChildComponents;

trait HasSchema
{
    use HasChildComponents;

    public function schema(array $components): static
    {
        return $this->childComponents($components);
    }

    public function getSchema(): array
    {
        return $this->getChildComponents();
    }
}
