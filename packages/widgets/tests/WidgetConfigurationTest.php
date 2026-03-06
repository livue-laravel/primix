<?php

use Primix\Widgets\WidgetConfiguration;

// ============================================================
// Creation
// ============================================================

it('can be created with make', function () {
    $config = WidgetConfiguration::make('App\Widgets\RevenueWidget');

    expect($config)
        ->toBeInstanceOf(WidgetConfiguration::class)
        ->getWidget()->toBe('App\Widgets\RevenueWidget');
});

it('can be created with constructor', function () {
    $config = new WidgetConfiguration('App\Widgets\RevenueWidget');

    expect($config->getWidget())->toBe('App\Widgets\RevenueWidget');
});

// ============================================================
// Sort
// ============================================================

it('has null sort by default', function () {
    $config = WidgetConfiguration::make('App\Widgets\TestWidget');

    expect($config->getSort())->toBeNull();
});

it('can set sort', function () {
    $config = WidgetConfiguration::make('App\Widgets\TestWidget')
        ->sort(5);

    expect($config->getSort())->toBe(5);
});

it('can set sort to null', function () {
    $config = WidgetConfiguration::make('App\Widgets\TestWidget')
        ->sort(5)
        ->sort(null);

    expect($config->getSort())->toBeNull();
});

// ============================================================
// CanBeHidden trait
// ============================================================

it('is visible by default', function () {
    $config = WidgetConfiguration::make('App\Widgets\TestWidget');

    expect($config)
        ->isVisible()->toBeTrue()
        ->isHidden()->toBeFalse();
});

it('can be hidden', function () {
    $config = WidgetConfiguration::make('App\Widgets\TestWidget')
        ->hidden();

    expect($config)
        ->isHidden()->toBeTrue()
        ->isVisible()->toBeFalse();
});

it('hidden takes priority over visible', function () {
    $config = WidgetConfiguration::make('App\Widgets\TestWidget')
        ->hidden()
        ->visible();

    // hidden() has priority — use hidden(false) to un-hide
    expect($config)->isHidden()->toBeTrue();
});

it('can be un-hidden with hidden false', function () {
    $config = WidgetConfiguration::make('App\Widgets\TestWidget')
        ->hidden()
        ->hidden(false);

    expect($config)->isVisible()->toBeTrue();
});

it('can be hidden conditionally', function () {
    $config = WidgetConfiguration::make('App\Widgets\TestWidget')
        ->hidden(false);

    expect($config)->isVisible()->toBeTrue();
});

// ============================================================
// HasColumnSpan trait
// ============================================================

it('has null column span by default', function () {
    $config = WidgetConfiguration::make('App\Widgets\TestWidget');

    expect($config->getColumnSpan())->toBeNull();
});

it('can set column span', function () {
    $config = WidgetConfiguration::make('App\Widgets\TestWidget')
        ->columnSpan(2);

    expect($config->getColumnSpan())->toBe(2);
});

it('can set column span full', function () {
    $config = WidgetConfiguration::make('App\Widgets\TestWidget')
        ->columnSpanFull();

    expect($config)
        ->getColumnSpan()->toBe('full')
        ->isColumnSpanFull()->toBeTrue();
});

it('can set column start', function () {
    $config = WidgetConfiguration::make('App\Widgets\TestWidget')
        ->columnStart(2);

    expect($config->getColumnStart())->toBe(2);
});

// ============================================================
// Fluent chaining
// ============================================================

it('supports fluent chaining', function () {
    $config = WidgetConfiguration::make('App\Widgets\TestWidget')
        ->sort(3)
        ->columnSpan(2)
        ->hidden(false);

    expect($config)
        ->toBeInstanceOf(WidgetConfiguration::class)
        ->getSort()->toBe(3)
        ->getColumnSpan()->toBe(2)
        ->isVisible()->toBeTrue();
});
