<?php

use Primix\Support\Colors\Color;
use Primix\Widgets\Meter;

// ============================================================
// Creation
// ============================================================

it('can be created with make', function () {
    $meter = Meter::make('CPU Usage', 75.5);

    expect($meter)
        ->toBeInstanceOf(Meter::class)
        ->getLabel()->toBe('CPU Usage')
        ->getValue()->toBe(75.5);
});

it('accepts zero value', function () {
    $meter = Meter::make('Empty', 0.0);

    expect($meter->getValue())->toBe(0.0);
});

// ============================================================
// Default values
// ============================================================

it('has null defaults for optional properties', function () {
    $meter = Meter::make('CPU', 50.0);

    expect($meter)
        ->getIcon()->toBeNull()
        ->getColor()->toBeNull();
});

// ============================================================
// Fluent setters
// ============================================================

it('can update value with fluent setter', function () {
    $meter = Meter::make('CPU', 50.0)
        ->value(80.0);

    expect($meter->getValue())->toBe(80.0);
});

// ============================================================
// HasColor trait
// ============================================================

it('can set color as string', function () {
    $meter = Meter::make('CPU', 50.0)
        ->color('success');

    expect($meter->getColor())->toBe('success');
});

it('can set color as Color object', function () {
    $meter = Meter::make('CPU', 50.0)
        ->color(Color::hex('#22c55e'));

    expect($meter->getColor())->toBe('#22c55e');
});

// ============================================================
// HasIcon trait
// ============================================================

it('can set icon', function () {
    $meter = Meter::make('CPU', 50.0)
        ->icon('pi pi-server');

    expect($meter->getIcon())->toBe('pi pi-server');
});

// ============================================================
// toArray serialization
// ============================================================

it('serializes to array with defaults', function () {
    $meter = Meter::make('CPU', 75.0);

    expect($meter->toArray())->toBe([
        'label' => 'CPU',
        'value' => 75.0,
        'color' => null,
        'icon' => null,
    ]);
});

it('serializes to array with all properties', function () {
    $meter = Meter::make('CPU', 75.0)
        ->color(Color::hex('#ef4444'))
        ->icon('pi pi-server');

    expect($meter->toArray())->toBe([
        'label' => 'CPU',
        'value' => 75.0,
        'color' => '#ef4444',
        'icon' => 'pi pi-server',
    ]);
});

// ============================================================
// Fluent chaining
// ============================================================

it('supports fluent chaining', function () {
    $meter = Meter::make('Memory', 60.0)
        ->value(65.0)
        ->color('warning')
        ->icon('pi pi-database');

    expect($meter)
        ->toBeInstanceOf(Meter::class)
        ->getLabel()->toBe('Memory')
        ->getValue()->toBe(65.0);
});
