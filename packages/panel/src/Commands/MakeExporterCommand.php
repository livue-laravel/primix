<?php

namespace Primix\Commands;

use Illuminate\Console\GeneratorCommand;
use Illuminate\Support\Str;

class MakeExporterCommand extends GeneratorCommand
{
    protected $signature = 'make:primix-exporter {name} {--model=}';

    protected $description = 'Create a new Primix exporter class';

    protected $type = 'Exporter';

    protected function getStub(): string
    {
        return __DIR__ . '/../../stubs/exporter.stub';
    }

    protected function getDefaultNamespace($rootNamespace): string
    {
        return $rootNamespace . '\\Primix\\Exports';
    }

    protected function buildClass($name): string
    {
        $stub = parent::buildClass($name);

        $model = $this->option('model') ?? Str::beforeLast(class_basename($name), 'Exporter');

        $stub = str_replace('{{ modelNamespace }}', $this->rootNamespace() . 'Models\\' . $model, $stub);

        return $stub;
    }
}
