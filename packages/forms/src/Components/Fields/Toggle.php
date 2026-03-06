<?php

namespace Primix\Forms\Components\Fields;

use Closure;
use Primix\Support\Colors\Color;
use Primix\Support\Concerns\HasColor;
use Primix\Support\Concerns\HasIcon;

class Toggle extends Field
{
    use HasColor;
    use HasIcon;

    protected string|Closure|null $onIcon = null;

    protected string|Closure|null $offIcon = null;

    protected Color|string|Closure|null $onColor = null;

    protected Color|string|Closure|null $offColor = null;

    protected bool|Closure $isButton = false;

    protected string|Closure|null $onLabel = null;

    protected string|Closure|null $offLabel = null;

    public function onIcon(string|Closure|null $icon): static
    {
        $this->onIcon = $icon;

        return $this;
    }

    public function offIcon(string|Closure|null $icon): static
    {
        $this->offIcon = $icon;

        return $this;
    }

    public function onColor(Color|string|Closure|null $color): static
    {
        $this->onColor = $color;

        return $this;
    }

    public function offColor(Color|string|Closure|null $color): static
    {
        $this->offColor = $color;

        return $this;
    }

    public function getOnIcon(): ?string
    {
        return $this->evaluate($this->onIcon);
    }

    public function getOffIcon(): ?string
    {
        return $this->evaluate($this->offIcon);
    }

    public function getOnColor(): ?string
    {
        $color = $this->evaluate($this->onColor);

        if ($color instanceof Color) {
            return $color->toHex();
        }

        return $color;
    }

    public function getOffColor(): ?string
    {
        $color = $this->evaluate($this->offColor);

        if ($color instanceof Color) {
            return $color->toHex();
        }

        return $color;
    }

    public function button(bool|Closure $condition = true): static
    {
        $this->isButton = $condition;

        return $this;
    }

    public function onLabel(string|Closure|null $label): static
    {
        $this->onLabel = $label;

        return $this;
    }

    public function offLabel(string|Closure|null $label): static
    {
        $this->offLabel = $label;

        return $this;
    }

    public function isButton(): bool
    {
        return (bool) $this->evaluate($this->isButton);
    }

    public function getOnLabel(): ?string
    {
        return $this->evaluate($this->onLabel);
    }

    public function getOffLabel(): ?string
    {
        return $this->evaluate($this->offLabel);
    }

    public function getView(): string
    {
        return 'primix-forms::components.fields.toggle';
    }

    public function toVueProps(): array
    {
        return array_merge(parent::toVueProps(), [
            'onIcon' => $this->getOnIcon(),
            'offIcon' => $this->getOffIcon(),
            'onColor' => $this->getOnColor(),
            'offColor' => $this->getOffColor(),
            'button' => $this->isButton(),
            'onLabel' => $this->getOnLabel(),
            'offLabel' => $this->getOffLabel(),
        ]);
    }
}
