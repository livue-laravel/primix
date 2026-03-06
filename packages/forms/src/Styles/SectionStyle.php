<?php

namespace Primix\Forms\Styles;

use Closure;
use Primix\Support\Styles\ComponentStyle;

class SectionStyle extends ComponentStyle
{
    /** The panel container (<p-panel>) */
    public function panel(string|array|Closure $value): static
    {
        return $this->section('panel', $value);
    }

    /** The panel header area */
    public function header(string|array|Closure $value): static
    {
        return $this->section('header', $value);
    }

    /** The panel content area */
    public function content(string|array|Closure $value): static
    {
        return $this->section('content', $value);
    }
}
