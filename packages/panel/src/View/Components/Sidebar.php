<?php

namespace Primix\View\Components;

use Illuminate\View\Component;

class Sidebar extends Component
{
    public function __construct(
        public array $navigation = [],
        public string $brandName = 'Primix',
    ) {}

    public function render(): \Illuminate\Contracts\View\View
    {
        return view('primix::components.sidebar');
    }
}
