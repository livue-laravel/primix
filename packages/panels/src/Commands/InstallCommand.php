<?php

namespace Primix\Commands;

use Illuminate\Console\Command;

class InstallCommand extends Command
{
    protected $signature = 'primix:install
                            {--panel= : Panel name (default: Admin)}
                            {--id= : Explicit panel ID}
                            {--path= : Panel path segment}
                            {--tenant : Generate a tenant-aware panel provider}';

    protected $description = 'Install Primix and create the initial panel provider';

    protected $aliases = ['make:primix-install'];

    public function handle(): int
    {
        $panelName = $this->option('panel') ?? $this->ask('Panel name', 'Admin');

        $this->components->info('Installing Primix...');

        $panelArgs = ['name' => [$panelName]];

        if ($this->option('id')) {
            $panelArgs['--id'] = $this->option('id');
        }

        if ($this->option('path')) {
            $panelArgs['--path'] = $this->option('path');
        }

        if ($this->option('tenant')) {
            $panelArgs['--tenant'] = true;
        }

        $result = $this->call('make:primix-panel', $panelArgs);

        if ($result !== self::SUCCESS) {
            return self::FAILURE;
        }

        $this->newLine();
        $this->components->info('Primix installed successfully.');
        $this->components->bulletList([
            'Run <comment>php artisan vendor:publish --tag=laravel-assets</comment> to publish assets.',
            'Run <comment>php artisan migrate</comment> to run the migrations.',
            'Run <comment>php artisan primix:user</comment> to create your first admin user.',
        ]);

        return self::SUCCESS;
    }
}
