<?php

namespace Primix\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Primix\PanelRegistry;

class EnsureHasTenant
{
    public function handle(Request $request, Closure $next): mixed
    {
        $panelId = $request->route('_panel');

        if (! $panelId) {
            return $next($request);
        }

        $panel = app(PanelRegistry::class)->get($panelId);

        if (! $panel || ! $panel->hasTenancy() || ! $panel->hasTenantCreation()) {
            return $next($request);
        }

        $user = Auth::guard($panel->getAuthGuard())->user();

        if (! $user) {
            return $next($request);
        }

        if (! $user->tenants()->exists()) {
            return redirect($panel->getTenantCreationUrl());
        }

        return $next($request);
    }
}
