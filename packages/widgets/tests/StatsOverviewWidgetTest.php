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

class StatsOverviewWidgetWithCustomColumns extends StatsOverviewWidget
{
    protected int|array|\Closure|null $columns = 2;

    protected function getStats(): array
    {
        return [
            Stat::make('Revenue', '$45,000'),
            Stat::make('Users', 1250),
            Stat::make('Orders', 340),
        ];
    }
}

class StatsOverviewWidgetWithResponsiveColumns extends StatsOverviewWidget
{
    protected int|array|\Closure|null $columns = [
        'default' => 1,
        'md' => 2,
        'xl' => 4,
    ];
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

it('uses one column by default when there are no stats', function () {
    $widget = new ConcreteStatsOverviewWidget();

    expect($widget->getColumns())->toBe(1)
        ->and($widget->getGridStyle())->toBe('--cols: 1;');
});

it('uses stats count as default columns when stats are present', function () {
    $widget = new StatsOverviewWidgetWithStats();

    expect($widget->getColumns())->toBe(3)
        ->and($widget->getGridStyle())->toBe('--cols: 3;');
});

it('supports custom fixed columns', function () {
    $widget = new StatsOverviewWidgetWithCustomColumns();

    expect($widget->getColumns())->toBe(2)
        ->and($widget->getGridStyle())->toBe('--cols: 2;');
});

it('supports responsive columns', function () {
    $widget = new StatsOverviewWidgetWithResponsiveColumns();

    expect($widget->getColumns())->toBe([
        'default' => 1,
        'md' => 2,
        'xl' => 4,
    ])
        ->and($widget->getGridStyle())->toBe('--cols: 1; --cols-md: 2; --cols-xl: 4;');
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
