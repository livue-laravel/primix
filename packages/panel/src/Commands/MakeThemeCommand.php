<?php

namespace Primix\Commands;

use Illuminate\Console\GeneratorCommand;

class MakeThemeCommand extends GeneratorCommand
{
    protected $signature = 'make:primix-theme {name}';

    protected $description = 'Create a new Primix theme class';

    protected $type = 'Theme';

    protected function getStub(): string
    {
        return __DIR__ . '/../../stubs/theme.stub';
    }

    protected function getDefaultNamespace($rootNamespace): string
    {
        return $rootNamespace . '\\Primix\\Themes';
    }
}
