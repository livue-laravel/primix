<?php

namespace Primix\Forms\Styles;

use Closure;
use Primix\Support\Styles\ComponentStyle;

class FieldsetStyle extends ComponentStyle
{
    /** The fieldset container (<p-fieldset>) */
    public function fieldset(string|array|Closure $value): static
    {
        return $this->section('fieldset', $value);
    }

    /** The legend element */
    public function legend(string|array|Closure $value): static
    {
        return $this->section('legend', $value);
    }

    /** The content area */
    public function content(string|array|Closure $value): static
    {
        return $this->section('content', $value);
    }
}
