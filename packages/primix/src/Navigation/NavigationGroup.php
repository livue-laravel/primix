<?php

namespace Primix\Navigation;

use Primix\Support\Concerns\Makeable;

class NavigationGroup
{
    use Makeable;

    protected ?string $label = null;

    protected ?string $icon = null;

    protected ?int $sort = null;

    protected bool $isCollapsible = true;

    protected bool $isCollapsed = false;

    protected array $items = [];

    public function label(?string $label): static
    {
        $this->label = $label;

        return $this;
    }

    public function icon(?string $icon): static
    {
        $this->icon = $icon;

        return $this;
    }

    public function sort(?int $sort): static
    {
        $this->sort = $sort;

        return $this;
    }

    public function collapsible(bool $condition = true): static
    {
        $this->isCollapsible = $condition;

        return $this;
    }

    public function collapsed(bool $condition = true): static
    {
        $this->isCollapsed = $condition;

        return $this;
    }

    public function items(array $items): static
    {
        $this->items = $items;

        return $this;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function getIcon(): ?string
    {
        return $this->icon;
    }

    public function getSort(): ?int
    {
        return $this->sort;
    }

    public function isCollapsible(): bool
    {
        return $this->isCollapsible;
    }

    public function isCollapsed(): bool
    {
        return $this->isCollapsed;
    }

    public function getItems(): array
    {
        return $this->items;
    }

    public function toArray(): array
    {
        return [
            'label' => $this->getLabel(),
            'icon' => $this->getIcon(),
            'sort' => $this->getSort(),
            'collapsible' => $this->isCollapsible(),
            'collapsed' => $this->isCollapsed(),
            'items' => array_map(fn ($item) => $item->toArray(), $this->items),
        ];
    }
}
