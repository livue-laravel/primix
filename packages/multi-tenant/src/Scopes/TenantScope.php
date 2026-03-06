<?php

namespace Primix\MultiTenant\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
use Primix\MultiTenant\Facades\Tenancy;

class TenantScope implements Scope
{
    public function apply(Builder $builder, Model $model): void
    {
        if (! Tenancy::initialized()) {
            return;
        }

        $column = config('multi-tenant.tenant_column', 'tenant_id');

        $builder->where(
            $model->qualifyColumn($column),
            Tenancy::tenant()->getTenantKey(),
        );
    }

    public function extend(Builder $builder): void
    {
        $builder->macro('withoutTenancy', function (Builder $builder) {
            return $builder->withoutGlobalScope($this);
        });
    }
}
