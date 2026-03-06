<?php

use Primix\Widgets\ProgressBarWidget;

class ConcreteProgressBarWidget extends ProgressBarWidget
{
    protected function getValue(): int
    {
        return 0;
    }
}

class ProgressBarWidgetWithProperties extends ProgressBarWidget
{
    protected ?string $heading = 'Upload Progress';

    protected ?string $mode = 'indeterminate';

    protected bool $showValue = false;

    protected function getValue(): int
    {
        return 75;
    }
}

// ============================================================
// Default values
// ============================================================

it('has null heading by default', function () {
    $widget = new ConcreteProgressBarWidget();

    expect($widget->getHeading())->toBeNull();
});

it('has null mode by default', function () {
    $widget = new ConcreteProgressBarWidget();

    expect($widget->getMode())->toBeNull();
});

it('shows value by default', function () {
    $widget = new ConcreteProgressBarWidget();

    expect($widget->shouldShowValue())->toBeTrue();
});

// ============================================================
// Getters with properties set
// ============================================================

it('returns heading when set', function () {
    $widget = new ProgressBarWidgetWithProperties();

    expect($widget->getHeading())->toBe('Upload Progress');
});

it('returns mode when set', function () {
    $widget = new ProgressBarWidgetWithProperties();

    expect($widget->getMode())->toBe('indeterminate');
});

it('respects showValue override', function () {
    $widget = new ProgressBarWidgetWithProperties();

    expect($widget->shouldShowValue())->toBeFalse();
});

// ============================================================
// getValue via reflection
// ============================================================

it('returns value via reflection', function () {
    $widget = new ProgressBarWidgetWithProperties();
    $method = new ReflectionMethod($widget, 'getValue');

    expect($method->invoke($widget))->toBe(75);
});

// ============================================================
// Render
// ============================================================

it('renders the progress bar view', function () {
    $widget = new ConcreteProgressBarWidget();
    $method = new ReflectionMethod($widget, 'render');

    expect($method->invoke($widget))->toBe('primix-widgets::progress-bar');
});

// ============================================================
// Inherits Widget behavior
// ============================================================

it('has full column span by default', function () {
    $widget = new ConcreteProgressBarWidget();

    expect($widget->getColumnSpan())->toBe('full');
});
