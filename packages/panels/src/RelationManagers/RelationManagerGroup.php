<?php

namespace Primix\RelationManagers;

class RelationManagerGroup
{
    protected string $label;

    protected array $managers = [];

    public function __construct(string $label)
    {
        $this->label = $label;
    }

    public static function make(string $label): static
    {
        return new static($label);
    }

    public function managers(array $managers): static
    {
        $this->managers = $managers;

        return $this;
    }

    public function getLabel(): string
    {
        return $this->label;
    }

    public function getManagers(): array
    {
        return $this->managers;
    }
}
