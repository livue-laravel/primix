<?php

namespace Primix\MultiTenant\Middleware;

use Primix\MultiTenant\Contracts\TenantResolver;
use Primix\MultiTenant\Resolvers\DomainTenantResolver;

class InitializeTenancyByDomain extends IdentificationMiddleware
{
    protected function getResolver(): TenantResolver
    {
        return app(DomainTenantResolver::class);
    }
}
