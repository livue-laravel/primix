<?php

namespace Primix\MultiTenant\Resolvers;

use Illuminate\Http\Request;
use Primix\MultiTenant\Contracts\TenantContract;
use Primix\MultiTenant\Contracts\TenantResolver;

class DomainTenantResolver implements TenantResolver
{
    public function resolve(Request $request): ?TenantContract
    {
        $domainModel = config('multi-tenant.domain_model');

        $domain = $domainModel::where('domain', $request->getHost())->first();

        return $domain?->tenant;
    }
}
