<?php

namespace Primix\View\Components;

use Illuminate\View\Component;

class Topbar extends Component
{
    public function __construct(
        public array $navigation = [],
        public string $brandName = 'Primix',
        public bool $topBarNavigation = false,
    ) {}

    public function render(): \Illuminate\Contracts\View\View
    {
        return view('primix::components.topbar');
    }
}
