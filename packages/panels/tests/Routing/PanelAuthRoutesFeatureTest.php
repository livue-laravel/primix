<?php

use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Routing\RouteCollection;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\URL;
use Primix\Panel;
use Primix\PanelRegistry;
use Primix\Routing\PanelRouteRegistrar;

beforeEach(function () {
    config()->set('database.default', 'sqlite');
    config()->set('database.connections.sqlite', [
        'driver' => 'sqlite',
        'database' => ':memory:',
        'prefix' => '',
        'foreign_key_constraints' => true,
    ]);

    $this->artisan('migrate:fresh', ['--database' => 'sqlite']);

    app('router')->setRoutes(new RouteCollection());
    app()->instance(PanelRegistry::class, new PanelRegistry());
});

it('logs authenticated users out and redirects them to the login page', function () {
    $panel = registerPanelAuthFeaturePanel(
        Panel::make('admin')
            ->path('admin')
            ->authGuard('web')
            ->login()
    );

    $user = User::factory()->create();

    $response = $this->actingAs($user, 'web')->post('/admin/logout');

    $response->assertRedirect($panel->getLoginUrl());
    $this->assertGuest('web');
});

it('marks the authenticated user email as verified through the signed verification route', function () {
    Event::fake([Verified::class]);

    $panel = registerPanelAuthFeaturePanel(
        Panel::make('admin')
            ->path('admin')
            ->authGuard('web')
            ->login()
            ->emailVerification()
    );

    $user = User::factory()->unverified()->create();

    $url = URL::signedRoute('primix.admin.verification.verify', [
        'id' => $user->getKey(),
        'hash' => sha1($user->getEmailForVerification()),
    ]);

    $response = $this->actingAs($user, 'web')->get($url);

    $response->assertRedirect($panel->getUrl());
    expect($user->fresh()->hasVerifiedEmail())->toBeTrue();
    Event::assertDispatched(Verified::class);
});

it('rejects verification routes when the signed user id does not match the authenticated user', function () {
    registerPanelAuthFeaturePanel(
        Panel::make('admin')
            ->path('admin')
            ->authGuard('web')
            ->login()
            ->emailVerification()
    );

    $user = User::factory()->unverified()->create();

    $url = URL::signedRoute('primix.admin.verification.verify', [
        'id' => $user->getKey() + 1,
        'hash' => sha1($user->getEmailForVerification()),
    ]);

    $response = $this->actingAs($user, 'web')->get($url);

    $response->assertForbidden();
    expect($user->fresh()->hasVerifiedEmail())->toBeFalse();
});

it('rejects verification routes when the hash does not match the authenticated user email', function () {
    registerPanelAuthFeaturePanel(
        Panel::make('admin')
            ->path('admin')
            ->authGuard('web')
            ->login()
            ->emailVerification()
    );

    $user = User::factory()->unverified()->create();

    $url = URL::signedRoute('primix.admin.verification.verify', [
        'id' => $user->getKey(),
        'hash' => sha1('wrong@example.com'),
    ]);

    $response = $this->actingAs($user, 'web')->get($url);

    $response->assertForbidden();
    expect($user->fresh()->hasVerifiedEmail())->toBeFalse();
});

it('registers the signed middleware on the verification route', function () {
    registerPanelAuthFeaturePanel(
        Panel::make('admin')
            ->path('admin')
            ->authGuard('web')
            ->login()
            ->emailVerification()
    );

    $route = collect(Route::getRoutes()->getRoutes())
        ->first(fn ($route) => $route->uri() === 'admin/email/verify/{id}/{hash}' && in_array('GET', $route->methods(), true));

    expect($route)->not->toBeNull()
        ->and($route->gatherMiddleware())->toContain('signed');
});

function registerPanelAuthFeaturePanel(Panel $panel): Panel
{
    app(PanelRegistry::class)->register($panel);

    (new PanelRouteRegistrar())->registerAuthRoutes($panel);
    app('router')->getRoutes()->refreshNameLookups();

    return $panel;
}
