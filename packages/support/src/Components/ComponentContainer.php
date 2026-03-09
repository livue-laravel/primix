<?php

namespace Primix\Support\Components;

use Primix\Support\Concerns\BelongsToLiVue;
use Primix\Support\Concerns\EvaluatesClosures;
use Primix\Support\Concerns\Makeable;

abstract class ComponentContainer
{
    use BelongsToLiVue;
    use EvaluatesClosures;
    use Makeable;

    public function getRecord(): mixed
    {
        return null;
    }

    public function getStatePath(): ?string
    {
        return null;
    }

    protected function propagateContextToComponents(array $components): void
    {
        foreach ($components as $component) {
            if ($this->getLiVue() && method_exists($component, 'livue')) {
                $component->livue($this->getLiVue());
            }

            if (method_exists($component, 'container')) {
                $component->container($this);
            }
        }
    }
}
