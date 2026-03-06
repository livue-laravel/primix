<?php

namespace Primix\Support\Concerns;

trait HasChildComponents
{
    protected array $childComponents = [];

    public function childComponents(array $components): static
    {
        $this->childComponents = $components;

        return $this;
    }

    public function getChildComponents(): array
    {
        return $this->childComponents;
    }
}
