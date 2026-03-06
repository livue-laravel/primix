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
        $tenant = $this->getResolver()->resolve($request);

        if ($tenant === null) {
            throw new NotFoundHttpException('Tenant not found.');
        }

        Tenancy::initialize($tenant);

        return $next($request);
    }

    public function terminate(Request $request, Response $response): void
    {
        Tenancy::end();
    }
}
