<?php

namespace Primix\Actions\Commands;

use Illuminate\Console\GeneratorCommand;
use Illuminate\Support\Str;

class MakeActionCommand extends GeneratorCommand
{
    protected $signature = 'make:primix-action {name : Action name} {--bulk : Generate a bulk action}';

    protected $description = 'Create a new Primix action class';

    protected $type = 'Action';

    protected function getStub(): string
    {
        if ($this->option('bulk')) {
            return __DIR__ . '/../../stubs/bulk-action.stub';
        }

        return __DIR__ . '/../../stubs/action.stub';
    }

    protected function getDefaultNamespace($rootNamespace): string
    {
        return $rootNamespace . '\\Primix\\Actions';
    }

    protected function getNameInput(): string
    {
        return $this->getActionClassName();
    }

    protected function buildClass($name): string
    {
        $stub = parent::buildClass($name);

        return str_replace(
            ['{{ defaultName }}', '{{ label }}'],
            [$this->getDefaultActionName(), $this->getActionLabel()],
            $stub,
        );
    }

    protected function getActionClassName(): string
    {
        $className = Str::studly((string) $this->argument('name'));

        if (! Str::endsWith($className, 'Action')) {
            $className .= 'Action';
        }

        return $className;
    }

    protected function getDefaultActionName(): string
    {
        return Str::camel(Str::beforeLast($this->getActionClassName(), 'Action'));
    }

    protected function getActionLabel(): string
    {
        return Str::of(Str::beforeLast($this->getActionClassName(), 'Action'))
            ->headline()
            ->toString();
    }

    protected function rootNamespace(): string
    {
        if (method_exists($this->laravel, 'getNamespace')) {
            return $this->laravel->getNamespace();
        }

        return 'App\\';
    }
}
