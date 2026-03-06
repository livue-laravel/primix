<?php

namespace Primix\Forms\Styles;

use Closure;
use Primix\Support\Styles\ComponentStyle;

class TagsInputStyle extends ComponentStyle
{
    /** The input chips container (<p-input-chips>) */
    public function input(string|array|Closure $value): static
    {
        return $this->section('input', $value);
    }

    /** Individual chip/tag elements */
    public function chip(string|array|Closure $value): static
    {
        return $this->section('chip', $value);
    }

    /** The floating label (<p-float-label>) */
    public function label(string|array|Closure $value): static
    {
        return $this->section('label', $value);
    }
}
