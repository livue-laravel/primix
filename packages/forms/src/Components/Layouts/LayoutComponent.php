<?php

namespace Primix\Forms\Components\Layouts;

use Closure;
use Primix\Forms\Components\FormComponent;
use Primix\Forms\Concerns\HasColumns;
use Primix\Forms\Concerns\HasNestedRelationship;
use Primix\Forms\Concerns\HasSchema;
use Primix\Support\Concerns\HasDescription;
use Primix\Support\Concerns\HasSchemaComponentIdentifier;

abstract class LayoutComponent extends FormComponent
{
    use HasColumns;
    use HasDescription;
    use HasNestedRelationship;
    use HasSchemaComponentIdentifier;
    use HasSchema;

    protected static ?string $schemaComponentCategory = 'layout';

    public function getWrapperView(): ?string
    {
        return 'primix-forms::components.layout-wrapper';
    }

    protected bool|Closure $isAside = false;

    protected bool|Closure $isContained = true;

    public function aside(bool|Closure $condition = true): static
    {
        $this->isAside = $condition;

        return $this;
    }

    public function isAside(): bool
    {
        return (bool) $this->evaluate($this->isAside);
    }

    public function contained(bool|Closure $condition = true): static
    {
        $this->isContained = $condition;

        return $this;
    }

    public function isContained(): bool
    {
        return (bool) $this->evaluate($this->isContained);
    }

    protected function getChildComponentsVuePropKey(): string
    {
        return 'components';
    }

    public function toVueProps(): array
    {
        return array_merge(parent::toVueProps(), [
            'label' => $this->getLabel(),
            'columnSpan' => $this->getColumnSpan(),
            'columnStart' => $this->getColumnStart(),
            $this->getChildComponentsVuePropKey() => array_map(fn ($c) => $c->toVueProps(), $this->getChildComponents()),
            'context' => $this->getContext()?->value,
            'contained' => $this->isContained(),
            'style' => $this->getStylePassThrough(),
        ]);
    }
}
