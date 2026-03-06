<?php

namespace Primix\MultiTenant\Resolvers;

use Illuminate\Http\Request;
use Primix\MultiTenant\Contracts\TenantContract;
use Primix\MultiTenant\Contracts\TenantResolver;

class SubdomainTenantResolver implements TenantResolver
{
    public function resolve(Request $request): ?TenantContract
    {
        $host = $request->getHost();
        $centralDomains = config('multi-tenant.central_domains', []);

        foreach ($centralDomains as $centralDomain) {
            if (str_ends_with($host, $centralDomain)) {
                $subdomain = rtrim(str_replace($centralDomain, '', $host), '.');

                if (empty($subdomain)) {
                    return null;
                }

                $domainModel = config('multi-tenant.domain_model');

                return $domainModel::where('domain', $subdomain)
                    ->first()
                    ?->tenant;
            }
        }

        return null;
    }
}
