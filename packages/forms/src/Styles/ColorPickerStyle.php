<?php

namespace Primix\Forms\Styles;

use Closure;
use Primix\Support\Styles\ComponentStyle;

class ColorPickerStyle extends ComponentStyle
{
    /** The color picker element (<p-color-picker>) */
    public function picker(string|array|Closure $value): static
    {
        return $this->section('picker', $value);
    }

    /** The label element */
    public function label(string|array|Closure $value): static
    {
        return $this->section('label', $value);
    }
}
