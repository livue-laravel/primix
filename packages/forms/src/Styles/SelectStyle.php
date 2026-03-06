<?php

namespace Primix\Forms\Styles;

use Closure;
use Primix\Support\Styles\ComponentStyle;

class SelectStyle extends ComponentStyle
{
    /** The select trigger (<p-select> / <p-multi-select> root) */
    public function select(string|array|Closure $value): static
    {
        return $this->section('select', $value);
    }

    /** The dropdown overlay panel */
    public function overlay(string|array|Closure $value): static
    {
        return $this->section('overlay', $value);
    }

    /** A single option in the dropdown list */
    public function option(string|array|Closure $value): static
    {
        return $this->section('option', $value);
    }

    /** The chip for multi-select selected items */
    public function chip(string|array|Closure $value): static
    {
        return $this->section('chip', $value);
    }

    /** The search/filter input inside the dropdown */
    public function filter(string|array|Closure $value): static
    {
        return $this->section('filter', $value);
    }

    /** The floating label (<p-float-label>) */
    public function label(string|array|Closure $value): static
    {
        return $this->section('label', $value);
    }
}
