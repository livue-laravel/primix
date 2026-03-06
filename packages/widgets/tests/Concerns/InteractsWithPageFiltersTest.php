<?php

use Primix\Widgets\Concerns\InteractsWithPageFilters;

class WidgetWithFilters
{
    use InteractsWithPageFilters;
}

// ============================================================
// Default values
// ============================================================

it('has empty filters by default', function () {
    $widget = new WidgetWithFilters();

    expect($widget->tableFilters)->toBe([]);
});

// ============================================================
// Setting filters
// ============================================================

it('can set filters', function () {
    $widget = new WidgetWithFilters();
    $widget->tableFilters = ['status' => 'active', 'category' => 'electronics'];

    expect($widget->tableFilters)
        ->toHaveCount(2)
        ->toHaveKey('status', 'active')
        ->toHaveKey('category', 'electronics');
});

it('filters property is public', function () {
    $reflection = new ReflectionProperty(WidgetWithFilters::class, 'tableFilters');

    expect($reflection->isPublic())->toBeTrue();
});
