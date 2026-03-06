<?php

namespace Primix\Forms\Styles;

use Closure;
use Primix\Support\Styles\ComponentStyle;

class ToggleStyle extends ComponentStyle
{
    /** The toggle switch element (<p-toggle-switch>) */
    public function switch(string|array|Closure $value): static
    {
        return $this->section('switch', $value);
    }

    /** The label element */
    public function label(string|array|Closure $value): static
    {
        return $this->section('label', $value);
    }
}
