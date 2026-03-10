<?php

namespace Primix\Commands;

use Illuminate\Console\GeneratorCommand;
use Illuminate\Support\Str;

class MakePluginCommand extends GeneratorCommand
{
    protected $signature = 'make:primix-plugin {name : Plugin name}';

    protected $description = 'Create a new Primix plugin class';

    protected $type = 'Plugin';

    protected function getStub(): string
    {
        return __DIR__ . '/../../stubs/plugin.stub';
    }

    protected function getDefaultNamespace($rootNamespace): string
    {
        return $rootNamespace . '\\Primix\\Plugins';
    }

    protected function getNameInput(): string
    {
        return $this->getPluginClassName();
    }

    protected function buildClass($name): string
    {
        $stub = parent::buildClass($name);

        return str_replace(
            ['{{ pluginId }}'],
            [$this->getPluginId()],
            $stub,
        );
    }

    protected function getPluginClassName(): string
    {
        $className = Str::studly((string) $this->argument('name'));

        if (! Str::endsWith($className, 'Plugin')) {
            $className .= 'Plugin';
        }

        return $className;
    }

    protected function getPluginId(): string
    {
        return Str::kebab(Str::beforeLast($this->getPluginClassName(), 'Plugin'));
    }
}
