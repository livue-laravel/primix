<?php

namespace Primix\Forms\Components\Fields;

use Closure;
use Primix\Forms\Concerns\HasInclusionValidationRules;
use Primix\Forms\Concerns\HasOptions;

class OrderList extends Field
{
    use HasInclusionValidationRules;
    use HasOptions;

    protected bool|Closure $isFilterable = false;

    public function filterable(bool|Closure $condition = true): static
    {
        $this->isFilterable = $condition;

        return $this;
    }

    public function isFilterable(): bool
    {
        return (bool) $this->evaluate($this->isFilterable);
    }

    public function getOptionsForVue(): array
    {
        $options = $this->getFilteredOptions();

        return collect($options)->map(function ($label, $value) {
            return [
                'label' => $label,
                'value' => $value,
            ];
        })->values()->all();
    }

    protected function getAutoRules(): array
    {
        return ['array'];
    }

    public function getView(): string
    {
        return 'primix-forms::components.fields.order-list';
    }

    public function toVueProps(): array
    {
        return array_merge(parent::toVueProps(), [
            'options' => $this->getOptionsForVue(),
            'filterable' => $this->isFilterable(),
        ]);
    }
}
