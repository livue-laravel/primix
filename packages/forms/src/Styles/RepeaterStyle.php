<?php

namespace Primix\Forms\Styles;

use Closure;
use Primix\Support\Styles\ComponentStyle;

class RepeaterStyle extends ComponentStyle
{
    /** The outer repeater container */
    public function container(string|array|Closure $value): static
    {
        return $this->section('container', $value);
    }

    /** Each repeater item wrapper */
    public function item(string|array|Closure $value): static
    {
        return $this->section('item', $value);
    }

    /** The item header (label + actions) */
    public function header(string|array|Closure $value): static
    {
        return $this->section('header', $value);
    }

    /** The item content area (fields) */
    public function content(string|array|Closure $value): static
    {
        return $this->section('content', $value);
    }

    /** The add button */
    public function addButton(string|array|Closure $value): static
    {
        return $this->section('addButton', $value);
    }

    // Table layout sections

    /** The <table> element (table layout only) */
    public function table(string|array|Closure $value): static
    {
        return $this->section('table', $value);
    }

    /** The <thead> element (table layout only) */
    public function thead(string|array|Closure $value): static
    {
        return $this->section('thead', $value);
    }

    /** The <th> elements (table layout only) */
    public function th(string|array|Closure $value): static
    {
        return $this->section('th', $value);
    }

    /** The <tbody> element (table layout only) */
    public function tbody(string|array|Closure $value): static
    {
        return $this->section('tbody', $value);
    }

    /** Each <tr> row (table layout only) */
    public function tr(string|array|Closure $value): static
    {
        return $this->section('tr', $value);
    }

    /** Each <td> cell (table layout only) */
    public function td(string|array|Closure $value): static
    {
        return $this->section('td', $value);
    }
}
