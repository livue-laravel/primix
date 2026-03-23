<?php

namespace Primix\MultiTenant\Routing;

use Illuminate\Support\Facades\Route;
use LiVue\Http\Controllers\LiVuePageController;
use Primix\MultiTenant\Middleware\InitializeTenancyByDomain;
use Primix\MultiTenant\Middleware\InitializeTenancyByPath;
use Primix\MultiTenant\Middleware\InitializeTenancyByRequestData;
use Primix\MultiTenant\Middleware\InitializeTenancyBySubdomain;
use Primix\Panel;
use Primix\Routing\PanelRouteRegistrar;

class TenantPanelRouteRegistrar extends PanelRouteRegistrar
{
    public function registerAuthRoutes(Panel $panel): void
    {
        parent::registerAuthRoutes($panel);

        $panelId = $panel->getId();

        // Auth middleware without tenancy and without EnsureHasTenant (to avoid redirect loops)
        $authMiddleware = $panel->getMiddleware();

        if ($panel->hasLogin()) {
            $authMiddleware[] = \Primix\Http\Middleware\Authenticate::class;
        }

        if ($panel->hasEmailVerification()) {
            $authMiddleware[] = \Primix\Http\Middleware\EnsureEmailIsVerified::class;
        }

        // Tenant creation page route
        if ($panel->hasTenantCreation()) {
            $creationPage = $panel->getTenantCreationPage();

            Route::prefix($panel->getPath())
                ->middleware($authMiddleware)
                ->name("primix.{$panelId}.")
                ->group(function () use ($creationPage, $panelId) {
                    Route::get($creationPage::getRouteUri(), LiVuePageController::class)
                        ->name($creationPage::getSlug())
                        ->defaults('_livue_component', $creationPage)
                        ->defaults('_panel', $panelId);

                    Route::post($creationPage::getRouteUri(), LiVuePageController::class)
                        ->name($creationPage::getSlug() . '.post')
                        ->defaults('_livue_component', $creationPage)
                        ->defaults('_panel', $panelId);
                });
        }

        // Landing route: redirects to first tenant or creation page (central domain only)
        $identification = $panel->getTenantIdentification()
            ?? config('multi-tenant.identification.default', 'path');

        $landingRoute = Route::get($panel->getPath(), function () use ($panel) {
            $user = auth()->guard($panel->getAuthGuard())->user();

            if ($user && method_exists($user, 'tenants')) {
                $needsDomains = in_array($identification, ['subdomain', 'domain'], true);
                $tenant = $needsDomains
                    ? $user->tenants()->with('domains')->first()
                    : $user->tenants()->first();

                if ($tenant) {
                    return redirect($panel->getTenantSwitchUrl($tenant));
                }
            }

            if ($panel->hasTenantCreation()) {
                return redirect($panel->getTenantCreationUrl());
            }

            abort(404);
        })
            ->middleware($authMiddleware)
            ->name("primix.{$panelId}.landing");

        // Constrain to central domain to avoid redirect loops on tenant subdomains
        if (in_array($identification, ['subdomain', 'domain'])) {
            $centralDomain = config('multi-tenant.central_domains.0');

            if ($centralDomain) {
                $landingRoute->domain($centralDomain);
            }
        }
    }

    public function registerPanelRoutes(Panel $panel): void
    {
        $panelId = $panel->getId();
        $identification = $panel->getTenantIdentification()
            ?? config('multi-tenant.identification.default', 'path');

        $middleware = array_merge(
            $panel->getMiddleware(),
            $panel->getAuthMiddleware(),
        );

        $middleware[] = $this->resolveMiddleware($identification);

        $prefix = $this->resolvePrefix($panel, $identification);

        $route = Route::prefix($prefix)
            ->middleware($middleware)
            ->name("primix.{$panelId}.");

        // For domain/subdomain identification, bind routes to the tenant domains
        if (in_array($identification, ['domain', 'subdomain'])) {
            $domainPattern = $this->resolveDomainPattern($identification);

            if ($domainPattern) {
                $route->domain($domainPattern);
            }
        }

        $route->group(function () use ($panel, $panelId) {
            foreach ($panel->getPages() as $page) {
                Route::get($page::getRouteUri(), LiVuePageController::class)
                    ->name($page::getSlug())
                    ->defaults('_livue_component', $page)
                    ->defaults('_panel', $panelId);
            }

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

    protected function resolveMiddleware(string $identification): string
    {
        return match ($identification) {
            'domain' => InitializeTenancyByDomain::class,
            'subdomain' => InitializeTenancyBySubdomain::class,
            'path' => InitializeTenancyByPath::class,
            'request_data' => InitializeTenancyByRequestData::class,
            default => config('multi-tenant.panel.middleware', InitializeTenancyByPath::class),
        };
    }

    protected function resolvePrefix(Panel $panel, string $identification): string
    {
        if ($identification === 'path') {
            $routeParameter = config('multi-tenant.panel.route_parameter', 'tenant');

            return $panel->getPath() . '/{' . $routeParameter . '}';
        }

        // For domain/subdomain/request_data, no tenant segment in the path
        return $panel->getPath();
    }

    protected function resolveDomainPattern(string $identification): ?string
    {
        if ($identification === 'subdomain') {
            $centralDomains = config('multi-tenant.central_domains', []);

            return ! empty($centralDomains)
                ? '{tenant}.' . $centralDomains[0]
                : null;
        }

        // For full domain identification, use a wildcard pattern
        return '{tenant_domain}';
    }
}
