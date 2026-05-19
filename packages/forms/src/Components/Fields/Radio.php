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

    protected bool|Closure $isCards = false;

    protected array|Closure $optionIcons = [];

    protected array|Closure $optionBadges = [];

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

    public function cards(bool|Closure $condition = true): static
    {
        $this->isCards = $condition;

        return $this;
    }

    public function isCards(): bool
    {
        return (bool) $this->evaluate($this->isCards);
    }

    public function icons(array|Closure $icons): static
    {
        $this->optionIcons = $icons;

        return $this;
    }

    public function getIcons(): array
    {
        return $this->evaluate($this->optionIcons);
    }

    public function badges(array|Closure $badges): static
    {
        $this->optionBadges = $badges;

        return $this;
    }

    public function getBadges(): array
    {
        return $this->evaluate($this->optionBadges);
    }

    public function getOptionsForVue(): array
    {
        $options = $this->getFilteredOptions();
        $descriptions = $this->getDescriptions();
        $icons = $this->getIcons();
        $badges = $this->getBadges();

        return collect($options)->map(function ($label, $value) use ($descriptions, $icons, $badges) {
            $option = [
                'label' => $label,
                'value' => $value,
                'description' => $descriptions[$value] ?? null,
                'icon' => $icons[$value] ?? null,
                'badge' => $this->normalizeBadge($badges[$value] ?? null),
            ];

            if ($this->isOptionDisabled($value, $label)) {
                $option['disabled'] = true;
            }

            return $option;
        })->values()->all();
    }

    protected function normalizeBadge(mixed $badge): ?array
    {
        if ($badge === null || $badge === '') {
            return null;
        }

        if (is_array($badge)) {
            return [
                'text' => (string) ($badge['text'] ?? ''),
                'severity' => (string) ($badge['severity'] ?? 'info'),
            ];
        }

        return ['text' => (string) $badge, 'severity' => 'info'];
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
            'cards' => $this->isCards(),
        ]);
    }
}
