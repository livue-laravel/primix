<?php

namespace Primix\Forms\Components\Fields;

use Closure;

class Checkbox extends Field
{
    protected bool|Closure $isInline = false;

    public function inline(bool|Closure $condition = true): static
    {
        $this->isInline = $condition;

        return $this;
    }

    public function isInline(): bool
    {
        return (bool) $this->evaluate($this->isInline);
    }

    public function getView(): string
    {
        return 'primix-forms::components.fields.checkbox';
    }

    public function toVueProps(): array
    {
        return array_merge(parent::toVueProps(), [
            'inline' => $this->isInline(),
        ]);
    }
}
