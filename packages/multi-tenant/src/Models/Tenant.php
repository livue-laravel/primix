<?php

namespace Primix\MultiTenant\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Primix\MultiTenant\Concerns\HasDataColumn;
use Primix\MultiTenant\Concerns\UsesCentralConnection;
use Primix\MultiTenant\Contracts\TenantContract;
use Primix\MultiTenant\Events\Tenant\CreatingTenant;
use Primix\MultiTenant\Events\Tenant\DeletingTenant;
use Primix\MultiTenant\Events\Tenant\TenantCreated;
use Primix\MultiTenant\Events\Tenant\TenantDeleted;
use Primix\MultiTenant\Events\Tenant\TenantUpdated;
use Primix\MultiTenant\Events\Tenant\UpdatingTenant;
use Primix\MultiTenant\Facades\Tenancy;

class Tenant extends Model implements TenantContract
{
    use HasDataColumn, UsesCentralConnection;

    protected $guarded = [];

    public function getTable()
    {
        return config('multi-tenant.tenant_table', 'tenants');
    }

    protected $dispatchesEvents = [
        'creating' => CreatingTenant::class,
        'created' => TenantCreated::class,
        'updating' => UpdatingTenant::class,
        'updated' => TenantUpdated::class,
        'deleting' => DeletingTenant::class,
        'deleted' => TenantDeleted::class,
    ];

    public function domains(): HasMany
    {
        return $this->hasMany(config('multi-tenant.domain_model', Domain::class));
    }

    public function getTenantKey(): string|int
    {
        return $this->getKey();
    }

    public function getTenantKeyName(): string
    {
        return $this->getKeyName();
    }

    public function run(callable $callback): mixed
    {
        $previousTenant = Tenancy::tenant();

        Tenancy::initialize($this);

        try {
            return $callback($this);
        } finally {
            Tenancy::end();

            if ($previousTenant) {
                Tenancy::initialize($previousTenant);
            }
        }
    }
}
