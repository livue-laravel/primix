<?php

namespace Primix\Commands;

use Illuminate\Console\GeneratorCommand;

class MakePageCommand extends GeneratorCommand
{
    protected $signature = 'make:primix-page {name}';

    protected $description = 'Create a new Primix page class';

    protected $type = 'Page';

    protected function getStub(): string
    {
        return __DIR__ . '/../../stubs/page.stub';
    }

    protected function getDefaultNamespace($rootNamespace): string
    {
        return $rootNamespace . '\\Primix\\Pages';
    }
}
