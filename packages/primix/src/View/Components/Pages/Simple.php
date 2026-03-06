<?php

namespace Primix\View\Components\Pages;

use Illuminate\View\Component;

class Simple extends Component
{
    public function render(): \Illuminate\Contracts\View\View
    {
        return view('primix::components.pages.simple');
    }
}
