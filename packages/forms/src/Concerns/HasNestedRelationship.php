<?php

namespace Primix\Forms\Concerns;

trait HasNestedRelationship
{
    protected ?string $nestedRelationship = null;

    public function relationship(?string $name): static
    {
        $this->nestedRelationship = $name;

        return $this;
    }

    public function hasNestedRelationship(): bool
    {
        return $this->nestedRelationship !== null;
    }

    public function getNestedRelationship(): ?string
    {
        return $this->nestedRelationship;
    }
}
