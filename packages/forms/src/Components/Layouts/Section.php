<?php

namespace Primix\Forms\Components\Layouts;

use Closure;
use Primix\Support\Concerns\HasIcon;

class Section extends LayoutComponent
{
    use HasIcon;

    protected bool|Closure $isCollapsible = false;

    protected bool|Closure $isCollapsed = false;

    protected bool|Closure $isCompact = false;

    public function __construct(?string $label = null)
    {
        $this->label($label);
    }

    public static function make(?string $label = null): static
    {
        $instance = app(static::class, ['label' => $label]);

        $instance->configure();

        return $instance;
    }

    public function heading(?string $heading): static
    {
        return $this->label($heading);
    }

    public function collapsible(bool|Closure $condition = true): static
    {
        $this->isCollapsible = $condition;

        return $this;
    }

    public function collapsed(bool|Closure $condition = true): static
    {
        $this->isCollapsed = $condition;
        $this->isCollapsible = true;

        return $this;
    }

    public function compact(bool|Closure $condition = true): static
    {
        $this->isCompact = $condition;

        return $this;
    }

    public function getHeading(): ?string
    {
        return $this->getLabel();
    }

    public function isCollapsible(): bool
    {
        return (bool) $this->evaluate($this->isCollapsible);
    }

    public function isCollapsed(): bool
    {
        return (bool) $this->evaluate($this->isCollapsed);
    }

    public function isCompact(): bool
    {
        return (bool) $this->evaluate($this->isCompact);
    }

    public function getView(): string
    {
        return 'primix-forms::components.layouts.section';
    }

    public function toVueProps(): array
    {
        return array_merge(parent::toVueProps(), [
            'heading' => $this->getHeading(),
            'icon' => $this->getIcon(),
            'collapsible' => $this->isCollapsible(),
            'collapsed' => $this->isCollapsed(),
            'compact' => $this->isCompact(),
        ]);
    }
}
