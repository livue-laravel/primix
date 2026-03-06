<?php

namespace Primix\Support\Concerns;

use Closure;
use Primix\Support\Colors\Color;

trait HasHint
{
    protected string|Closure|null $hint = null;

    protected string|Closure|null $hintIcon = null;

    protected Color|string|Closure|null $hintColor = null;

    public function hint(string|Closure|null $hint): static
    {
        $this->hint = $hint;

        return $this;
    }

    public function hintIcon(string|Closure|null $icon): static
    {
        $this->hintIcon = $icon;

        return $this;
    }

    public function hintColor(Color|string|Closure|null $color): static
    {
        $this->hintColor = $color;

        return $this;
    }

    public function getHint(): ?string
    {
        return $this->evaluate($this->hint);
    }

    public function getHintIcon(): ?string
    {
        return $this->evaluate($this->hintIcon);
    }

    public function getHintColor(): ?string
    {
        $color = $this->evaluate($this->hintColor);

        if ($color instanceof Color) {
            return $color->toHex();
        }

        return $color;
    }
}
