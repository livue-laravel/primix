<?php

namespace Primix\Commands;

use Illuminate\Console\GeneratorCommand;
use Illuminate\Support\Str;
use Symfony\Component\Console\Input\InputOption;

class MakeResourceCommand extends GeneratorCommand
{
    protected $signature = 'make:primix-resource {name* : Resource name (e.g. Post, PostResource, post-resource, Product Variant)} {--M|model : Also create the related model} {--simple}';

    protected $description = 'Create a new Primix resource class';

    protected $type = 'Resource';

    protected $aliases = ['primix:resource'];

    protected function getStub(): string
    {
        return __DIR__ . '/../../stubs/resource.stub';
    }

    protected function getDefaultNamespace($rootNamespace): string
    {
        return $rootNamespace . '\\Primix\\Resources';
    }

    protected function buildClass($name): string
    {
        $stub = parent::buildClass($name);

        $model = $this->getModelName();
        $modelPlural = Str::plural($model);

        $stub = str_replace('{{ model }}', $model, $stub);
        $stub = str_replace('{{ modelNamespace }}', $this->rootNamespace() . 'Models\\' . $model, $stub);
        $stub = str_replace('{{ listPage }}', "List{$modelPlural}", $stub);
        $stub = str_replace('{{ createPage }}', "Create{$model}", $stub);
        $stub = str_replace('{{ editPage }}', "Edit{$model}", $stub);
        $stub = str_replace('{{ viewPage }}', "View{$model}", $stub);

        return $stub;
    }

    public function handle(): ?bool
    {
        if ($this->option('generate')) {
            $this->components->warn('The --generate option is deprecated. Use --model / -M instead.');
        }

        $result = parent::handle();

        if ($this->option('model') || $this->option('generate')) {
            $this->call('make:model', [
                'name' => $this->getModelName(),
                '-m' => true,
            ]);

            $this->convertGeneratedModelToPrimixBase();
        }

        if (! $this->option('simple')) {
            $this->generateResourcePages();
        }

        $this->generateFormAndTableClasses();

        return $result;
    }

    protected function convertGeneratedModelToPrimixBase(): void
    {
        $modelPath = app_path('Models/' . $this->getModelName() . '.php');

        if (! $this->files->exists($modelPath)) {
            return;
        }

        $contents = $this->files->get($modelPath);

        if (! str_contains($contents, 'use Illuminate\\Database\\Eloquent\\Model;')) {
            return;
        }

        if (! preg_match('/class\s+\w+\s+extends\s+Model\b/', $contents)) {
            return;
        }

        $contents = str_replace(
            'use Illuminate\\Database\\Eloquent\\Model;',
            'use Primix\\Support\\Models\\Model as PrimixModel;',
            $contents
        );

        $contents = preg_replace('/extends\s+Model\b/', 'extends PrimixModel', $contents, 1) ?? $contents;

        $this->files->put($modelPath, $contents);
    }

    protected function generateFormAndTableClasses(): void
    {
        $name = $this->getResourceClassName();
        $model = $this->getModelName();

        $resourceNamespace = $this->getDefaultNamespace($this->rootNamespace()) . '\\' . $name;

        $classes = [
            ["{$model}Form", 'resource-form.stub', $resourceNamespace . '\\Forms', 'Form'],
            ["{$model}Details", 'resource-details.stub', $resourceNamespace . '\\Details', 'Details'],
            ["{$model}Table", 'resource-table.stub', $resourceNamespace . '\\Tables', 'Table'],
        ];

        foreach ($classes as [$className, $stubFile, $namespace, $type]) {
            $stubPath = __DIR__ . '/../../stubs/' . $stubFile;
            $stub = $this->files->get($stubPath);

            $stub = str_replace('{{ namespace }}', $namespace, $stub);
            $stub = str_replace('{{ class }}', $className, $stub);

            $path = $this->getPath($namespace . '\\' . $className);

            $this->makeDirectory($path);
            $this->files->put($path, $stub);

            $this->components->info(sprintf('%s [%s] created successfully.', $type, $path));
        }
    }

    protected function generateResourcePages(): void
    {
        $name = $this->getResourceClassName();
        $model = $this->getModelName();
        $modelPlural = Str::plural($model);

        $resourceNamespace = $this->getDefaultNamespace($this->rootNamespace()) . '\\' . $name;
        $pagesNamespace = $resourceNamespace . '\\Pages';

        $pages = [
            "List{$modelPlural}" => 'resource-page-list.stub',
            "Create{$model}" => 'resource-page-create.stub',
            "Edit{$model}" => 'resource-page-edit.stub',
            "View{$model}" => 'resource-page-view.stub',
        ];

        foreach ($pages as $className => $stubFile) {
            $stubPath = __DIR__ . '/../../stubs/' . $stubFile;
            $stub = $this->files->get($stubPath);

            $stub = str_replace('{{ namespace }}', $pagesNamespace, $stub);
            $stub = str_replace('{{ class }}', $className, $stub);
            $stub = str_replace('{{ resourceNamespace }}', $resourceNamespace, $stub);
            $stub = str_replace('{{ resource }}', $name, $stub);

            $path = $this->getPath($pagesNamespace . '\\' . $className);

            $this->makeDirectory($path);
            $this->files->put($path, $stub);

            $this->components->info(sprintf('Page [%s] created successfully.', $path));
        }
    }

    protected function getNameInput(): string
    {
        return $this->getResourceClassName();
    }

    protected function getResourceClassName(): string
    {
        return $this->getEntityBaseName() . 'Resource';
    }

    protected function getModelName(): string
    {
        return $this->getEntityBaseName();
    }

    protected function getEntityBaseName(): string
    {
        $nameArgument = $this->argument('name');
        $raw = is_array($nameArgument)
            ? implode(' ', $nameArgument)
            : (string) $nameArgument;

        $normalized = trim($raw);

        $normalized = str_replace(['-', '_'], ' ', $normalized);
        $normalized = preg_replace('/\s+/', ' ', $normalized) ?? $normalized;
        $normalized = Str::studly($normalized);

        if (Str::endsWith($normalized, 'Resource')) {
            $normalized = Str::beforeLast($normalized, 'Resource');
        }

        return $normalized;
    }

    protected function getOptions(): array
    {
        return array_merge(parent::getOptions(), [
            ['generate', null, InputOption::VALUE_NONE, 'Deprecated: Also create the related model and migration'],
        ]);
    }
}
