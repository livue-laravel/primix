<?php

namespace Primix\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Primix\PanelRegistry;

class EnsureEmailIsVerified
{
    public function handle(Request $request, Closure $next): mixed
    {
        $panelId = $request->route('_panel');

        if (! $panelId) {
            return $next($request);
        }

        $panel = app(PanelRegistry::class)->get($panelId);

        if (! $panel || ! $panel->hasEmailVerification()) {
            return $next($request);
        }

        $user = Auth::guard($panel->getAuthGuard())->user();

        if (! $user) {
            return $next($request);
        }

        if ($user instanceof MustVerifyEmail && ! $user->hasVerifiedEmail()) {
            return redirect($panel->getEmailVerificationUrl());
        }

        return $next($request);
    }
}
