<?php

namespace Primix\View\Components;

use Illuminate\Contracts\Support\Htmlable;
use Illuminate\View\Component;

class PageHeader extends Component
{
    public function __construct(
        public string|Htmlable $title,
        public string|Htmlable|null $subheading = null,
        public array $breadcrumbs = [],
        public array $actions = [],
    ) {}

    public function render(): \Illuminate\Contracts\View\View
    {
        return view('primix::components.page-header');
    }
}
