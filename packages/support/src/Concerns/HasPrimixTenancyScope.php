<?php

namespace Primix\Support\Concerns;

use Illuminate\Database\Eloquent\Builder;

trait HasPrimixTenancyScope
{
    public static function bootHasPrimixTenancyScope(): void
    {
        if (! static::shouldRegisterPrimixTenantScope()) {
            return;
        }

        static::addGlobalScope('primix_tenant', function (Builder $builder): void {
            if (! static::shouldApplyPrimixTenantScope()) {
                return;
            }

            $tenancyFacade = 'Primix\\MultiTenant\\Facades\\Tenancy';
            $tenantKey = $tenancyFacade::tenant()?->getTenantKey();

            if ($tenantKey === null) {
                return;
            }

            $model = $builder->getModel();
            $column = $model->getPrimixTenantColumn();

            if (! $model->hasPrimixColumn($column)) {
                return;
            }

            $qualifiedColumn = $model->qualifyColumn($column);

            if (static::isPrimixTenantOptional()) {
                $builder->where(function ($query) use ($qualifiedColumn, $tenantKey): void {
                    $query
                        ->where($qualifiedColumn, $tenantKey)
                        ->orWhereNull($qualifiedColumn);
                });

                return;
            }

            $builder->where($qualifiedColumn, $tenantKey);
        });

        static::creating(function ($model): void {
            if (! static::shouldApplyPrimixTenantScope()) {
                return;
            }

            $tenancyFacade = 'Primix\\MultiTenant\\Facades\\Tenancy';
            $column = $model->getPrimixTenantColumn();

            if (! $model->hasPrimixColumn($column)) {
                return;
            }

            if (empty($model->{$column})) {
                $model->{$column} = $tenancyFacade::tenant()->getTenantKey();
            }
        });
    }

    public static function isPrimixTenantAware(): bool
    {
        return true;
    }

    public function getPrimixTenantColumn(): string
    {
        return config('multi-tenant.tenant_column', 'tenant_id');
    }

    public static function isPrimixTenantOptional(): bool
    {
        return false;
    }

    protected static function shouldRegisterPrimixTenantScope(): bool
    {
        $tenancyFacade = 'Primix\\MultiTenant\\Facades\\Tenancy';

        return static::isPrimixTenantAware()
            && class_exists($tenancyFacade);
    }

    protected static function shouldApplyPrimixTenantScope(): bool
    {
        $tenancyFacade = 'Primix\\MultiTenant\\Facades\\Tenancy';

        if (! class_exists($tenancyFacade)) {
            return false;
        }

        // In multi-database / multi-schema setups, isolation is already guaranteed by connection/schema.
        if (config('multi-tenant.database.strategy') !== 'single') {
            return false;
        }

        return static::isPrimixTenantAware() && $tenancyFacade::initialized();
    }
}
