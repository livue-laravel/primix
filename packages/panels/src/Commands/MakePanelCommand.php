<?php

namespace Primix\Commands;

use Illuminate\Console\GeneratorCommand;
use Illuminate\Support\Str;

class MakePanelCommand extends GeneratorCommand
{
    protected $signature = 'make:primix-panel
                            {name* : Panel name (e.g. Admin, HR Panel)}
                            {--id= : Explicit panel ID (overrides provider-derived ID)}
                            {--path= : Panel path segment}
                            {--tenant : Generate a tenant-aware panel provider}
                            {--no-register : Do not auto-register provider in bootstrap/providers.php}';

    protected $description = 'Create a new Primix panel provider class';

    protected $type = 'Panel Provider';

    protected $aliases = ['primix:panel'];

    protected function getStub(): string
    {
        return __DIR__ . '/../../stubs/panel-provider.stub';
    }

    protected function getDefaultNamespace($rootNamespace): string
    {
        return $rootNamespace . '\\Providers';
    }

    public function handle(): ?bool
    {
        $result = parent::handle();

        if ($result === false) {
            return false;
        }

        if (! $this->option('no-register')) {
            $this->registerPanelProvider();
        }

        return $result;
    }

    protected function getNameInput(): string
    {
        return $this->getPanelProviderClassName();
    }

    protected function buildClass($name): string
    {
        $stub = parent::buildClass($name);

        $panelId = $this->getPanelId();
        $derivedPanelId = $this->getDerivedPanelId();
        $panelPath = $this->getPanelPath();

        $parentProviderImport = $this->option('tenant')
            ? 'use Primix\\MultiTenant\\Panel\\TenantPanelProvider;'
            : 'use Primix\\PanelProvider;';
        $parentProviderClass = $this->option('tenant') ? 'TenantPanelProvider' : 'PanelProvider';

        $getIdMethod = '';

        if ($panelId !== $derivedPanelId) {
            $getIdMethod = "    public function getId(): string\n"
                . "    {\n"
                . "        return '{$panelId}';\n"
                . "    }\n\n";
        }

        return str_replace(
            ['{{ parentProviderImport }}', '{{ parentProviderClass }}', '{{ getIdMethod }}', '{{ path }}'],
            [$parentProviderImport, $parentProviderClass, $getIdMethod, $panelPath],
            $stub,
        );
    }

    protected function getPanelProviderClassName(): string
    {
        return $this->getPanelBaseName() . 'PanelProvider';
    }

    protected function getPanelBaseName(): string
    {
        $nameArgument = $this->argument('name');
        $raw = is_array($nameArgument)
            ? implode(' ', $nameArgument)
            : (string) $nameArgument;

        $normalized = trim($raw);
        $normalized = str_replace(['-', '_'], ' ', $normalized);
        $normalized = preg_replace('/\s+/', ' ', $normalized) ?? $normalized;
        $normalized = Str::studly($normalized);

        if (Str::endsWith($normalized, 'PanelProvider')) {
            $normalized = Str::beforeLast($normalized, 'PanelProvider');
        } elseif (Str::endsWith($normalized, 'Panel')) {
            $normalized = Str::beforeLast($normalized, 'Panel');
        }

        return $normalized;
    }

    protected function getDerivedPanelId(): string
    {
        return Str::lower($this->getPanelBaseName());
    }

    protected function getPanelId(): string
    {
        $explicit = $this->option('id');

        if (is_string($explicit) && $explicit !== '') {
            return Str::of(trim($explicit))->lower()->toString();
        }

        return $this->getDerivedPanelId();
    }

    protected function getPanelPath(): string
    {
        $explicit = $this->option('path');

        if (is_string($explicit) && $explicit !== '') {
            return trim($explicit);
        }

        return Str::kebab($this->getPanelBaseName());
    }

    protected function registerPanelProvider(): void
    {
        $providersFile = base_path('bootstrap/providers.php');

        if (! $this->files->exists($providersFile)) {
            $this->components->warn('bootstrap/providers.php not found. Register the panel provider manually.');

            return;
        }

        $providerClass = $this->rootNamespace() . 'Providers\\' . $this->getPanelProviderClassName() . '::class';
        $contents = $this->files->get($providersFile);

        if (str_contains($contents, $providerClass)) {
            $this->components->info("Provider already registered: {$providerClass}");

            return;
        }

        $position = strrpos($contents, '];');

        if ($position === false) {
            $this->components->warn('Unable to auto-register provider. Add it manually to bootstrap/providers.php.');

            return;
        }

        $insertion = "    {$providerClass},\n";
        $updated = substr($contents, 0, $position) . $insertion . substr($contents, $position);

        $this->files->put($providersFile, $updated);

        $this->components->info("Provider registered in bootstrap/providers.php: {$providerClass}");
    }
}
