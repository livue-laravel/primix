<?php

namespace Primix\Support\Concerns;

use Closure;
use Primix\Support\Colors\Color;
use Primix\Support\Colors\ColorManager;

trait HasColor
{
    protected Color|string|Closure|null $color = null;

    public function color(Color|string|Closure|null $color): static
    {
        $this->color = $color;

        return $this;
    }

    public function getColor(): ?string
    {
        $color = $this->evaluate($this->color);

        if ($color instanceof Color) {
            return $color->toHex();
        }

        return $color;
    }

    public function resolveColor(): ?Color
    {
        $color = $this->getColor();

        if ($color === null) {
            return null;
        }

        return app(ColorManager::class)->resolve($color);
    }
}
