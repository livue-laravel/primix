<?php

namespace Primix\MultiTenant\Concerns;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Primix\MultiTenant\Facades\Tenancy;
use Primix\MultiTenant\Scopes\TenantScope;

trait BelongsToTenant
{
    public static function bootBelongsToTenant(): void
    {
        static::addGlobalScope(new TenantScope());

        static::creating(function ($model) {
            if (Tenancy::initialized()) {
                $column = config('multi-tenant.tenant_column', 'tenant_id');
                if (empty($model->{$column})) {
                    $model->{$column} = Tenancy::tenant()->getTenantKey();
                }
            }
        });
    }

    public function tenant(): BelongsTo
    {
        return $this->belongsTo(
            config('multi-tenant.tenant_model'),
            config('multi-tenant.tenant_column', 'tenant_id'),
        );
    }
}
