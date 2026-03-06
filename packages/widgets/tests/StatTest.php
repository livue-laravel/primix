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
        ->getIcon()->toBeNull()
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
        ->getDescriptionColor()->toBe('success');
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
        ->getChartColor()->toBe('primary');
});

it('can set chart data with Color object', function () {
    $stat = Stat::make('Revenue', 100)
        ->chart([10, 20], Color::hex('#3b82f6'));

    expect($stat)
        ->getChart()->toBe([10, 20])
        ->getChartColor()->toBe('#3b82f6');
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
        'chart' => null,
        'chartColor' => null,
        'columnSpan' => null,
    ]);
});

it('serializes to array with all properties set', function () {
    $stat = Stat::make('Revenue', '$45,000')
        ->description('32% increase')
        ->descriptionIcon('pi pi-arrow-up', Color::hex('#22c55e'))
        ->icon('pi pi-dollar')
        ->color('success')
        ->chart([10, 20, 30], Color::hex('#3b82f6'))
        ->columnSpan(2);

    $array = $stat->toArray();

    expect($array)
        ->toHaveKey('label', 'Revenue')
        ->toHaveKey('value', '$45,000')
        ->toHaveKey('description', '32% increase')
        ->toHaveKey('descriptionIcon', 'pi pi-arrow-up')
        ->toHaveKey('descriptionColor', '#22c55e')
        ->toHaveKey('icon', 'pi pi-dollar')
        ->toHaveKey('color', 'success')
        ->toHaveKey('chart', [10, 20, 30])
        ->toHaveKey('chartColor', '#3b82f6')
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
        ->chart([5, 10, 15])
        ->columnSpan(1);

    expect($stat)
        ->toBeInstanceOf(Stat::class)
        ->getLabel()->toBe('Users')
        ->getValue()->toBe(150)
        ->getDescription()->toBe('Active users');
});
