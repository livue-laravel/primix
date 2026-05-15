<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Route;
use Illuminate\Routing\RouteCollection;
use Illuminate\Support\Facades\Auth;
use Primix\Http\Middleware\EnsureEmailIsVerified;
use Primix\Panel;
use Primix\PanelRegistry;
use Primix\Routing\PanelRouteRegistrar;

beforeEach(function () {
    app('router')->setRoutes(new RouteCollection());
    app()->instance(PanelRegistry::class, new PanelRegistry());
});

afterEach(function () {
    Auth::forgetGuards();
});

it('passes through when request has no panel context', function () {
    $middleware = new EnsureEmailIsVerified();
    $request = makeEnsureEmailVerifiedRequest('http://localhost/plain');

    $response = $middleware->handle($request, fn () => new Response('next'));

    expect($response->getContent())->toBe('next');
});

it('passes through when the panel does not require email verification', function () {
    registerEnsureEmailVerifiedPanel(
        Panel::make('admin')
            ->path('admin')
            ->authGuard('web')
            ->login()
    );

    $middleware = new EnsureEmailIsVerified();
    $request = makeEnsureEmailVerifiedRequest('http://localhost/admin/dashboard', 'admin');

    $response = $middleware->handle($request, fn () => new Response('next'));

    expect($response->getContent())->toBe('next');
});

it('passes through when there is no authenticated user', function () {
    registerEnsureEmailVerifiedPanel(
        Panel::make('admin')
            ->path('admin')
            ->authGuard('web')
            ->login()
            ->emailVerification()
    );

    $middleware = new EnsureEmailIsVerified();
    $request = makeEnsureEmailVerifiedRequest('http://localhost/admin/dashboard', 'admin');

    $response = $middleware->handle($request, fn () => new Response('next'));

    expect($response->getContent())->toBe('next');
});

it('redirects unverified users to the email verification page', function () {
    registerEnsureEmailVerifiedPanel(
        Panel::make('admin')
            ->path('admin')
            ->authGuard('web')
            ->login()
            ->emailVerification()
    );

    Auth::guard('web')->setUser(User::factory()->unverified()->make());

    $middleware = new EnsureEmailIsVerified();
    $request = makeEnsureEmailVerifiedRequest('http://localhost/admin/dashboard', 'admin');

    $response = $middleware->handle($request, fn () => new Response('next'));

    expect($response->isRedirect())->toBeTrue()
        ->and($response->headers->get('Location'))->toBe(url('admin/email-verification'));
});

it('allows verified users to continue', function () {
    registerEnsureEmailVerifiedPanel(
        Panel::make('admin')
            ->path('admin')
            ->authGuard('web')
            ->login()
            ->emailVerification()
    );

    Auth::guard('web')->setUser(User::factory()->make());

    $middleware = new EnsureEmailIsVerified();
    $request = makeEnsureEmailVerifiedRequest('http://localhost/admin/dashboard', 'admin');

    $response = $middleware->handle($request, fn () => new Response('next'));

    expect($response->getContent())->toBe('next');
});

function registerEnsureEmailVerifiedPanel(Panel $panel): void
{
    app(PanelRegistry::class)->register($panel);

    (new PanelRouteRegistrar())->registerAuthRoutes($panel);
    app('router')->getRoutes()->refreshNameLookups();
}

function makeEnsureEmailVerifiedRequest(string $uri, ?string $panelId = null): Request
{
    $request = Request::create($uri);
    $route = new Route('GET', parse_url($uri, PHP_URL_PATH) ?: '/', fn () => null);

    if ($panelId !== null) {
        $route->defaults('_panel', $panelId);
    }

    $route->bind($request);
    $request->setRouteResolver(fn () => $route);

    return $request;
}
