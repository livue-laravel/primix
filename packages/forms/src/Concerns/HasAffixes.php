<?php

namespace Primix\Forms\Concerns;

use Closure;
use Primix\Actions\Action;

trait HasAffixes
{
    protected string|Closure|null $prefix = null;

    protected string|Closure|null $prefixIcon = null;

    protected array $prefixActions = [];

    protected string|Closure|null $suffix = null;

    protected string|Closure|null $suffixIcon = null;

    protected array $suffixActions = [];

    public function prefix(string|Closure|null $prefix): static
    {
        $this->prefix = $prefix;

        return $this;
    }

    public function prefixIcon(string|Closure|null $icon): static
    {
        $this->prefixIcon = $icon;

        return $this;
    }

    public function prefixAction(Action $action): static
    {
        $this->prefixActions[] = $action;

        return $this;
    }

    public function prefixActions(array $actions): static
    {
        $this->prefixActions = array_merge($this->prefixActions, $actions);

        return $this;
    }

    public function suffix(string|Closure|null $suffix): static
    {
        $this->suffix = $suffix;

        return $this;
    }

    public function suffixIcon(string|Closure|null $icon): static
    {
        $this->suffixIcon = $icon;

        return $this;
    }

    public function suffixAction(Action $action): static
    {
        $this->suffixActions[] = $action;

        return $this;
    }

    public function suffixActions(array $actions): static
    {
        $this->suffixActions = array_merge($this->suffixActions, $actions);

        return $this;
    }

    public function getPrefix(): ?string
    {
        return $this->evaluate($this->prefix);
    }

    public function getPrefixIcon(): ?string
    {
        return $this->evaluate($this->prefixIcon);
    }

    public function getPrefixActions(): array
    {
        return array_filter(
            $this->prefixActions,
            fn (Action $action) => ! $action->isHidden()
        );
    }

    public function getSuffix(): ?string
    {
        return $this->evaluate($this->suffix);
    }

    public function getSuffixIcon(): ?string
    {
        return $this->evaluate($this->suffixIcon);
    }

    public function getSuffixActions(): array
    {
        return array_filter(
            $this->suffixActions,
            fn (Action $action) => ! $action->isHidden()
        );
    }

    public function hasAffixActions(): bool
    {
        return ! empty($this->prefixActions) || ! empty($this->suffixActions);
    }
}
