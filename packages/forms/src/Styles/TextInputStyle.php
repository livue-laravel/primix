<?php

namespace Primix\Forms\Styles;

use Closure;
use Primix\Support\Styles\ComponentStyle;

class TextInputStyle extends ComponentStyle
{
    /** The input element (<p-input-text>) */
    public function input(string|array|Closure $value): static
    {
        return $this->section('input', $value);
    }

    /** The input container with addons (<p-input-group>) */
    public function group(string|array|Closure $value): static
    {
        return $this->section('group', $value);
    }

    /** The floating label (<p-float-label>) */
    public function label(string|array|Closure $value): static
    {
        return $this->section('label', $value);
    }

    /** The left addon (<p-input-group-addon>) */
    public function prefix(string|array|Closure $value): static
    {
        return $this->section('prefix', $value);
    }

    /** The right addon (<p-input-group-addon>) */
    public function suffix(string|array|Closure $value): static
    {
        return $this->section('suffix', $value);
    }
}
