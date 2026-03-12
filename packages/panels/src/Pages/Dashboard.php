<?php

namespace Primix\Pages;

use Primix\Facades\Primix;

class Dashboard extends Page
{
    protected static ?string $navigationIcon = 'heroicon-o-home';

    protected static ?int $navigationSort = -2;

    protected static ?string $slug = '';

    protected ?string $title = null;

    public function mount(): void
    {
        $this->title = __('primix::panel.dashboard');
    }

    protected function getHeaderWidgets(): array
    {
        $panel = Primix::getCurrentPanel();

        return $panel?->getWidgets() ?? [];
    }

    protected function render(): string
    {
        return 'primix::pages.dashboard';
    }
}
