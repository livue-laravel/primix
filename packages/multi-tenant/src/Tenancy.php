<?php

namespace Primix\MultiTenant;

use Primix\MultiTenant\Contracts\TenancyManagerContract;
use Primix\MultiTenant\Contracts\TenantBootstrapper;
use Primix\MultiTenant\Contracts\TenantContract;
use Primix\MultiTenant\Events\Tenancy\EndingTenancy;
use Primix\MultiTenant\Events\Tenancy\InitializingTenancy;
use Primix\MultiTenant\Events\Tenancy\TenancyBootstrapped;
use Primix\MultiTenant\Events\Tenancy\TenancyEnded;
use Primix\MultiTenant\Events\Tenancy\TenancyInitialized;

class Tenancy implements TenancyManagerContract
{
    protected ?TenantContract $tenant = null;

    protected bool $initialized = false;

    public function initialize(TenantContract $tenant): void
    {
        if ($this->initialized) {
            $this->end();
        }

        InitializingTenancy::dispatch($tenant);

        $this->tenant = $tenant;
        $this->initialized = true;

        TenancyInitialized::dispatch($tenant);

        $this->bootstrap($tenant);

        TenancyBootstrapped::dispatch($tenant);
    }

    public function end(): void
    {
        if (! $this->initialized) {
            return;
        }

        EndingTenancy::dispatch($this->tenant);

        $this->revertBootstrappers();

        $this->tenant = null;
        $this->initialized = false;

        TenancyEnded::dispatch();
    }

    public function initialized(): bool
    {
        return $this->initialized;
    }

    public function tenant(): ?TenantContract
    {
        return $this->tenant;
    }

    public function runForMultiple(iterable $tenants, callable $callback): void
    {
        $previousTenant = $this->tenant;

        foreach ($tenants as $tenant) {
            $this->initialize($tenant);

            $callback($tenant);

            $this->end();
        }

        if ($previousTenant) {
            $this->initialize($previousTenant);
        }
    }

    protected function bootstrap(TenantContract $tenant): void
    {
        foreach ($this->getBootstrappers() as $bootstrapper) {
            $bootstrapper->bootstrap($tenant);
        }
    }

    protected function revertBootstrappers(): void
    {
        foreach (array_reverse($this->getBootstrappers()) as $bootstrapper) {
            $bootstrapper->revert();
        }
    }

    /**
     * @return TenantBootstrapper[]
     */
    protected function getBootstrappers(): array
    {
        return array_map(
            fn (string $class) => app($class),
            config('multi-tenant.bootstrappers', []),
        );
    }
}
