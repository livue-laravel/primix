<?php

namespace Primix\MultiTenant\Middleware;

use Closure;
use Illuminate\Http\Request;
use Primix\MultiTenant\Contracts\TenantResolver;
use Primix\MultiTenant\Facades\Tenancy;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

abstract class IdentificationMiddleware
{
    abstract protected function getResolver(): TenantResolver;

    public function handle(Request $request, Closure $next): Response
    {
        $tenant = $this->resolveTenant($request);

        Tenancy::initialize($tenant);

        return $next($request);
    }

    protected function resolveTenant(Request $request): \Primix\MultiTenant\Contracts\TenantContract
    {
        try {
            $tenant = $this->getResolver()->resolve($request);
        } catch (\Throwable) {
            throw new NotFoundHttpException('Tenant not found.');
        }

        if ($tenant === null) {
            throw new NotFoundHttpException('Tenant not found.');
        }

        return $tenant;
    }

    public function terminate(Request $request, Response $response): void
    {
        Tenancy::end();
    }
}
