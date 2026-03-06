<?php

namespace Primix\Forms\Styles;

use Closure;
use Primix\Support\Styles\ComponentStyle;

class RichEditorStyle extends ComponentStyle
{
    /** The toolbar container */
    public function toolbar(string|array|Closure $value): static
    {
        return $this->section('toolbar', $value);
    }

    /** The editor content area */
    public function content(string|array|Closure $value): static
    {
        return $this->section('content', $value);
    }

    /** The outer container */
    public function container(string|array|Closure $value): static
    {
        return $this->section('container', $value);
    }
}
