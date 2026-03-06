<?php

namespace Primix\Forms\Styles;

use Closure;
use Primix\Support\Styles\ComponentStyle;

class DatePickerStyle extends ComponentStyle
{
    /** The date picker element (<p-date-picker>) */
    public function picker(string|array|Closure $value): static
    {
        return $this->section('picker', $value);
    }

    /** The calendar icon button */
    public function icon(string|array|Closure $value): static
    {
        return $this->section('icon', $value);
    }

    /** The Today/Clear button bar */
    public function buttonBar(string|array|Closure $value): static
    {
        return $this->section('buttonBar', $value);
    }

    /** The floating label (<p-float-label>) */
    public function label(string|array|Closure $value): static
    {
        return $this->section('label', $value);
    }
}
