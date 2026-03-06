<?php

namespace Primix\Support\Theme;

class PassThroughConfig
{
    protected array $components = [];

    public static function make(): static
    {
        return new static();
    }

    /**
     * Set PassThrough for a specific PrimeVue component.
     *
     * @param  string  $name  Component name (e.g. 'button', 'datatable')
     * @param  array  $sections  Section => attributes mapping
     */
    public function component(string $name, array $sections): static
    {
        $this->components[$name] = array_merge(
            $this->components[$name] ?? [],
            $sections
        );

        return $this;
    }

    public function datatable(array $sections): static
    {
        return $this->component('datatable', $sections);
    }

    public function button(array $sections): static
    {
        return $this->component('button', $sections);
    }

    public function dialog(array $sections): static
    {
        return $this->component('dialog', $sections);
    }

    public function select(array $sections): static
    {
        return $this->component('select', $sections);
    }

    public function inputtext(array $sections): static
    {
        return $this->component('inputtext', $sections);
    }

    public function tabs(array $sections): static
    {
        return $this->component('tabs', $sections);
    }

    public function card(array $sections): static
    {
        return $this->component('card', $sections);
    }

    public function panel(array $sections): static
    {
        return $this->component('panel', $sections);
    }

    public function toArray(): array
    {
        return $this->components;
    }
}
