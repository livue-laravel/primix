<?php

namespace Primix\MultiTenant\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Primix\MultiTenant\Concerns\UsesCentralConnection;
use Primix\MultiTenant\Contracts\DomainContract;

class Domain extends Model implements DomainContract
{
    use UsesCentralConnection;

    protected $guarded = [];

    public function getTable()
    {
        return config('multi-tenant.domain_table', 'domains');
    }

    public function tenant(): BelongsTo
    {
        return $this->belongsTo(config('multi-tenant.tenant_model', Tenant::class));
    }
}
