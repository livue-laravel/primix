<?php

use Primix\Support\Colors\Color;
use Primix\Widgets\Stat;

// ============================================================
// Creation
// ============================================================

it('can be created with make', function () {
    $stat = Stat::make('Total Revenue', '$45,000');

    expect($stat)
        ->toBeInstanceOf(Stat::class)
        ->getLabel()->toBe('Total Revenue')
        ->getValue()->toBe('$45,000');
});

it('accepts integer value', function () {
    $stat = Stat::make('Users', 1250);

    expect($stat->getValue())->toBe(1250);
});

it('accepts float value', function () {
    $stat = Stat::make('Conversion Rate', 3.14);

    expect($stat->getValue())->toBe(3.14);
});

// ============================================================
// Default values
// ============================================================

it('has null defaults for optional properties', function () {
    $stat = Stat::make('Label', 0);

    expect($stat)
        ->getDescription()->toBeNull()
        ->getDescriptionIcon()->toBeNull()
        ->getDescriptionColor()->toBeNull()
        ->getChart()->toBeNull()
        ->getChartColor()->toBeNull()
        ->getTrend()->toBeNull()
        ->getTrendIcon()->toBeNull()
        ->getTrendColor()->toBeNull()
        ->getIcon()->toBeNull()
        ->getIconBackgroundColor()->toBeNull()
        ->getIconBoxShape()->toBe('soft-square')
        ->getColor()->toBeNull();
});

// ============================================================
// Fluent setters
// ============================================================

it('can set description', function () {
    $stat = Stat::make('Revenue', 100)
        ->description('32% increase');

    expect($stat->getDescription())->toBe('32% increase');
});

it('can set description icon with color string', function () {
    $stat = Stat::make('Revenue', 100)
        ->descriptionIcon('pi pi-arrow-up', 'success');

    expect($stat)
        ->getDescriptionIcon()->toBe('pi pi-arrow-up')
        ->getDescriptionColor()->toBe('#22c55e');
});

it('can set description icon with Color object', function () {
    $stat = Stat::make('Revenue', 100)
        ->descriptionIcon('pi pi-arrow-up', Color::hex('#22c55e'));

    expect($stat)
        ->getDescriptionIcon()->toBe('pi pi-arrow-up')
        ->getDescriptionColor()->toBe('#22c55e');
});

it('can set description icon without color', function () {
    $stat = Stat::make('Revenue', 100)
        ->descriptionIcon('pi pi-arrow-down');

    expect($stat)
        ->getDescriptionIcon()->toBe('pi pi-arrow-down')
        ->getDescriptionColor()->toBeNull();
});

it('can set column span', function () {
    $stat = Stat::make('Revenue', 100)
        ->columnSpan(2);

    $array = $stat->toArray();

    expect($array['columnSpan'])->toBe(2);
});

it('can set chart data', function () {
    $chartData = [10, 20, 30, 40, 50];

    $stat = Stat::make('Revenue', 100)
        ->chart($chartData);

    expect($stat->getChart())->toBe($chartData);
});

it('can set chart data with color string', function () {
    $stat = Stat::make('Revenue', 100)
        ->chart([10, 20], 'primary');

    expect($stat)
        ->getChart()->toBe([10, 20])
        ->getChartColor()->toBe('#2563eb');
});

it('can set chart data with Color object', function () {
    $stat = Stat::make('Revenue', 100)
        ->chart([10, 20], Color::hex('#3b82f6'));

    expect($stat)
        ->getChart()->toBe([10, 20])
        ->getChartColor()->toBe('#3b82f6');
});

it('can set icon background color', function () {
    $stat = Stat::make('Revenue', 100)
        ->iconBackground('success');

    expect($stat->getIconBackgroundColor())->toBe('#22c55e');
});

it('uses soft-square as default icon box shape', function () {
    $stat = Stat::make('Revenue', 100);

    expect($stat->getIconBoxShape())->toBe('soft-square');
});

it('can set icon box shape', function () {
    $stat = Stat::make('Revenue', 100)
        ->iconBoxShape('circle');

    expect($stat->getIconBoxShape())->toBe('circle');
});

it('normalizes unknown icon box shapes to soft-square', function () {
    $stat = Stat::make('Revenue', 100)
        ->iconBoxShape('whatever');

    expect($stat->getIconBoxShape())->toBe('soft-square');
});

it('can set trend text with icon and color', function () {
    $stat = Stat::make('Revenue', 100)
        ->trend('+12.4% vs last week', 'heroicon-o-arrow-trending-up', Color::hex('#22c55e'));

    expect($stat)
        ->getTrend()->toBe('+12.4% vs last week')
        ->getTrendIcon()->toBe('heroicon-o-arrow-trending-up')
        ->getTrendColor()->toBe('#22c55e');
});

