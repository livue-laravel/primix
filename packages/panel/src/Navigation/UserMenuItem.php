<?php

namespace Primix\Navigation;

use Primix\Support\Concerns\EvaluatesClosures;
use Primix\Support\Concerns\Makeable;

class UserMenuItem
{
    use EvaluatesClosures;
    use Makeable;

    protected ?string $label = null;

    protected ?string $icon = null;

    protected ?string $url = null;

    protected ?string $color = null;

    protected ?int $sort = null;

    protected bool $isPostAction = false;

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

    public function postAction(bool $condition = true): static
    {
        $this->isPostAction = $condition;

        return $this;
    }

    public function isPostAction(): bool
    {
        return $this->isPostAction;
    }

    public function toArray(): array
    {
        return [
            'label' => $this->getLabel(),
            'icon' => $this->getIcon(),
            'url' => $this->getUrl(),
            'color' => $this->getColor(),
            'sort' => $this->getSort(),
            'isPostAction' => $this->isPostAction(),
        ];
    }
}
