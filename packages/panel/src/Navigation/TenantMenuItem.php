<?php

namespace Primix\Navigation;

use Primix\Support\Concerns\EvaluatesClosures;
use Primix\Support\Concerns\Makeable;

class TenantMenuItem
{
    use EvaluatesClosures;
    use Makeable;

    protected ?string $label = null;

    protected ?string $icon = null;

    protected ?string $url = null;

    protected ?string $color = null;

    protected ?int $sort = null;

    protected ?string $page = null;

    public function label(?string $label): static
    {
        $this->label = $label;

        return $this;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function icon(?string $icon): static
    {
        $this->icon = $icon;

        return $this;
    }

    public function getIcon(): ?string
    {
        return $this->icon;
    }

    public function url(?string $url): static
    {
        $this->url = $url;

        return $this;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function color(?string $color): static
    {
        $this->color = $color;

        return $this;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function sort(?int $sort): static
    {
        $this->sort = $sort;

        return $this;
    }

    public function getSort(): ?int
    {
        return $this->sort;
    }

    public function page(?string $pageClass): static
    {
        $this->page = $pageClass;

        return $this;
    }

    public function getPage(): ?string
    {
        return $this->page;
    }

    public function toArray(): array
    {
        return [
            'label' => $this->getLabel(),
            'icon' => $this->getIcon(),
            'url' => $this->getUrl(),
            'color' => $this->getColor(),
            'sort' => $this->getSort(),
        ];
    }
}