it('infers positive trend icon and default color', function () {
    $stat = Stat::make('Revenue', 100)
        ->trend('5');

    expect($stat)
        ->getTrend()->toBe('5')
        ->getTrendIcon()->toBe('primix-trend-up')
        ->getTrendColor()->toBe('#22c55e');
});

it('infers negative trend icon and default color', function () {
    $stat = Stat::make('Revenue', 100)
        ->trend('-3');

    expect($stat)
        ->getTrend()->toBe('-3')
        ->getTrendIcon()->toBe('primix-trend-down')
        ->getTrendColor()->toBe('#ef4444');
});

it('serializes inferred trend metadata to array', function () {
    $stat = Stat::make('Revenue', 100)
        ->trend('5');

    expect($stat->toArray())
        ->toHaveKey('trendIcon', 'primix-trend-up')
        ->toHaveKey('trendColor', '#22c55e');
});

it('resolves semantic trend colors to hex', function () {
    $stat = Stat::make('Revenue', 100)
        ->trend('+9%', null, 'success');

    expect($stat->getTrendColor())->toBe('#22c55e');
});

// ============================================================
// HasColor trait
// ============================================================

it('can set color as string', function () {
    $stat = Stat::make('Revenue', 100)
        ->color('success');

    expect($stat->getColor())->toBe('success');
});

it('can set color as Color object', function () {
    $stat = Stat::make('Revenue', 100)
        ->color(Color::hex('#ef4444'));

    expect($stat->getColor())->toBe('#ef4444');
});

// ============================================================
// HasIcon trait
// ============================================================

it('can set icon', function () {
    $stat = Stat::make('Revenue', 100)
        ->icon('pi pi-dollar');

    expect($stat->getIcon())->toBe('pi pi-dollar');
});

// ============================================================
// toArray serialization
// ============================================================

it('serializes to array with all null defaults', function () {
    $stat = Stat::make('Revenue', 1000);

    expect($stat->toArray())->toBe([
        'label' => 'Revenue',
        'value' => 1000,
        'description' => null,
        'descriptionIcon' => null,
        'descriptionColor' => null,
        'icon' => null,
        'color' => null,
        'iconBackgroundColor' => null,
        'iconBoxShape' => 'soft-square',
        'chart' => null,
        'chartColor' => null,
        'trend' => null,
        'trendIcon' => null,
        'trendColor' => null,
        'columnSpan' => null,
    ]);
});

it('serializes to array with all properties set', function () {
    $stat = Stat::make('Revenue', '$45,000')
        ->description('32% increase')
        ->descriptionIcon('pi pi-arrow-up', Color::hex('#22c55e'))
        ->icon('pi pi-dollar')
        ->color('success')
        ->iconBackground(Color::hex('#eff6ff'))
        ->iconBoxShape('circle')
        ->chart([10, 20, 30], Color::hex('#3b82f6'))
        ->trend('+12.4% vs last week', 'primix-trend-up', Color::hex('#22c55e'))
        ->columnSpan(2);

    $array = $stat->toArray();

    expect($array)
        ->toHaveKey('label', 'Revenue')
        ->toHaveKey('value', '$45,000')
        ->toHaveKey('description', '32% increase')
        ->toHaveKey('descriptionIcon', 'pi pi-arrow-up')
        ->toHaveKey('descriptionColor', '#22c55e')
        ->toHaveKey('icon', 'pi pi-dollar')
        ->toHaveKey('color', '#22c55e')
        ->toHaveKey('iconBackgroundColor', '#eff6ff')
        ->toHaveKey('iconBoxShape', 'circle')
        ->toHaveKey('chart', [10, 20, 30])
        ->toHaveKey('chartColor', '#3b82f6')
        ->toHaveKey('trend', '+12.4% vs last week')
        ->toHaveKey('trendIcon', 'primix-trend-up')
        ->toHaveKey('trendColor', '#22c55e')
        ->toHaveKey('columnSpan', 2);
});

// ============================================================
// Fluent chaining
// ============================================================

it('supports fluent chaining', function () {
    $stat = Stat::make('Users', 150)
        ->description('Active users')
        ->descriptionIcon('pi pi-users')
        ->icon('pi pi-user')
        ->color('primary')
        ->iconBackground('success')
        ->iconBoxShape('square')
        ->chart([5, 10, 15])
        ->trend('+9%', 'primix-trend-up', 'success')
        ->columnSpan(1);

    expect($stat)
        ->toBeInstanceOf(Stat::class)
        ->getLabel()->toBe('Users')
        ->getValue()->toBe(150)
        ->getDescription()->toBe('Active users');
});
