<?php

use Primix\Widgets\ChartWidget;
use Primix\Widgets\WidgetConfiguration;

class ConcreteChartWidget extends ChartWidget
{
    protected ?string $heading = null;

    protected ?string $description = null;

    protected ?int $height = null;

    protected ?string $maxHeight = null;

    protected function getType(): string
    {
        return 'line';
    }

    protected function getData(): array
    {
        return [
            'labels' => ['Jan', 'Feb', 'Mar'],
            'datasets' => [
                ['data' => [10, 20, 30]],
            ],
        ];
    }
}

class ChartWidgetWithProperties extends ChartWidget
{
    protected ?string $heading = 'Revenue Chart';

    protected ?string $description = 'Monthly revenue';

    protected ?int $height = 300;

    protected ?string $maxHeight = '400px';

    protected function getType(): string
    {
        return 'bar';
    }

    protected function getData(): array
    {
        return [];
    }

    protected function getOptions(): array
    {
        return ['responsive' => true];
    }
}

// ============================================================
// Default values
// ============================================================

it('has null defaults', function () {
    $widget = new ConcreteChartWidget();

    expect($widget)
        ->getHeading()->toBeNull()
        ->getDescription()->toBeNull()
        ->getHeight()->toBeNull()
        ->getMaxHeight()->toBeNull();
});

it('has empty options by default', function () {
    $widget = new ConcreteChartWidget();
    $method = new ReflectionMethod($widget, 'getOptions');

    expect($method->invoke($widget))->toBe([]);
});

// ============================================================
// Getters with properties set
// ============================================================

it('returns heading when set', function () {
    $widget = new ChartWidgetWithProperties();

    expect($widget->getHeading())->toBe('Revenue Chart');
});

it('returns description when set', function () {
    $widget = new ChartWidgetWithProperties();

    expect($widget->getDescription())->toBe('Monthly revenue');
});

it('returns height when set', function () {
    $widget = new ChartWidgetWithProperties();

    expect($widget->getHeight())->toBe(300);
});

it('returns max height when set', function () {
    $widget = new ChartWidgetWithProperties();

    expect($widget->getMaxHeight())->toBe('400px');
});

it('returns options when overridden', function () {
    $widget = new ChartWidgetWithProperties();
    $method = new ReflectionMethod($widget, 'getOptions');

    expect($method->invoke($widget))->toBe(['responsive' => true]);
});

// ============================================================
// Abstract methods via reflection
// ============================================================

it('returns chart type', function () {
    $widget = new ConcreteChartWidget();
    $method = new ReflectionMethod($widget, 'getType');

    expect($method->invoke($widget))->toBe('line');
});

it('returns chart data', function () {
    $widget = new ConcreteChartWidget();
    $method = new ReflectionMethod($widget, 'getData');

    expect($method->invoke($widget))
        ->toHaveKey('labels')
        ->toHaveKey('datasets');
});

// ============================================================
// Render
// ============================================================

it('renders the chart view', function () {
    $widget = new ConcreteChartWidget();
    $method = new ReflectionMethod($widget, 'render');

    expect($method->invoke($widget))->toBe('primix-widgets::chart');
});

// ============================================================
// Inherits Widget behavior
// ============================================================

it('inherits make from Widget', function () {
    $config = ConcreteChartWidget::make();

    expect($config)
        ->toBeInstanceOf(WidgetConfiguration::class)
        ->getWidget()->toBe(ConcreteChartWidget::class);
});
