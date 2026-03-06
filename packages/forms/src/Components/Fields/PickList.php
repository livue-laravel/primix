<?php

namespace Primix\Forms\Components\Fields;

use Closure;
use Primix\Forms\Concerns\HasInclusionValidationRules;
use Primix\Forms\Concerns\HasOptions;

class PickList extends Field
{
    use HasInclusionValidationRules;
    use HasOptions;

    protected array|Closure $targetOptions = [];

    protected bool|Closure $isFilterable = false;

    protected bool|Closure $isReorderable = false;

    public function targetOptions(array|Closure $options): static
    {
        $this->targetOptions = $options;

        return $this;
    }

    public function filterable(bool|Closure $condition = true): static
    {
        $this->isFilterable = $condition;

        return $this;
    }

    public function reorderable(bool|Closure $condition = true): static
    {
        $this->isReorderable = $condition;

        return $this;
    }

    public function getTargetOptions(): array
    {
        return $this->evaluate($this->targetOptions);
    }

    public function isFilterable(): bool
    {
        return (bool) $this->evaluate($this->isFilterable);
    }

    public function isReorderable(): bool
    {
        return (bool) $this->evaluate($this->isReorderable);
    }

    public function getSourceOptionsForVue(): array
    {
        $options = $this->getFilteredOptions();

        return collect($options)->map(function ($label, $value) {
            return [
                'label' => $label,
                'value' => $value,
            ];
        })->values()->all();
    }

    public function getTargetOptionsForVue(): array
    {
        $options = $this->getTargetOptions();

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
        return 'primix-forms::components.fields.pick-list';
    }

    public function toVueProps(): array
    {
        return array_merge(parent::toVueProps(), [
            'sourceOptions' => $this->getSourceOptionsForVue(),
            'targetOptions' => $this->getTargetOptionsForVue(),
            'filterable' => $this->isFilterable(),
            'reorderable' => $this->isReorderable(),
        ]);
    }
}
