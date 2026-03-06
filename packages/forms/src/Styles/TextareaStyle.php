<?php

namespace Primix\Forms\Styles;

use Closure;
use Primix\Support\Styles\ComponentStyle;

class TextareaStyle extends ComponentStyle
{
    /** The textarea element (<p-textarea>) */
    public function textarea(string|array|Closure $value): static
    {
        return $this->section('textarea', $value);
    }

    /** The floating label (<p-float-label>) */
    public function label(string|array|Closure $value): static
    {
        return $this->section('label', $value);
    }
}
