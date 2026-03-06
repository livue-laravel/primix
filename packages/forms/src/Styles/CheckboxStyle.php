<?php

namespace Primix\Forms\Styles;

use Closure;
use Primix\Support\Styles\ComponentStyle;

class CheckboxStyle extends ComponentStyle
{
    /** The checkbox element (<p-checkbox>) */
    public function checkbox(string|array|Closure $value): static
    {
        return $this->section('checkbox', $value);
    }

    /** The label element */
    public function label(string|array|Closure $value): static
    {
        return $this->section('label', $value);
    }
}
