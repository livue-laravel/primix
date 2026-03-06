<?php

namespace Primix\Forms\Styles;

use Closure;
use Primix\Support\Styles\ComponentStyle;

class CheckboxListStyle extends ComponentStyle
{
    /** Each checkbox element (<p-checkbox>) */
    public function checkbox(string|array|Closure $value): static
    {
        return $this->section('checkbox', $value);
    }

    /** Each option wrapper div */
    public function option(string|array|Closure $value): static
    {
        return $this->section('option', $value);
    }

    /** The search input (when searchable) */
    public function search(string|array|Closure $value): static
    {
        return $this->section('search', $value);
    }

    /** The outer container */
    public function container(string|array|Closure $value): static
    {
        return $this->section('container', $value);
    }
}
