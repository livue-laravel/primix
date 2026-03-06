<?php

namespace Primix\Forms\Components\Layouts;

use Closure;

class Tabs extends LayoutComponent
{
    protected string|Closure|null $activeTab = null;

    protected bool|Closure $persistTabInQueryString = false;

    protected bool|Closure $isVertical = false;

    protected bool|Closure $isAccordion = false;

    protected bool|Closure $isMultipleExpand = false;

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

    public function tabs(array $tabs): static
    {
        return $this->childComponents($tabs);
    }

    public function activeTab(string|Closure|null $tab): static
    {
        $this->activeTab = $tab;

        return $this;
    }

    public function persistTabInQueryString(bool|Closure $condition = true): static
    {
        $this->persistTabInQueryString = $condition;

        return $this;
    }

    public function getTabs(): array
    {
        return $this->getChildComponents();
    }

    public function getActiveTab(): ?string
    {
        return $this->evaluate($this->activeTab);
    }

    public function shouldPersistTabInQueryString(): bool
    {
        return (bool) $this->evaluate($this->persistTabInQueryString);
    }

    public function vertical(bool|Closure $condition = true): static
    {
        $this->isVertical = $condition;

        return $this;
    }

    public function isVertical(): bool
    {
        return (bool) $this->evaluate($this->isVertical);
    }

    public function accordion(bool|Closure $condition = true): static
    {
        $this->isAccordion = $condition;

        return $this;
    }

    public function multipleExpand(bool|Closure $condition = true): static
    {
        $this->isMultipleExpand = $condition;

        return $this;
    }

    public function isAccordion(): bool
    {
        return (bool) $this->evaluate($this->isAccordion);
    }

    public function isMultipleExpand(): bool
    {
        return (bool) $this->evaluate($this->isMultipleExpand);
    }

    protected function getChildComponentsVuePropKey(): string
    {
        return 'tabs';
    }

    public function getView(): string
    {
        return 'primix-forms::components.layouts.tabs.tabs';
    }

    public function toVueProps(): array
    {
        return array_merge(parent::toVueProps(), [
            'activeTab' => $this->getActiveTab(),
            'persistTabInQueryString' => $this->shouldPersistTabInQueryString(),
            'vertical' => $this->isVertical(),
            'accordion' => $this->isAccordion(),
            'multipleExpand' => $this->isMultipleExpand(),
        ]);
    }
}
