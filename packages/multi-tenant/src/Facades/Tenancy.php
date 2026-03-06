<?php

namespace Primix\MultiTenant\Facades;

use Illuminate\Support\Facades\Facade;
use Primix\MultiTenant\Contracts\TenancyManagerContract;
use Primix\MultiTenant\Contracts\TenantContract;

/**
 * @method static void initialize(TenantContract $tenant)
 * @method static void end()
 * @method static bool initialized()
 * @method static TenantContract|null tenant()
 * @method static void runForMultiple(iterable $tenants, callable $callback)
 *
 * @see \Primix\MultiTenant\Tenancy
 */
class Tenancy extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return TenancyManagerContract::class;
    }
}
