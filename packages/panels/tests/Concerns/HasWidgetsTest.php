<?php

use Primix\Concerns\HasWidgets;
use Primix\Widgets\Widget;

class HasWidgetsTestPage
{
    use HasWidgets;

    public function __construct(protected array $widgets) {}

    protected function getHeaderWidgets(): array
    {
        return $this->widgets;
    }
}

class HasWidgetsUnsortedAlphaWidget extends Widget
{
    protected function render(): string
    {
        return '';
    }
}

class HasWidgetsUnsortedBetaWidget extends Widget
{
    protected function render(): string
    {
        return '';
    }
}

class HasWidgetsUnsortedGammaWidget extends Widget
{
    protected function render(): string
    {
        return '';
    }
}

class HasWidgetsSortedFirstWidget extends Widget
{
    protected ?int $sort = 0;

    protected function render(): string
    {
        return '';
    }
}

class HasWidgetsSortedSecondWidget extends Widget
{
    protected ?int $sort = 0;

    protected function render(): string
    {
        return '';
    }
}

it('preserves declaration order for widgets without explicit sort', function () {
    $page = new HasWidgetsTestPage([
        HasWidgetsUnsortedAlphaWidget::make(),
        HasWidgetsUnsortedBetaWidget::make(),
        HasWidgetsUnsortedGammaWidget::make(),
    ]);

    expect(array_map(
        fn ($widget) => $widget->getWidget(),
        $page->getVisibleHeaderWidgets(),
    ))->toBe([
        HasWidgetsUnsortedAlphaWidget::class,
        HasWidgetsUnsortedBetaWidget::class,
        HasWidgetsUnsortedGammaWidget::class,
    ]);
});

it('preserves declaration order when widgets resolve to the same sort value', function () {
    $page = new HasWidgetsTestPage([
        HasWidgetsSortedFirstWidget::make(),
        HasWidgetsSortedSecondWidget::make(),
        HasWidgetsUnsortedGammaWidget::make()->sort(0),
    ]);

    expect(array_map(
        fn ($widget) => $widget->getWidget(),
        $page->getVisibleHeaderWidgets(),
    ))->toBe([
        HasWidgetsSortedFirstWidget::class,
        HasWidgetsSortedSecondWidget::class,
        HasWidgetsUnsortedGammaWidget::class,
    ]);
});
