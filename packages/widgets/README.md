# Primix Widgets

`primix/widgets` is an official package in the Primix ecosystem.
It is part of the Primix framework and lets you build dashboard widgets for KPIs, charts, and high-level data views.

## What it is for

- Show key metrics in cards, charts, meter groups, and progress widgets.
- Reuse dashboard components across panels and pages.
- Build an admin home focused on monitoring and quick decisions.

## Installation

Recommended for full Primix projects:

```bash
composer require primix/primix
```

Standalone module installation:

```bash
composer require primix/widgets
```

## Quick example

```php
use Primix\Widgets\Stat;
use Primix\Widgets\StatsOverviewWidget;

class RevenueStatsWidget extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('MRR', '12,540 EUR'),
        ];
    }
}
```
