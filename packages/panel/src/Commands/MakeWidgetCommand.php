<?php

namespace Primix\Commands;

use Illuminate\Console\GeneratorCommand;

class MakeWidgetCommand extends GeneratorCommand
{
    protected $signature = 'make:primix-widget {name} {--table} {--chart} {--stats}';

    protected $description = 'Create a new Primix widget class';

    protected $type = 'Widget';

    protected function getStub(): string
    {
        if ($this->option('table')) {
            return __DIR__ . '/../../stubs/widget-table.stub';
        }

        if ($this->option('chart')) {
            return __DIR__ . '/../../stubs/widget-chart.stub';
        }

        if ($this->option('stats')) {
            return __DIR__ . '/../../stubs/widget-stats.stub';
        }

        return __DIR__ . '/../../stubs/widget.stub';
    }

    protected function getDefaultNamespace($rootNamespace): string
    {
        return $rootNamespace . '\\Primix\\Widgets';
    }
}
