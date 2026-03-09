<?php

namespace Primix\Support\Concerns;

use Primix\Support\Components\ComponentContainer;

trait BelongsToContainer
{
    protected ?ComponentContainer $container = null;

    public function container(?ComponentContainer $container): static
    {
        $this->container = $container;

        return $this;
    }

    public function getContainer(): ?ComponentContainer
    {
        return $this->container;
    }
}
