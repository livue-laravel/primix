<?php

namespace Primix\View\Components\Pages;

use Illuminate\View\Component;

class Page extends Component
{
    public function __construct(
        public mixed $page = null,
    ) {}

    public function render(): \Illuminate\Contracts\View\View
    {
        return view('primix::components.pages.page');
    }
}
