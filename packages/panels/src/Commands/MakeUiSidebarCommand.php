<?php

namespace Primix\Commands;

use Illuminate\Console\GeneratorCommand;
use Illuminate\Support\Str;

class MakeUiSidebarCommand extends GeneratorCommand
{
    protected $signature = 'primix:ui:sidebar {name : Sidebar class name}';

    protected $description = 'Create a detached Primix sidebar class and Blade view';

    protected $type = 'Sidebar';

    protected $aliases = ['make:primix-ui-sidebar'];

    protected function getStub(): string
    {
        return __DIR__ . '/../../stubs/ui-sidebar.stub';
    }

    protected function getDefaultNamespace($rootNamespace): string
    {
        return $rootNamespace . '\\Primix\\UI';
    }

    protected function getNameInput(): string
    {
        $className = Str::studly((string) $this->argument('name'));

        if (! Str::endsWith($className, 'Sidebar')) {
            $className .= 'Sidebar';
        }

        return $className;
    }

    protected function buildClass($name): string
    {
        $stub = parent::buildClass($name);

        return str_replace(
            ['{{ sidebarView }}'],
            [$this->getSidebarViewName()],
            $stub
        );
    }

    public function handle(): bool|null
    {
        $result = parent::handle();

        if ($result === false) {
            return false;
        }

        $viewPath = $this->getSidebarViewPath();

        if ($this->files->exists($viewPath) && ! $this->option('force')) {
            $this->components->error("View already exists: {$viewPath}");

            return false;
        }

        $this->makeDirectory($viewPath);

        $viewStub = $this->files->get(__DIR__ . '/../../stubs/ui-sidebar-view.stub');
        $this->files->put($viewPath, str_replace(
            ['{{ sidebarTitle }}'],
            [$this->getSidebarTitle()],
            $viewStub
        ));

        $this->components->info("Sidebar view created successfully: {$viewPath}");

        return $result;
    }

    protected function getSidebarViewName(): string
    {
        return 'primix.ui.' . $this->getSidebarViewSlug();
    }

    protected function getSidebarViewPath(): string
    {
        return resource_path('views/primix/ui/' . $this->getSidebarViewSlug() . '.blade.php');
    }

    protected function getSidebarViewSlug(): string
    {
        return Str::kebab($this->getNameInput());
    }

    protected function getSidebarTitle(): string
    {
        return Str::headline(Str::beforeLast($this->getNameInput(), 'Sidebar'));
    }
}

