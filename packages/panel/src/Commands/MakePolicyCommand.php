<?php

namespace Primix\Commands;

use Illuminate\Console\GeneratorCommand;
use Illuminate\Support\Str;

class MakePolicyCommand extends GeneratorCommand
{
    protected $signature = 'make:primix-policy
                            {name : Policy name}
                            {--model= : Model class (FQCN or basename)}';

    protected $description = 'Create a new Primix-ready policy class';

    protected $type = 'Policy';

    protected function getStub(): string
    {
        return __DIR__ . '/../../stubs/policy.stub';
    }

    protected function getDefaultNamespace($rootNamespace): string
    {
        return $rootNamespace . '\\Policies';
    }

    protected function getNameInput(): string
    {
        return $this->getPolicyClassName();
    }

    protected function buildClass($name): string
    {
        $stub = parent::buildClass($name);

        $modelClass = $this->resolveModelClass();
        $userClass = $this->resolveUserModelClass();

        return str_replace(
            ['{{ modelNamespace }}', '{{ modelClass }}', '{{ userNamespace }}', '{{ userClass }}'],
            [$modelClass, class_basename($modelClass), $userClass, class_basename($userClass)],
            $stub,
        );
    }

    protected function getPolicyClassName(): string
    {
        $className = Str::studly((string) $this->argument('name'));

        if (! Str::endsWith($className, 'Policy')) {
            $className .= 'Policy';
        }

        return $className;
    }

    protected function resolveModelClass(): string
    {
        $model = $this->option('model');

        if (is_string($model) && trim($model) !== '') {
            $model = trim($model);

            if (str_contains($model, '\\')) {
                return ltrim($model, '\\');
            }

            return $this->rootNamespace() . 'Models\\' . Str::studly($model);
        }

        $base = Str::beforeLast($this->getPolicyClassName(), 'Policy');

        if ($base === '') {
            $base = 'Model';
        }

        return $this->rootNamespace() . 'Models\\' . $base;
    }

    protected function resolveUserModelClass(): string
    {
        $configured = config('auth.providers.users.model');

        if (is_string($configured) && trim($configured) !== '') {
            return ltrim($configured, '\\');
        }

        return $this->rootNamespace() . 'Models\\User';
    }
}
