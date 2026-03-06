<?php

namespace Primix\Forms\Styles;

use Closure;
use Primix\Support\Styles\ComponentStyle;

class TabsStyle extends ComponentStyle
{
    /** The tabs container (<p-tabs>) */
    public function tabs(string|array|Closure $value): static
    {
        return $this->section('tabs', $value);
    }

    /** The tab header bar (<p-tab-list>) */
    public function tabList(string|array|Closure $value): static
    {
        return $this->section('tabList', $value);
    }

    /** A single tab header (<p-tab>) */
    public function tab(string|array|Closure $value): static
    {
        return $this->section('tab', $value);
    }

    /** A single tab content panel (<p-tab-panel>) */
    public function tabPanel(string|array|Closure $value): static
    {
        return $this->section('tabPanel', $value);
    }
}
