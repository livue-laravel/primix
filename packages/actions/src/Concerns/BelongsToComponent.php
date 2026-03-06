<?php

namespace Primix\Actions\Concerns;

trait BelongsToComponent
{
    protected ?object $component = null;

    public function component(?object $component): static
    {
        $this->component = $component;

        return $this;
    }

    public function getComponent(): ?object
    {
        return $this->component;
    }
}
