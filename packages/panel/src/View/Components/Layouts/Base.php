<?php

namespace Primix\View\Components\Layouts;

use Illuminate\View\Component;

class Base extends Component
{
    public function __construct(
        public ?string $title = null,
        public bool $hasDarkMode = false,
    ) {}

    public function render(): \Illuminate\Contracts\View\View
    {
        return view('primix::components.layouts.base');
    }
}
