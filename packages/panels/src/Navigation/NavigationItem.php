<?php

namespace Primix\Navigation;

use Closure;
use Primix\Support\Concerns\EvaluatesClosures;
use Primix\Support\Concerns\Makeable;

class NavigationItem
{
    use EvaluatesClosures;
    use Makeable;

    protected ?string $label = null;

    protected ?string $icon = null;

    protected ?string $activeIcon = null;

    protected ?string $url = null;

    protected ?string $group = null;

    protected ?string $subGroup = null;

    protected ?int $sort = null;

    protected bool|Closure $isActive = false;

    protected ?string $badge = null;

    protected ?string $badgeColor = null;

    protected array $children = [];

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

    public function activeIcon(?string $icon): static
    {
        $this->activeIcon = $icon;

        return $this;
    }

    public function url(?string $url): static
    {
        $this->url = $url;

        return $this;
    }

    public function group(?string $group): static
    {
        $this->group = $group;

        return $this;
    }

    public function subGroup(?string $subGroup): static
    {
        $this->subGroup = $subGroup;

        return $this;
    }

    public function sort(?int $sort): static
    {
        $this->sort = $sort;

        return $this;
    }

    public function isActiveWhen(bool|Closure $condition): static
    {
        $this->isActive = $condition;

        return $this;
    }

    public function badge(?string $badge, ?string $color = null): static
    {
        $this->badge = $badge;
        $this->badgeColor = $color;

        return $this;
    }

    public function children(array $children): static
    {
        $this->children = $children;

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

    public function getActiveIcon(): ?string
    {
        return $this->activeIcon ?? $this->icon;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function getGroup(): ?string
    {
        return $this->group;
    }

    public function getSubGroup(): ?string
    {
        return $this->subGroup;
    }

    public function getSort(): ?int
    {
        return $this->sort;
    }

    public function isActive(): bool
    {
        if ($this->isActive instanceof Closure) {
            return (bool) ($this->isActive)();
        }

        if ($this->url && request()->url() === $this->url) {
            return true;
        }

        return (bool) $this->isActive;
    }

    public function getBadge(): ?string
    {
        return $this->badge;
    }

    public function getBadgeColor(): ?string
    {
        return $this->badgeColor;
    }

    public function getChildren(): array
    {
        return $this->children;
    }

    public function hasChildren(): bool
    {
        return ! empty($this->children);
    }

    public function toArray(): array
    {
        return [
            'label' => $this->getLabel(),
            'icon' => $this->getIcon(),
            'activeIcon' => $this->getActiveIcon(),
            'url' => $this->getUrl(),
            'group' => $this->getGroup(),
            'subGroup' => $this->getSubGroup(),
            'sort' => $this->getSort(),
            'isActive' => $this->isActive(),
            'badge' => $this->getBadge(),
            'badgeColor' => $this->getBadgeColor(),
            'children' => array_map(fn ($child) => $child->toArray(), $this->children),
        ];
    }
}
