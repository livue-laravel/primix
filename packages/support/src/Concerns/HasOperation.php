<?php

namespace Primix\Support\Concerns;

trait HasOperation
{
    protected ?string $operation = null;

    public function operation(?string $operation): static
    {
        $this->operation = $operation;

        return $this;
    }

    public function getOperation(): ?string
    {
        if ($this->operation !== null) {
            return $this->operation;
        }

        if (isset($this->container) && $this->container !== null) {
            return $this->container->getOperation();
        }

        return null;
    }
}
