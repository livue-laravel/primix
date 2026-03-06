<?php

namespace Primix\Forms\Styles;

use Closure;
use Primix\Support\Styles\ComponentStyle;

class RadioStyle extends ComponentStyle
{
    /** Each radio button element (<p-radio-button>) */
    public function radio(string|array|Closure $value): static
    {
        return $this->section('radio', $value);
    }

    /** Each option wrapper div */
    public function option(string|array|Closure $value): static
    {
        return $this->section('option', $value);
    }
}
