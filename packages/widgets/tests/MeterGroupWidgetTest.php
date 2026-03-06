<?php

use Primix\Widgets\Meter;
use Primix\Widgets\MeterGroupWidget;

class ConcreteMeterGroupWidget extends MeterGroupWidget
{
    protected function getMeters(): array
    {
        return [];
    }
}

class MeterGroupWidgetWithProperties extends MeterGroupWidget
{
    protected ?string $heading = 'System Resources';

    protected ?int $max = 100;

    protected function getMeters(): array
    {
        return [
            Meter::make('CPU', 75.0)->color('warning')->icon('pi pi-server'),
            Meter::make('Memory', 45.0)->color('success')->icon('pi pi-database'),
        ];
    }
}

// ============================================================
// Default values
// ============================================================

it('has null heading by default', function () {
    $widget = new ConcreteMeterGroupWidget();

    expect($widget->getHeading())->toBeNull();
});

it('has null max by default', function () {
    $widget = new ConcreteMeterGroupWidget();

    expect($widget->getMax())->toBeNull();
});

// ============================================================
// Getters with properties set
// ============================================================

it('returns heading when set', function () {
    $widget = new MeterGroupWidgetWithProperties();

    expect($widget->getHeading())->toBe('System Resources');
});

it('returns max when set', function () {
    $widget = new MeterGroupWidgetWithProperties();

    expect($widget->getMax())->toBe(100);
});

// ============================================================
// Meters
// ============================================================

it('returns meters when overridden', function () {
    $widget = new MeterGroupWidgetWithProperties();
    $method = new ReflectionMethod($widget, 'getMeters');

    $meters = $method->invoke($widget);

    expect($meters)
        ->toHaveCount(2)
        ->each->toBeInstanceOf(Meter::class);
});

it('returns empty meters by default', function () {
    $widget = new ConcreteMeterGroupWidget();
    $method = new ReflectionMethod($widget, 'getMeters');

    expect($method->invoke($widget))->toBe([]);
});

// ============================================================
// Render
// ============================================================

it('renders the meter group view', function () {
    $widget = new ConcreteMeterGroupWidget();
    $method = new ReflectionMethod($widget, 'render');

    expect($method->invoke($widget))->toBe('primix-widgets::meter-group');
});

// ============================================================
// Inherits Widget behavior
// ============================================================

it('has full column span by default', function () {
    $widget = new ConcreteMeterGroupWidget();

    expect($widget->getColumnSpan())->toBe('full');
});
