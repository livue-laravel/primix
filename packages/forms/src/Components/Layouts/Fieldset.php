<?php

namespace Primix\Forms\Components\Layouts;

use Closure;

class Fieldset extends LayoutComponent
{
    protected ?string $legend = null;

    protected bool|Closure $isToggleable = false;

    protected bool|Closure $isCollapsed = false;

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

    public function legend(?string $legend): static
    {
        $this->legend = $legend;

        return $this;
    }

    public function toggleable(bool|Closure $condition = true): static
    {
        $this->isToggleable = $condition;

        return $this;
    }

    public function collapsed(bool|Closure $condition = true): static
    {
        $this->isCollapsed = $condition;
        $this->isToggleable = true;

        return $this;
    }

    public function getLegend(): ?string
    {
        return $this->legend;
    }

    public function isToggleable(): bool
    {
        return (bool) $this->evaluate($this->isToggleable);
    }

    public function isCollapsed(): bool
    {
        return (bool) $this->evaluate($this->isCollapsed);
    }

    public function getView(): string
    {
        return 'primix-forms::components.layouts.fieldset';
    }

    public function toVueProps(): array
    {
        return array_merge(parent::toVueProps(), [
            'legend' => $this->getLegend(),
            'toggleable' => $this->isToggleable(),
            'collapsed' => $this->isCollapsed(),
        ]);
    }
}
