<?php

namespace Primix\Support\Concerns;

use LiVue\Component as LiVueComponent;

trait BelongsToLiVue
{
    protected ?LiVueComponent $livueComponent = null;

    public function livue(?LiVueComponent $component): static
    {
        $this->livueComponent = $component;

        return $this;
    }

    public function getLiVue(): ?LiVueComponent
    {
        return $this->livueComponent;
    }
}
