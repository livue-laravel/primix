<?php

namespace Primix\Routing;

use Illuminate\Support\Facades\Route;
use LiVue\Http\Controllers\LiVuePageController;
use Primix\Panel;
use Primix\PanelRegistry;

class PanelRouteRegistrar
{
    public function registerAuthRoutes(Panel $panel): void
    {
        $panelId = $panel->getId();

        $group = Route::prefix($panel->getPath())
            ->middleware($panel->getMiddleware())
            ->name("primix.{$panelId}.");

        if ($panel->getDomain() !== null) {
            $group->domain($panel->getDomain());
        }

        $group->group(function () use ($panel, $panelId) {
                // Login routes
                if ($panel->hasLogin()) {
                    $loginPage = $panel->getLoginPage();
                    $this->registerPageRoute($loginPage, $panelId);

                    // Capture only the panel id: route closures are serialized by
                    // `route:cache`, and serializing the whole Panel breaks unserialization.
                    Route::post('logout', static function () use ($panelId) {
                        $panel = app(PanelRegistry::class)->get($panelId) ?? abort(404);

                        auth()->guard($panel->getAuthGuard())->logout();
                        session()->invalidate();
                        session()->regenerateToken();

                        return redirect($panel->getLoginUrl());
                    })
                        ->name('logout')
                        ->middleware($panel->getAuthMiddleware());
                }

                // Registration routes
                if ($panel->hasRegistration()) {
                    $this->registerPageRoute($panel->getRegistrationPage(), $panelId);
                }

                // Password reset routes
                if ($panel->hasPasswordReset()) {
                    $this->registerPageRoute($panel->getRequestPasswordResetPage(), $panelId);
                    $this->registerPageRoute($panel->getResetPasswordPage(), $panelId);
                }

                // Email verification routes (with auth middleware, but no email verification middleware)
                if ($panel->hasEmailVerification()) {
                    $this->registerEmailVerificationRoutes($panel, $panelId);
                }
            });
    }

    /**
     * Register the email-verification page routes plus the signed verify handler.
     * Intended to be called from within an active Route group that has already
     * applied the desired prefix, name prefix, and base middleware.
     */
    protected function registerEmailVerificationRoutes(Panel $panel, string $panelId): void
    {
        $verificationPage = $panel->getEmailVerificationPage();
        $authMiddleware = $panel->hasLogin()
            ? [\Primix\Http\Middleware\Authenticate::class]
            : [];

        Route::get($verificationPage::getRouteUri(), LiVuePageController::class)
            ->name($verificationPage::getSlug())
            ->defaults('_livue_component', $verificationPage)
            ->defaults('_panel', $panelId)
            ->middleware($authMiddleware);

        Route::post($verificationPage::getRouteUri(), LiVuePageController::class)
            ->name($verificationPage::getSlug() . '.post')
            ->defaults('_livue_component', $verificationPage)
            ->defaults('_panel', $panelId)
            ->middleware($authMiddleware);

        // Capture only the panel id: route closures are serialized by
        // `route:cache`, and serializing the whole Panel breaks unserialization.
        Route::get('email/verify/{id}/{hash}', static function (\Illuminate\Http\Request $request) use ($panelId) {
            $panel = app(PanelRegistry::class)->get($panelId) ?? abort(404);

            $user = \Illuminate\Support\Facades\Auth::guard($panel->getAuthGuard())->user();

            if ($user === null) {
                abort(403);
            }

            if (! hash_equals((string) $request->route('id'), (string) $user->getKey())) {
                abort(403);
            }

            if (! hash_equals((string) $request->route('hash'), sha1($user->getEmailForVerification()))) {
                abort(403);
            }

            if (! $user->hasVerifiedEmail()) {
                $user->markEmailAsVerified();
                event(new \Illuminate\Auth\Events\Verified($user));
            }

            return redirect($panel->getUrl());
        })
            ->name('verification.verify')
            ->middleware(array_merge($authMiddleware, ['signed']));
    }

    public function registerPageRoute(string $pageClass, string $panelId): void
    {
        Route::get($pageClass::getRouteUri(), LiVuePageController::class)
            ->name($pageClass::getSlug())
            ->defaults('_livue_component', $pageClass)
            ->defaults('_panel', $panelId);

        Route::post($pageClass::getRouteUri(), LiVuePageController::class)
            ->name($pageClass::getSlug() . '.post')
            ->defaults('_livue_component', $pageClass)
            ->defaults('_panel', $panelId);
    }

    public function registerPanelRoutes(Panel $panel): void
    {
        $panelId = $panel->getId();

        $middleware = array_merge(
            $panel->getMiddleware(),
            $panel->getAuthMiddleware()
        );

        $group = Route::prefix($panel->getPath())
            ->middleware($middleware)
            ->name("primix.{$panelId}.");

        if ($panel->getDomain() !== null) {
            $group->domain($panel->getDomain());
        }

        $group->group(function () use ($panel, $panelId) {
                // Register page routes
                foreach ($panel->getPages() as $page) {
                    Route::get($page::getRouteUri(), LiVuePageController::class)
                        ->name($page::getSlug())
                        ->defaults('_livue_component', $page)
                        ->defaults('_panel', $panelId);
                }

                // Register resource routes
                foreach ($panel->getResources() as $resource) {
                    $slug = $resource::getSlug();

                    foreach ($resource::getPages() as $name => $registration) {
                        Route::get($slug . $registration->getRoute(), LiVuePageController::class)
                            ->name("{$slug}.{$name}")
                            ->defaults('_livue_component', $registration->getPage())
                            ->defaults('_resource', $resource)
                            ->defaults('_panel', $panelId);
                    }
                }
            });
    }
}
