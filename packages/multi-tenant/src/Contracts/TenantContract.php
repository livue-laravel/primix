<?php

namespace Primix\MultiTenant\Contracts;

interface TenantContract
{
    /**
     * Get the tenant's unique key value.
     */
    public function getTenantKey(): string|int;

    /**
     * Get the name of the tenant key column.
     */
    public function getTenantKeyName(): string;

    /**
     * Get an internal attribute (stored in data JSON column).
     */
    public function getInternal(string $key): mixed;

    /**
     * Set an internal attribute (stored in data JSON column).
     */
    public function setInternal(string $key, mixed $value): static;

    /**
     * Run a callback within this tenant's context.
     */
    public function run(callable $callback): mixed;
}
