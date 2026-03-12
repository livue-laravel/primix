<?php

namespace Primix\View\Components;

use Illuminate\View\Component;

class NavigationItem extends Component
{
    public string $activeClasses = 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white';

    public string $inactiveClasses = 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white';

    public function __construct(
        public array $item = [],
        public bool $spa = false,
    ) {}

    public function isActive(): bool
    {
        return $this->item['isActive'] ?? false;
    }

    public function stateClasses(): string
    {
        return $this->isActive() ? $this->activeClasses : $this->inactiveClasses;
    }

    public function render(): \Illuminate\Contracts\View\View
    {
        return view('primix::components.navigation-item');
    }
}
