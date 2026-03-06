<?php

namespace Primix\Forms\Components\Fields;

use Closure;

class TagsInput extends Field
{
    protected array|Closure $suggestions = [];

    protected string|Closure|null $separator = null;

    protected int|Closure|null $maxItems = null;

    protected bool|Closure $allowDuplicates = false;

    protected bool|Closure $addOnBlur = true;

    public function suggestions(array|Closure $suggestions): static
    {
        $this->suggestions = $suggestions;

        return $this;
    }

    public function separator(string|Closure|null $separator): static
    {
        $this->separator = $separator;

        return $this;
    }

    public function maxItems(int|Closure|null $max): static
    {
        $this->maxItems = $max;

        return $this;
    }

    public function allowDuplicates(bool|Closure $condition = true): static
    {
        $this->allowDuplicates = $condition;

        return $this;
    }

    public function addOnBlur(bool|Closure $condition = true): static
    {
        $this->addOnBlur = $condition;

        return $this;
    }

    public function getSuggestions(): array
    {
        return $this->evaluate($this->suggestions);
    }

    public function getSeparator(): ?string
    {
        return $this->evaluate($this->separator);
    }

    public function getMaxItems(): ?int
    {
        return $this->evaluate($this->maxItems);
    }

    public function doesAllowDuplicates(): bool
    {
        return (bool) $this->evaluate($this->allowDuplicates);
    }

    public function shouldAddOnBlur(): bool
    {
        return (bool) $this->evaluate($this->addOnBlur);
    }

    protected function getAutoRules(): array
    {
        $rules = ['array'];

        $maxItems = $this->getMaxItems();
        if ($maxItems !== null) {
            $rules[] = 'max:' . $maxItems;
        }

        return $rules;
    }

    public function getView(): string
    {
        return 'primix-forms::components.fields.tags-input';
    }

    public function toVueProps(): array
    {
        return array_merge(parent::toVueProps(), [
            'suggestions' => $this->getSuggestions(),
            'separator' => $this->getSeparator(),
            'maxItems' => $this->getMaxItems(),
            'allowDuplicates' => $this->doesAllowDuplicates(),
            'addOnBlur' => $this->shouldAddOnBlur(),
        ]);
    }
}
