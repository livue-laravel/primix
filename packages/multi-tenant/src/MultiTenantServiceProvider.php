<?php

namespace Primix\MultiTenant;

use Illuminate\Support\ServiceProvider;
use Primix\MultiTenant\Commands\MakeTenantCommand;
use Primix\MultiTenant\Commands\TenantListCommand;
use Primix\MultiTenant\Commands\TenantMigrateCommand;
use Primix\MultiTenant\Commands\TenantRollbackCommand;
use Primix\MultiTenant\Commands\TenantRunCommand;
use Primix\MultiTenant\Commands\TenantSeedCommand;
use Primix\MultiTenant\Contracts\TenancyManagerContract;
use Primix\MultiTenant\Contracts\TenantDatabaseManager;
use Primix\MultiTenant\Database\Managers\MySQLDatabaseManager;
use Primix\MultiTenant\Database\Managers\PostgreSQLDatabaseManager;
use Primix\MultiTenant\Database\Managers\PostgreSQLSchemaManager;
use Primix\MultiTenant\Database\Managers\SQLiteDatabaseManager;

class MultiTenantServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->mergeConfigFrom(__DIR__ . '/../config/multi-tenant.php', 'multi-tenant');

        $this->app->singleton(TenancyManagerContract::class, Tenancy::class);

        $this->registerDatabaseManager();
        $this->registerBootstrappers();
    }

    public function boot(): void
    {
        $this->registerPublishing();
        $this->registerCommands();
        $this->registerEventListeners();
        $this->registerLiVueHook();
    }

    protected function registerDatabaseManager(): void
    {
        $this->app->singleton(TenantDatabaseManager::class, function () {
            $strategy = config('multi-tenant.database.strategy', 'single');
            $driver = config("database.connections." . config('multi-tenant.database.central_connection') . ".driver");

            if ($strategy === 'schema') {
                return new PostgreSQLSchemaManager();
            }

            return match ($driver) {
                'mysql', 'mariadb' => new MySQLDatabaseManager(),
                'pgsql' => new PostgreSQLDatabaseManager(),
                'sqlite' => new SQLiteDatabaseManager(),
                default => new MySQLDatabaseManager(),
            };
        });
    }

    protected function registerBootstrappers(): void
    {
        $bootstrappers = config('multi-tenant.bootstrappers', []);

        foreach ($bootstrappers as $bootstrapper) {
            $this->app->singleton($bootstrapper);
        }
    }

    protected function registerPublishing(): void
    {
        if (! $this->app->runningInConsole()) {
            return;
        }

        $this->publishes([
            __DIR__ . '/../config/multi-tenant.php' => config_path('multi-tenant.php'),
        ], 'multi-tenant-config');

        $this->publishes([
            __DIR__ . '/../database/migrations' => database_path('migrations'),
        ], 'multi-tenant-migrations');
    }

    protected function registerCommands(): void
    {
        if (! $this->app->runningInConsole()) {
            return;
        }

        $this->commands([
            TenantMigrateCommand::class,
            TenantRollbackCommand::class,
            TenantSeedCommand::class,
            TenantListCommand::class,
            TenantRunCommand::class,
            MakeTenantCommand::class,
        ]);
    }

    protected function registerLiVueHook(): void
    {
        if (! class_exists(\LiVue\Features\SupportHooks\HookRegistry::class)) {
            return;
        }

        $registry = $this->app->make(\LiVue\Features\SupportHooks\HookRegistry::class);
        $registry->register(Hooks\SupportTenancy::class);
    }

    protected function registerEventListeners(): void
    {
        $events = config('multi-tenant.events', []);

        foreach ($events as $event => $jobs) {
            if (empty($jobs)) {
                continue;
            }

            $this->app['events']->listen($event, function ($eventInstance) use ($jobs) {
                foreach ($jobs as $jobClass) {
                    $job = new $jobClass($eventInstance->tenant);
                    dispatch_sync($job);
                }
            });
        }
    }
}
