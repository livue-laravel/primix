<?php

namespace Primix\MultiTenant\Bootstrappers;

use Illuminate\Cache\CacheManager;
use Illuminate\Support\Facades\Cache;
use Primix\MultiTenant\Contracts\TenantBootstrapper;
use Primix\MultiTenant\Contracts\TenantContract;

class CacheTenancyBootstrapper implements TenantBootstrapper
{
    protected ?string $originalPrefix = null;

    public function bootstrap(TenantContract $tenant): void
    {
        $this->originalPrefix = config('cache.prefix');

        $tenantPrefix = config('cache.prefix') . '_tenant_' . $tenant->getTenantKey();
        config(['cache.prefix' => $tenantPrefix]);

        app('cache')->forgetDriver(config('cache.default'));
    }

    public function revert(): void
    {
        if ($this->originalPrefix !== null) {
            config(['cache.prefix' => $this->originalPrefix]);
        }

        app('cache')->forgetDriver(config('cache.default'));

        $this->originalPrefix = null;
    }
}
