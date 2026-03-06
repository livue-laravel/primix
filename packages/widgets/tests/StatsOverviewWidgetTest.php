<?php

use Primix\Widgets\Stat;
use Primix\Widgets\StatsOverviewWidget;

class ConcreteStatsOverviewWidget extends StatsOverviewWidget
{
    protected function render(): string
    {
        return parent::render();
    }
}

class StatsOverviewWidgetWithStats extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Revenue', '$45,000'),
            Stat::make('Users', 1250),
            Stat::make('Orders', 340),
        ];
    }

    protected function render(): string
    {
        return parent::render();
    }
}

// ============================================================
// Default values
// ============================================================

it('has empty stats by default', function () {
    $widget = new ConcreteStatsOverviewWidget();
    $method = new ReflectionMethod($widget, 'getStats');

    expect($method->invoke($widget))->toBe([]);
});

// ============================================================
// Stats override
// ============================================================

it('returns stats when overridden', function () {
    $widget = new StatsOverviewWidgetWithStats();
    $method = new ReflectionMethod($widget, 'getStats');

    $stats = $method->invoke($widget);

    expect($stats)
        ->toHaveCount(3)
        ->each->toBeInstanceOf(Stat::class);
});

// ============================================================
// Render
// ============================================================

it('renders the stats overview view', function () {
    $widget = new ConcreteStatsOverviewWidget();
    $method = new ReflectionMethod($widget, 'render');

    expect($method->invoke($widget))->toBe('primix-widgets::stats-overview');
});

// ============================================================
// Inherits Widget behavior
// ============================================================

it('has full column span by default', function () {
    $widget = new ConcreteStatsOverviewWidget();

    expect($widget->getColumnSpan())->toBe('full');
});
