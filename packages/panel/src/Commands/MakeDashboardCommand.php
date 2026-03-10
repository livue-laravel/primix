<?php

namespace Primix\Commands;

use Illuminate\Console\GeneratorCommand;
use Illuminate\Support\Str;

class MakeDashboardCommand extends GeneratorCommand
{
    protected $signature = 'make:primix-dashboard {name=Dashboard : Dashboard class name}';

    protected $description = 'Create a new Primix dashboard page class';

    protected $type = 'Dashboard';

    protected $aliases = ['primix:dashboard'];

    protected function getStub(): string
    {
        return __DIR__ . '/../../stubs/dashboard.stub';
    }

    protected function getDefaultNamespace($rootNamespace): string
    {
        return $rootNamespace . '\\Primix\\Pages';
    }

    protected function getNameInput(): string
    {
        return $this->getDashboardClassName();
    }

    protected function buildClass($name): string
    {
        $stub = parent::buildClass($name);

        return str_replace(
            ['{{ title }}'],
            [$this->getDashboardTitle()],
            $stub,
        );
    }

    protected function getDashboardClassName(): string
    {
        $className = Str::studly((string) $this->argument('name'));

        if (! Str::endsWith($className, 'Dashboard')) {
            $className .= 'Dashboard';
        }

        return $className;
    }

    protected function getDashboardTitle(): string
    {
        $title = Str::of($this->getDashboardClassName())
            ->beforeLast('Dashboard')
            ->headline()
            ->trim()
            ->toString();

        return $title === '' ? 'Dashboard' : $title . ' Dashboard';
    }
}
