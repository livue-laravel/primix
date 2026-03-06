<?php

namespace Primix\MultiTenant\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Primix\MultiTenant\Contracts\TenantResolver;
use Primix\MultiTenant\Facades\Tenancy;
use Primix\MultiTenant\Resolvers\PathTenantResolver;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class InitializeTenancyByPath extends IdentificationMiddleware
{
    protected function getResolver(): TenantResolver
    {
        return app(PathTenantResolver::class);
    }

    public function handle(Request $request, Closure $next): Response
    {
        $tenant = $this->getResolver()->resolve($request);

        if ($tenant === null) {
            throw new NotFoundHttpException('Tenant not found.');
        }

        Tenancy::initialize($tenant);

        // Set URL defaults so route() calls automatically include the tenant parameter
        $parameter = config('multi-tenant.identification.path_parameter', 'tenant');
        $tenantKey = $request->route($parameter);

        if ($tenantKey !== null) {
            URL::defaults([$parameter => $tenantKey]);
        }

        // Remove the tenant parameter from the route so it doesn't get passed
        // to LiVue component mount() methods as an unknown named parameter
        $request->route()->forgetParameter($parameter);

        return $next($request);
    }
}
