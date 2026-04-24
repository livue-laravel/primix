<?php

namespace Primix\Widgets;

use Closure;

abstract class StatsOverviewWidget extends Widget
{
    protected int|array|Closure|null $columns = null;

    /**
     * @var array<int, string>|Closure|null
     */
    protected array|Closure|null $statCardSections = null;

    public function columns(int|array|Closure $columns): static
    {
        $this->columns = $columns;

        return $this;
    }

    public function statCardSections(array|Closure $sections): static
    {
        $this->statCardSections = $sections;

        return $this;
    }

    public function getColumns(): int|array
    {
        $columns = $this->columns !== null
            ? $this->evaluate($this->columns)
            : count($this->getStats());

        if (is_int($columns)) {
            return max($columns, 1);
        }

        if (is_array($columns) && $columns !== []) {
            return $columns;
        }

        return 1;
    }

    public function getGridStyle(): string
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

    /**
     * @return array<int, string>
     */
    public function getStatCardSections(): array
    {
        $sections = $this->statCardSections !== null
            ? $this->evaluate($this->statCardSections)
            : ['description', 'trend', 'chart'];

        if (! is_array($sections)) {
            return ['description', 'trend', 'chart'];
        }

        $normalized = collect($sections)
            ->filter(fn ($section): bool => is_string($section) && $section !== '')
            ->map(fn (string $section): string => match ($section) {
                'desc' => 'description',
                default => $section,
            })
            ->filter(fn (string $section): bool => in_array($section, ['description', 'trend', 'chart'], true))
            ->unique()
            ->values()
            ->all();

        return $normalized;
    }

    public function hasStatCardSection(string $section): bool
    {
        return in_array($section, $this->getStatCardSections(), true);
    }

    protected function getStats(): array
    {
        return [];
    }

    protected function render(): string
    {
        return 'primix-widgets::stats-overview';
    }
}
