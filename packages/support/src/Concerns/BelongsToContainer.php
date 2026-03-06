<?php

namespace Primix\Support\Concerns;

use Primix\Support\Contracts\SchemaContainer;

trait BelongsToContainer
{
    protected ?SchemaContainer $container = null;

    public function container(?SchemaContainer $container): static
    {
        $this->container = $container;

        return $this;
    }

    public function getContainer(): ?SchemaContainer
    {
        return $this->container;
    }
}
