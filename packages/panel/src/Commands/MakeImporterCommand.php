<?php

namespace Primix\Commands;

use Illuminate\Console\GeneratorCommand;
use Illuminate\Support\Str;

class MakeImporterCommand extends GeneratorCommand
{
    protected $signature = 'make:primix-importer {name} {--model=}';

    protected $description = 'Create a new Primix importer class';

    protected $type = 'Importer';

    protected function getStub(): string
    {
        return __DIR__ . '/../../stubs/importer.stub';
    }

    protected function getDefaultNamespace($rootNamespace): string
    {
        return $rootNamespace . '\\Primix\\Imports';
    }

    protected function buildClass($name): string
    {
        $stub = parent::buildClass($name);

        $model = $this->option('model') ?? Str::beforeLast(class_basename($name), 'Importer');

        $stub = str_replace('{{ modelNamespace }}', $this->rootNamespace() . 'Models\\' . $model, $stub);

        return $stub;
    }
}
