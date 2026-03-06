<?php

namespace Primix\MultiTenant\Contracts;

use Illuminate\Http\Request;

interface TenantResolver
{
    /**
     * Resolve a tenant from the incoming request.
     *
     * @return TenantContract|null The resolved tenant, or null if not found.
     */
    public function resolve(Request $request): ?TenantContract;
}
