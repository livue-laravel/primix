<?php

namespace Primix\Support\Contracts;

use Illuminate\Contracts\View\View;

interface Renderable
{
    public function render(): View|string;
}
