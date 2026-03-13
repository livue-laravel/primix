<?php

namespace Primix\Commands;

use Illuminate\Console\GeneratorCommand;
use Illuminate\Support\Str;
class MakeUiTopbarCommand extends GeneratorCommand
{
    protected $signature = 'primix:ui:topbar {name : Topbar class name}';

    protected $description = 'Create a detached Primix topbar class and Blade view';

    protected $type = 'Topbar';

    protected $aliases = ['make:primix-ui-topbar'];

    protected function getStub(): string
    {
        return __DIR__ . '/../../stubs/ui-topbar.stub';
    }

    protected function getDefaultNamespace($rootNamespace): string
    {
        return $rootNamespace . '\\Primix\\UI';
    }

    protected function getNameInput(): string
    {
        $className = Str::studly((string) $this->argument('name'));

        if (! Str::endsWith($className, 'Topbar')) {
            $className .= 'Topbar';
        }

        return $className;
    }

    protected function buildClass($name): string
    {
        $stub = parent::buildClass($name);

        return str_replace(
            ['{{ topbarView }}'],
            [$this->getTopbarViewName()],
            $stub
        );
    }

    public function handle(): bool|null
    {
        $result = parent::handle();

        if ($result === false) {
            return false;
        }

        $viewPath = $this->getTopbarViewPath();

        if ($this->files->exists($viewPath) && ! $this->option('force')) {
            $this->components->error("View already exists: {$viewPath}");

            return false;
        }

        $this->makeDirectory($viewPath);

        $viewStub = $this->files->get(__DIR__ . '/../../stubs/ui-topbar-view.stub');
        $this->files->put($viewPath, str_replace(
            ['{{ topbarTitle }}'],
            [$this->getTopbarTitle()],
            $viewStub
        ));

        $this->components->info("Topbar view created successfully: {$viewPath}");

        return $result;
    }

    protected function getTopbarViewName(): string
    {
        return 'primix.ui.' . $this->getTopbarViewSlug();
    }

    protected function getTopbarViewPath(): string
    {
        return resource_path('views/primix/ui/' . $this->getTopbarViewSlug() . '.blade.php');
    }

    protected function getTopbarViewSlug(): string
    {
        return Str::kebab($this->getNameInput());
    }

    protected function getTopbarTitle(): string
    {
        return Str::headline(Str::beforeLast($this->getNameInput(), 'Topbar'));
    }
}
