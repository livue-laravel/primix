<?php

namespace Primix\MultiTenant\Resolvers;

use Illuminate\Http\Request;
use Primix\MultiTenant\Contracts\TenantContract;
use Primix\MultiTenant\Contracts\TenantResolver;

class RequestDataTenantResolver implements TenantResolver
{
    public function resolve(Request $request): ?TenantContract
    {
        $headerName = config('multi-tenant.identification.header_name', 'X-Tenant-ID');
        $queryParameter = config('multi-tenant.identification.query_parameter', 'tenant_id');

        $tenantKey = $request->header($headerName) ?? $request->query($queryParameter);

        if ($tenantKey === null) {
            return null;
        }

        $tenantModel = config('multi-tenant.tenant_model');

        return $tenantModel::where(
            (new $tenantModel)->getTenantKeyName(),
            $tenantKey,
        )->first();
    }
}
