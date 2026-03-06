<?php

namespace Primix\MultiTenant\Middleware;

use Primix\MultiTenant\Contracts\TenantResolver;
use Primix\MultiTenant\Resolvers\RequestDataTenantResolver;

class InitializeTenancyByRequestData extends IdentificationMiddleware
{
    protected function getResolver(): TenantResolver
    {
        return app(RequestDataTenantResolver::class);
    }
}
