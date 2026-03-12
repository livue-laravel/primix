<?php

namespace Primix\Concerns;

use Primix\Widgets\Widget;
use Primix\Widgets\WidgetConfiguration;
use ReflectionClass;

trait HasWidgets
{
    protected function getHeaderWidgets(): array
    {
        return [];
    }

    protected function getFooterWidgets(): array
    {
        return [];
    }

    public function getHeaderWidgetsColumns(): int|array
    {
        return 3;
    }

    public function getFooterWidgetsColumns(): int|array
    {
        return 3;
    }

    /**
     * @return array<string|Widget|WidgetConfiguration>
     */
    public function getVisibleHeaderWidgets(): array
    {
        return $this->resolveWidgets($this->getHeaderWidgets());
    }

    /**
     * @return array<string|Widget|WidgetConfiguration>
     */
    public function getVisibleFooterWidgets(): array
    {
        return $this->resolveWidgets($this->getFooterWidgets());
    }

    /**
     * Get the CSS custom properties for the widget grid container.
     */
    public function getWidgetsGridStyle(int|array $columns): string
    {
        if (is_int($columns)) {
            return "--cols: {$columns};";
        }

        $styles = [];

        foreach ($columns as $breakpoint => $value) {
            $suffix = $breakpoint === 'default' ? '' : "-{$breakpoint}";
            $styles[] = "--cols{$suffix}: {$value}";
        }

        return implode('; ', $styles) . ';';
    }

    /**
     * Get the CSS custom properties for a widget grid item.
     */
    public function getWidgetGridItemStyle(string|Widget|WidgetConfiguration $widget): string
    {
        $span = $this->getWidgetColumnSpan($widget);

        if ($span === null || $span === 'full') {
            return '';
        }

        if (is_array($span)) {
            $styles = [];

            foreach ($span as $breakpoint => $value) {
                $suffix = $breakpoint === 'default' ? '' : "-{$breakpoint}";
                $styles[] = "--col-span{$suffix}: {$value}";
            }

            return implode('; ', $styles);
        }

        return "--col-span: {$span}";
    }

    /**
     * Check if a widget spans the full grid width.
     */
    public function isWidgetColumnSpanFull(string|Widget|WidgetConfiguration $widget): bool
    {
        return $this->getWidgetColumnSpan($widget) === 'full';
    }

    /**
     * Filter by canView(), shouldBeVisible(), and WidgetConfiguration visibility.
     * Sort by sort order. Returns class strings, Widget instances, or WidgetConfiguration objects.
     *
     * @return array<string|Widget|WidgetConfiguration>
     */
    protected function resolveWidgets(array $widgets): array
    {
        $resolved = [];

        foreach ($widgets as $widget) {
            if ($widget instanceof WidgetConfiguration) {
                $widgetClass = $widget->getWidget();

                if (! $widgetClass::canView()) {
                    continue;
                }

                if (! $widgetClass::shouldBeVisible()) {
                    continue;
                }

                if ($widget->isHidden()) {
                    continue;
                }

                $resolved[] = $widget;
            } elseif (is_string($widget) && is_subclass_of($widget, Widget::class)) {
                if (! $widget::canView()) {
                    continue;
                }

                if (! $widget::shouldBeVisible()) {
                    continue;
                }

                $resolved[] = $widget;
            } elseif ($widget instanceof Widget) {
                if (! $widget::canView()) {
                    continue;
                }

                if (! $widget::shouldBeVisible()) {
                    continue;
                }

                $resolved[] = $widget;
            }
        }

        usort($resolved, function ($a, $b) {
            $sortA = $this->getWidgetSort($a);
            $sortB = $this->getWidgetSort($b);

            return ($sortA ?? PHP_INT_MAX) <=> ($sortB ?? PHP_INT_MAX);
        });

        return $resolved;
    }

    protected function getWidgetSort(string|Widget|WidgetConfiguration $widget): ?int
    {
        if ($widget instanceof WidgetConfiguration) {
            return $widget->getSort()
                ?? (new ReflectionClass($widget->getWidget()))->getDefaultProperties()['sort']
                ?? null;
        }

        if ($widget instanceof Widget) {
            return $widget->getSort();
        }

        return (new ReflectionClass($widget))->getDefaultProperties()['sort'] ?? null;
    }

    protected function getWidgetColumnSpan(string|Widget|WidgetConfiguration $widget): int|string|array|null
    {
        if ($widget instanceof WidgetConfiguration) {
            return $widget->getColumnSpan()
                ?? (new ReflectionClass($widget->getWidget()))->getDefaultProperties()['columnSpan']
                ?? 'full';
        }

        if ($widget instanceof Widget) {
            return $widget->getColumnSpan();
        }

        return (new ReflectionClass($widget))->getDefaultProperties()['columnSpan'] ?? 'full';
    }
}
