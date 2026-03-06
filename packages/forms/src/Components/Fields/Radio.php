<?php

namespace Primix\Forms\Components\Fields;

use Closure;
use Primix\Forms\Concerns\HasInclusionValidationRules;
use Primix\Forms\Concerns\HasOptions;

class Radio extends Field
{
    use HasInclusionValidationRules;
    use HasOptions;

    protected bool|Closure $isInline = false;

    protected array|Closure $optionDescriptions = [];

    protected bool|Closure $isButtons = false;

    public function inline(bool|Closure $condition = true): static
    {
        $this->isInline = $condition;

        return $this;
    }

    public function descriptions(array|Closure $descriptions): static
    {
        $this->optionDescriptions = $descriptions;

        return $this;
    }

    public function isInline(): bool
    {
        return (bool) $this->evaluate($this->isInline);
    }

    public function getDescriptions(): array
    {
        return $this->evaluate($this->optionDescriptions);
    }

    public function buttons(bool|Closure $condition = true): static
    {
        $this->isButtons = $condition;

        return $this;
    }

    public function isButtons(): bool
    {
        return (bool) $this->evaluate($this->isButtons);
    }

    public function getOptionsForVue(): array
    {
        $options = $this->getFilteredOptions();
        $descriptions = $this->getDescriptions();

        return collect($options)->map(function ($label, $value) use ($descriptions) {
            $option = [
                'label' => $label,
                'value' => $value,
                'description' => $descriptions[$value] ?? null,
            ];

            if ($this->isOptionDisabled($value, $label)) {
                $option['disabled'] = true;
            }

            return $option;
        })->values()->all();
    }

    public function getView(): string
    {
        return 'primix-forms::components.fields.radio';
    }

    public function toVueProps(): array
    {
        return array_merge(parent::toVueProps(), [
            'options' => $this->getOptionsForVue(),
            'inline' => $this->isInline(),
            'buttons' => $this->isButtons(),
        ]);
    }
}
