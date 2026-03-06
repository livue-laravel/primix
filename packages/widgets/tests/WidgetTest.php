<?php

use Primix\Widgets\Widget;
use Primix\Widgets\WidgetConfiguration;

class ConcreteWidget extends Widget
{
    protected function render(): string
    {
        return 'test::widget';
    }
}

// ============================================================
// Factory
// ============================================================

it('make returns WidgetConfiguration', function () {
    $config = ConcreteWidget::make();

    expect($config)
        ->toBeInstanceOf(WidgetConfiguration::class)
        ->getWidget()->toBe(ConcreteWidget::class);
});

// ============================================================
// Static methods
// ============================================================

it('canView returns true by default', function () {
    expect(ConcreteWidget::canView())->toBeTrue();
});

it('shouldBeVisible returns true by default', function () {
    expect(ConcreteWidget::shouldBeVisible())->toBeTrue();
});

// ============================================================
// Instance methods
// ============================================================

it('has full column span by default', function () {
    $widget = new ConcreteWidget();

    expect($widget->getColumnSpan())->toBe('full');
});

it('has null sort by default', function () {
    $widget = new ConcreteWidget();

    expect($widget->getSort())->toBeNull();
});

// ============================================================
// HasColumnSpan trait
// ============================================================

it('can set column span', function () {
    $widget = new ConcreteWidget();
    $widget->columnSpan(2);

    expect($widget->getColumnSpan())->toBe(2);
});

it('can set column span full', function () {
    $widget = new ConcreteWidget();
    $widget->columnSpanFull();

    expect($widget->isColumnSpanFull())->toBeTrue();
});
