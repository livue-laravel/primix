<?php

namespace Primix\MultiTenant\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class PreventAccessFromCentralDomains
{
    public function handle(Request $request, Closure $next): Response
    {
        $centralDomains = config('multi-tenant.central_domains', []);

        if (in_array($request->getHost(), $centralDomains)) {
            throw new NotFoundHttpException('This route is not available on central domains.');
        }

        return $next($request);
    }
}
