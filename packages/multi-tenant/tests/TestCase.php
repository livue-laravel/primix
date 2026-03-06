<?php

namespace Primix\MultiTenant\Tests;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\RefreshDatabaseState;
use Tests\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use RefreshDatabase;

    protected function beforeRefreshingDatabase(): void
    {
        // Force re-migration since we switch to a different database
        RefreshDatabaseState::$migrated = false;
        RefreshDatabaseState::$inMemoryConnections = [];

        config()->set('database.default', 'testing');
        config()->set('database.connections.testing', [
            'driver' => 'sqlite',
            'database' => ':memory:',
            'prefix' => '',
        ]);

        config()->set('database.connections.tenant', [
            'driver' => 'sqlite',
            'database' => ':memory:',
            'prefix' => '',
        ]);

        config()->set('multi-tenant.database.central_connection', 'testing');
        config()->set('multi-tenant.database.tenant_connection', 'tenant');
        config()->set('multi-tenant.database.strategy', 'single');
        config()->set('multi-tenant.central_domains', ['localhost', 'example.com']);
    }

    protected function migrateDatabases(): void
    {
        $this->artisan('migrate:fresh', array_merge($this->migrateFreshUsing(), [
            '--path' => [
                realpath(__DIR__ . '/../database/migrations'),
                realpath(__DIR__ . '/database/migrations'),
            ],
            '--realpath' => true,
        ]));
    }
}
