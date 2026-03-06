<?php

namespace Primix\Forms\Styles;

use Closure;
use Primix\Support\Styles\ComponentStyle;

class TimePickerStyle extends ComponentStyle
{
    /** The time picker element (<p-date-picker time-only>) */
    public function picker(string|array|Closure $value): static
    {
        return $this->section('picker', $value);
    }

    /** The floating label (<p-float-label>) */
    public function label(string|array|Closure $value): static
    {
        return $this->section('label', $value);
    }
}
