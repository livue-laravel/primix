<?php

namespace Primix\Details\Components\Entries;

use Closure;

class BooleanEntry extends Entry
{
    protected string|Closure $trueLabel = 'Yes';

    protected string|Closure $falseLabel = 'No';

    protected string|Closure|null $trueIcon = 'pi pi-check';

    protected string|Closure|null $falseIcon = 'pi pi-times';

    public function trueLabel(string|Closure $label): static
    {
        $this->trueLabel = $label;

        return $this;
    }

    public function falseLabel(string|Closure $label): static
    {
        $this->falseLabel = $label;

        return $this;
    }

    public function trueIcon(string|Closure|null $icon): static
    {
        $this->trueIcon = $icon;

        return $this;
    }

    public function falseIcon(string|Closure|null $icon): static
    {
        $this->falseIcon = $icon;

        return $this;
    }

    public function getTrueLabel(): string
    {
        return (string) $this->evaluate($this->trueLabel);
    }

    public function getFalseLabel(): string
    {
        return (string) $this->evaluate($this->falseLabel);
    }

    public function getTrueIcon(): ?string
    {
        return $this->evaluate($this->trueIcon);
    }

    public function getFalseIcon(): ?string
    {
        return $this->evaluate($this->falseIcon);
    }

    public function resolveBooleanState(): ?bool
    {
        $state = $this->getState();

        if ($state === null || $state === '') {
            return null;
        }

        if (is_bool($state)) {
            return $state;
        }

        if (is_numeric($state)) {
            return (bool) $state;
        }

        if (is_string($state)) {
            $normalized = strtolower(trim($state));

            if (in_array($normalized, ['1', 'true', 'yes', 'on', 'y'], true)) {
                return true;
            }

            if (in_array($normalized, ['0', 'false', 'no', 'off', 'n'], true)) {
                return false;
            }
        }

        return (bool) $state;
    }

    public function getView(): string
    {
        return 'primix-details::components.entries.boolean-entry';
    }

    public function toVueProps(): array
    {
        return array_merge(parent::toVueProps(), [
            'trueLabel' => $this->getTrueLabel(),
            'falseLabel' => $this->getFalseLabel(),
            'trueIcon' => $this->getTrueIcon(),
            'falseIcon' => $this->getFalseIcon(),
            'booleanState' => $this->resolveBooleanState(),
        ]);
    }
}
