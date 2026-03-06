<?php

namespace Primix\MultiTenant\Concerns;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;

trait HasTenantRelationship
{
    public function tenants(): BelongsToMany
    {
        return $this->belongsToMany(
            config('multi-tenant.tenant_model'),
            'tenant_user',
            'user_id',
            'tenant_id',
        );
    }
}
