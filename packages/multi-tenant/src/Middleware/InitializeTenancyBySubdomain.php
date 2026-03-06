<?php

namespace Primix\MultiTenant\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Primix\MultiTenant\Contracts\TenantResolver;
use Primix\MultiTenant\Facades\Tenancy;
use Primix\MultiTenant\Resolvers\SubdomainTenantResolver;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class InitializeTenancyBySubdomain extends IdentificationMiddleware
{
    protected function getResolver(): TenantResolver
    {
        return app(SubdomainTenantResolver::class);
    }

    public function handle(Request $request, Closure $next): Response
    {
        $tenant = $this->getResolver()->resolve($request);

        if ($tenant === null) {
            throw new NotFoundHttpException('Tenant not found.');
        }

        Tenancy::initialize($tenant);

        // Extract the subdomain from the host for URL generation
        $host = $request->getHost();
        $centralDomains = config('multi-tenant.central_domains', []);

        foreach ($centralDomains as $centralDomain) {
            if (str_ends_with($host, $centralDomain)) {
                $subdomain = rtrim(str_replace($centralDomain, '', $host), '.');

                if (! empty($subdomain)) {
                    URL::defaults(['tenant' => $subdomain]);
                }

                break;
            }
        }

        // Remove the tenant route parameter injected by Laravel's domain pattern
        // to prevent it from being passed to LiVue component mount() methods
        $request->route()->forgetParameter('tenant');
        $request->route()->forgetParameter('tenant_domain');

        return $next($request);
    }
}
