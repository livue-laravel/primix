<?php

namespace Primix\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Primix\PanelRegistry;

class Authenticate
{
    public function handle(Request $request, Closure $next): mixed
    {
        $panelId = $request->route('_panel');

        if (! $panelId) {
            return $next($request);
        }

        $panel = app(PanelRegistry::class)->get($panelId);

        if (! $panel) {
            return $next($request);
        }

        $guard = $panel->getAuthGuard();

        if (Auth::guard($guard)->check()) {
            return $next($request);
        }

        if (! $panel->hasLogin()) {
            abort(403);
        }

        session()->put('url.intended', $request->fullUrl());

        return redirect($panel->getLoginUrl());
    }
}
