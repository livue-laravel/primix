<?php

namespace Primix\MultiTenant\Contracts;

interface TenantDatabaseManager
{
    /**
     * Create the database for the given tenant.
     */
    public function createDatabase(TenantContract $tenant): bool;

    /**
     * Delete the database for the given tenant.
     */
    public function deleteDatabase(TenantContract $tenant): bool;

    /**
     * Check if the database for the given tenant exists.
     */
    public function databaseExists(TenantContract $tenant): bool;

    /**
     * Get the connection configuration array for the given tenant.
     */
    public function makeConnectionConfig(TenantContract $tenant): array;
}
