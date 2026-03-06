<?php

namespace Primix\Widgets;

abstract class StatsOverviewWidget extends Widget
{
    protected function getStats(): array
    {
        return [];
    }

    protected function render(): string
    {
        return 'primix-widgets::stats-overview';
    }
}
