<?php

namespace Primix\Widgets;

use ReflectionClass;

abstract class GroupWidget extends Widget
{
    /**
     * @var array<int, string|Widget|WidgetConfiguration>
     */
    protected array $childWidgets = [];

    protected int|array $columns = 1;

    /**
     * @return array<int, string|Widget|WidgetConfiguration>
     */
    public function getChildWidgets(): array
    {
        return $this->childWidgets;
    }

    public function getColumns(): int|array
    {
        return $this->columns;
    }

    public function getColumnsStyle(): string
    {
        $columns = $this->getColumns();

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

    public function getChildColumnSpan(string|Widget|WidgetConfiguration $child): int|string|array|null
    {
        if ($child instanceof WidgetConfiguration) {
            return $child->getColumnSpan()
                ?? (new ReflectionClass($child->getWidget()))->getDefaultProperties()['columnSpan']
                ?? null;
        }

        if ($child instanceof Widget) {
            return $child->getColumnSpan();
        }

        return (new ReflectionClass($child))->getDefaultProperties()['columnSpan'] ?? null;
    }

    public function isChildColumnSpanFull(string|Widget|WidgetConfiguration $child): bool
    {
        $span = $this->getChildColumnSpan($child);

        if ($span === 'full') {
            return true;
        }

        if (is_array($span)) {
            foreach ($span as $value) {
                if ($value !== 'full') {
                    return false;
                }
            }

            return true;
        }

        return false;
    }

    public function getChildGridItemStyle(string|Widget|WidgetConfiguration $child): string
    {
        $span = $this->getChildColumnSpan($child);

        if ($span === null || $span === 'full') {
            return '';
        }

        if (is_array($span)) {
            $columns = $this->getColumns();
            $styles = [];

            foreach ($span as $breakpoint => $value) {
                if ($value === 'full') {
                    $value = $this->resolveColumnsForBreakpoint($columns, $breakpoint);
                }

                $suffix = $breakpoint === 'default' ? '' : "-{$breakpoint}";
                $styles[] = "--col-span{$suffix}: {$value}";
            }

            return implode('; ', $styles);
        }

        return "--col-span: {$span}";
    }

    protected function resolveColumnsForBreakpoint(int|array $columns, string $breakpoint): int
    {
        if (is_int($columns)) {
            return $columns;
        }

        $breakpointOrder = ['default', 'sm', 'md', 'lg', 'xl', '2xl'];
        $currentIdx = array_search($breakpoint, $breakpointOrder, true);

        if ($currentIdx === false) {
            $currentIdx = 0;
        }

        for ($i = $currentIdx; $i >= 0; $i--) {
            $bp = $breakpointOrder[$i];
            if (isset($columns[$bp])) {
                return (int) $columns[$bp];
            }
        }

        return 1;
    }

    protected function render(): string
    {
        return 'primix-widgets::group-widget';
    }
}
