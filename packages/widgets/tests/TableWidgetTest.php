<?php

use Primix\Tables\Table;
use Primix\Widgets\TableWidget;

// Note: TableWidget uses HasTable trait which is already extensively tested
// in the primix/tables package. These tests cover only TableWidget-specific behavior.

class ConcreteTableWidget extends TableWidget
{
    protected function table(Table $table): Table
    {
        return $table;
    }

    protected function render(): string
    {
        return parent::render();
    }
}

class TableWidgetWithProperties extends TableWidget
{
    protected ?string $heading = 'Recent Orders';

    protected ?string $description = 'Last 10 orders';

    protected function table(Table $table): Table
    {
        return $table;
    }

    protected function render(): string
    {
        return parent::render();
    }
}

// ============================================================
// Default values
// ============================================================

it('has null heading by default', function () {
    $widget = new ConcreteTableWidget();

    expect($widget->getHeading())->toBeNull();
});

it('has null description by default', function () {
    $widget = new ConcreteTableWidget();

    expect($widget->getDescription())->toBeNull();
});

it('has full column span by default', function () {
    $widget = new ConcreteTableWidget();

    expect($widget->getColumnSpan())->toBe('full');
});

// ============================================================
// Getters with properties set
// ============================================================

it('returns heading when set', function () {
    $widget = new TableWidgetWithProperties();

    expect($widget->getHeading())->toBe('Recent Orders');
});

it('returns description when set', function () {
    $widget = new TableWidgetWithProperties();

    expect($widget->getDescription())->toBe('Last 10 orders');
});

// ============================================================
// Render
// ============================================================

it('renders the table widget view', function () {
    $widget = new ConcreteTableWidget();
    $method = new ReflectionMethod($widget, 'render');

    expect($method->invoke($widget))->toBe('primix-widgets::table-widget');
});
