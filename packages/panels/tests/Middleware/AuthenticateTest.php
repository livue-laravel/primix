<?php

use Illuminate\Auth\GenericUser;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Route;
use Illuminate\Routing\RouteCollection;
use Illuminate\Support\Facades\Auth;
use Primix\Http\Middleware\Authenticate;
use Primix\Panel;
use Primix\PanelRegistry;
use Primix\Routing\PanelRouteRegistrar;
use Symfony\Component\HttpKernel\Exception\HttpException;

beforeEach(function () {
    app('router')->setRoutes(new RouteCollection());
    app()->instance(PanelRegistry::class, new PanelRegistry());
    session()->start();
});

afterEach(function () {
    Auth::forgetGuards();
    session()->flush();
});

it('passes through when request has no panel context', function () {
    $middleware = new Authenticate();
    $request = makeAuthenticateTestRequest('http://localhost/plain');

    $response = $middleware->handle($request, fn () => new Response('next'));

    expect($response->getContent())->toBe('next');
});

it('redirects guests to the panel login page and stores the intended url', function () {
    registerAuthenticateTestPanel(
        Panel::make('admin')
            ->path('admin')
            ->login()
            ->authGuard('web')
    );

    $middleware = new Authenticate();
    $request = makeAuthenticateTestRequest(
        'http://localhost/admin/reports?filter=active',
        'admin'
    );

    $response = $middleware->handle($request, fn () => new Response('next'));

    expect($response->isRedirect())->toBeTrue()
        ->and($response->headers->get('Location'))->toBe(url('admin/login'))
        ->and(session('url.intended'))->toBe('http://localhost/admin/reports?filter=active');
});

it('aborts with 403 when the panel has no login page configured', function () {
    registerAuthenticateTestPanel(
        Panel::make('admin')
            ->path('admin')
            ->authGuard('web')
    );

    $middleware = new Authenticate();
    $request = makeAuthenticateTestRequest('http://localhost/admin/reports', 'admin');

    expect(fn () => $middleware->handle($request, fn () => new Response('next')))
        ->toThrow(function (HttpException $exception) {
            expect($exception->getStatusCode())->toBe(403);
        });
});

it('allows authenticated users on the panel guard to continue', function () {
    registerAuthenticateTestPanel(
        Panel::make('admin')
            ->path('admin')
            ->login()
            ->authGuard('web')
    );

    Auth::guard('web')->setUser(new GenericUser([
        'id' => 1,
        'email' => 'panel-user@example.com',
    ]));

    $middleware = new Authenticate();
    $request = makeAuthenticateTestRequest('http://localhost/admin/reports', 'admin');

    $response = $middleware->handle($request, fn () => new Response('next'));

    expect($response->getContent())->toBe('next')
        ->and(session('url.intended'))->toBeNull();
});

function registerAuthenticateTestPanel(Panel $panel): void
{
    app(PanelRegistry::class)->register($panel);

    (new PanelRouteRegistrar())->registerAuthRoutes($panel);
    app('router')->getRoutes()->refreshNameLookups();
}

function makeAuthenticateTestRequest(string $uri, ?string $panelId = null): Request
{
    $request = Request::create($uri);
    $route = new Route('GET', parse_url($uri, PHP_URL_PATH) ?: '/', fn () => null);

    if ($panelId !== null) {
        $route->defaults('_panel', $panelId);
    }

    $route->bind($request);
    $request->setRouteResolver(fn () => $route);
    $request->setLaravelSession(app('session.store'));

    return $request;
}
