<?php

use Illuminate\Support\Facades\Blade;
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

it('uses boxed variant by default', function () {
    $widget = new ConcreteWidget();

    expect($widget)
        ->getVariant()->toBe('boxed')
        ->and($widget->isBoxed())->toBeTrue()
        ->and($widget->isUnboxed())->toBeFalse();
});

it('can switch widget variant', function () {
    $widget = (new ConcreteWidget())->variant('unboxed');

    expect($widget)
        ->getVariant()->toBe('unboxed')
        ->and($widget->isBoxed())->toBeFalse()
        ->and($widget->isUnboxed())->toBeTrue();
});

it('supports boxed and unboxed helpers', function () {
    $widget = (new ConcreteWidget())
        ->unboxed()
        ->boxed(false);

    expect($widget->getVariant())->toBe('unboxed');
});

it('can override variant at mount time', function () {
    $widget = new ConcreteWidget();
    $widget->mount('unboxed');

    expect($widget->getVariant())->toBe('unboxed');
});

it('rejects unsupported widget variants', function () {
    $widget = new ConcreteWidget();

    expect(fn () => $widget->variant('floating'))
        ->toThrow(\InvalidArgumentException::class, 'Unsupported widget variant [floating].');
});

it('renders the shared widget component boxed by default', function () {
    $widget = new ConcreteWidget();

    $html = Blade::render('<x-primix-widgets::widget :widget="$widget">Body</x-primix-widgets::widget>', [
        'widget' => $widget,
    ]);

    expect($html)
        ->toContain('primix-widget')
        ->toContain('primix-widget-boxed')
        ->toContain('data-primix-widget-variant="boxed"')
        ->toContain('Body');
});

it('renders the shared widget component unboxed when requested', function () {
    $widget = (new ConcreteWidget())->unboxed();

    $html = Blade::render('<x-primix-widgets::widget :widget="$widget">Body</x-primix-widgets::widget>', [
        'widget' => $widget,
    ]);

    expect($html)
        ->toContain('primix-widget')
        ->toContain('primix-widget-unboxed')
        ->toContain('data-primix-widget-variant="unboxed"')
        ->not->toContain('primix-widget-boxed');
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
