<?php

use Primix\MultiTenant\Events\Tenant\TenantCreated;
use Primix\MultiTenant\Events\Tenant\TenantDeleted;
use Primix\MultiTenant\Middleware\InitializeTenancyByPath;

return [

    /*
    |--------------------------------------------------------------------------
    | Tenant Model
    |--------------------------------------------------------------------------
    |
    | The model class used to represent tenants. Must implement TenantContract.
    |
    */
    'tenant_model' => \Primix\MultiTenant\Models\Tenant::class,

    /*
    |--------------------------------------------------------------------------
    | Domain Model
    |--------------------------------------------------------------------------
    |
    | The model class used to represent tenant domains. Must implement DomainContract.
    |
    */
    'domain_model' => \Primix\MultiTenant\Models\Domain::class,

    /*
    |--------------------------------------------------------------------------
    | Table Names
    |--------------------------------------------------------------------------
    */
    'tenant_table' => 'tenants',
    'domain_table' => 'domains',

    /*
    |--------------------------------------------------------------------------
    | Central Domains
    |--------------------------------------------------------------------------
    |
    | Domains that should be considered "central" (not tenant-specific).
    | Used by SubdomainTenantResolver and PreventAccessFromCentralDomains.
    |
    */
    'central_domains' => ['localhost'],

    /*
    |--------------------------------------------------------------------------
    | Tenant Column
    |--------------------------------------------------------------------------
    |
    | The foreign key column name used by BelongsToTenant trait (single-DB strategy).
    |
    */
    'tenant_column' => 'tenant_id',

    /*
    |--------------------------------------------------------------------------
    | Identification
    |--------------------------------------------------------------------------
    |
    | How tenants are identified from incoming requests.
    |
    */
    'identification' => [
        'default' => 'domain',
        'path_parameter' => 'tenant',
        'header_name' => 'X-Tenant-ID',
        'query_parameter' => 'tenant_id',
    ],

    /*
    |--------------------------------------------------------------------------
    | Database
    |--------------------------------------------------------------------------
    |
    | Database strategy configuration for multi-tenancy.
    |
    | Strategies:
    | - "single": All tenants share one database, scoped by tenant_id column
    | - "multi": Each tenant gets a separate database
    | - "schema": Each tenant gets a separate PostgreSQL schema
    |
    */
    'database' => [
        'strategy' => env('TENANT_DB_STRATEGY', 'single'),
        'central_connection' => env('DB_CONNECTION', 'mysql'),
        'template_connection' => 'tenant',
        'tenant_connection' => 'tenant',
        'prefix' => 'tenant_',
        'suffix' => '',
    ],

    /*
    |--------------------------------------------------------------------------
    | Bootstrappers
    |--------------------------------------------------------------------------
    |
    | Bootstrappers are executed when a tenant is initialized and reverted
    | when tenancy ends. Uncomment the ones you need.
    |
    */
    'bootstrappers' => [
        // \Primix\MultiTenant\Bootstrappers\DatabaseTenancyBootstrapper::class,
        // \Primix\MultiTenant\Bootstrappers\CacheTenancyBootstrapper::class,
        // \Primix\MultiTenant\Bootstrappers\FilesystemTenancyBootstrapper::class,
        // \Primix\MultiTenant\Bootstrappers\QueueTenancyBootstrapper::class,
    ],

    /*
    |--------------------------------------------------------------------------
    | Tenant Migrations
    |--------------------------------------------------------------------------
    |
    | Path where tenant-specific migrations are stored.
    |
    */
    'migration_path' => database_path('migrations/tenant'),

    /*
    |--------------------------------------------------------------------------
    | Tenant Seeder
    |--------------------------------------------------------------------------
    |
    | The seeder class to run when seeding a tenant database.
    |
    */
    'seeder' => 'Database\\Seeders\\TenantDatabaseSeeder',

    /*
    |--------------------------------------------------------------------------
    | Event Listeners
    |--------------------------------------------------------------------------
    |
    | Jobs to dispatch in response to tenant lifecycle events.
    | Each event maps to an array of job classes that will be dispatched
    | synchronously in order.
    |
    */
    'events' => [
        TenantCreated::class => [
            // \Primix\MultiTenant\Jobs\CreateDatabase::class,
            // \Primix\MultiTenant\Jobs\MigrateDatabase::class,
            // \Primix\MultiTenant\Jobs\SeedDatabase::class,
        ],
        TenantDeleted::class => [
            // \Primix\MultiTenant\Jobs\DeleteDatabase::class,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Panel Integration
    |--------------------------------------------------------------------------
    |
    | Configuration for Panel integration (requires primix/primix package).
    |
    */
    'panel' => [
        'middleware' => InitializeTenancyByPath::class,
        'route_parameter' => 'tenant',
    ],

];
