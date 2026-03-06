<?php

namespace Primix\Forms\Components\Fields;

use Closure;

class ColorPicker extends Field
{
    protected string|Closure $format = 'hex';

    protected bool|Closure $isInline = false;

    public function format(string|Closure $format): static
    {
        $this->format = $format;

        return $this;
    }

    public function hex(): static
    {
        return $this->format('hex');
    }

    public function rgb(): static
    {
        return $this->format('rgb');
    }

    public function hsb(): static
    {
        return $this->format('hsb');
    }

    public function inline(bool|Closure $condition = true): static
    {
        $this->isInline = $condition;

        return $this;
    }

    public function getFormat(): string
    {
        return $this->evaluate($this->format);
    }

    public function isInline(): bool
    {
        return (bool) $this->evaluate($this->isInline);
    }

    public function getView(): string
    {
        return 'primix-forms::components.fields.color-picker';
    }

    public function toVueProps(): array
    {
        return array_merge(parent::toVueProps(), [
            'format' => $this->getFormat(),
            'inline' => $this->isInline(),
        ]);
    }
}
