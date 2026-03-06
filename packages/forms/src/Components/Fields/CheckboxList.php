<?php

namespace Primix\Forms\Components\Fields;

use Closure;
use Primix\Forms\Concerns\HasInclusionValidationRules;
use Primix\Forms\Concerns\HasOptions;

class CheckboxList extends Field
{
    use HasInclusionValidationRules;
    use HasOptions;

    protected bool|Closure $isInline = false;

    protected int|Closure|null $gridColumns = null;

    protected bool|Closure $isSearchable = false;

    protected bool|Closure $isBulkToggleable = false;

    protected array|Closure $optionDescriptions = [];

    protected bool|Closure $isButtons = false;

    public function inline(bool|Closure $condition = true): static
    {
        $this->isInline = $condition;

        return $this;
    }

    public function gridColumns(int|Closure|null $columns): static
    {
        $this->gridColumns = $columns;

        return $this;
    }

    public function searchable(bool|Closure $condition = true): static
    {
        $this->isSearchable = $condition;

        return $this;
    }

    public function bulkToggleable(bool|Closure $condition = true): static
    {
        $this->isBulkToggleable = $condition;

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

    public function getGridColumns(): ?int
    {
        return $this->evaluate($this->gridColumns);
    }

    public function isSearchable(): bool
    {
        return (bool) $this->evaluate($this->isSearchable);
    }

    public function isBulkToggleable(): bool
    {
        return (bool) $this->evaluate($this->isBulkToggleable);
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

    protected function getAutoRules(): array
    {
        return ['array'];
    }

    public function getView(): string
    {
        return 'primix-forms::components.fields.checkbox-list';
    }

    public function toVueProps(): array
    {
        return array_merge(parent::toVueProps(), [
            'options' => $this->getOptionsForVue(),
            'inline' => $this->isInline(),
            'gridColumns' => $this->getGridColumns(),
            'searchable' => $this->isSearchable(),
            'bulkToggleable' => $this->isBulkToggleable(),
            'buttons' => $this->isButtons(),
        ]);
    }
}
