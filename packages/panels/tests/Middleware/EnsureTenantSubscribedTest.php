<?php

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Route;
use Primix\Http\Middleware\EnsureTenantSubscribed;
use Primix\MultiTenant\Contracts\TenantBillingProvider;
use Primix\MultiTenant\Contracts\TenantContract;
use Primix\MultiTenant\Contracts\TenancyManagerContract;
use Primix\Panel;
use Primix\PanelRegistry;

class EnsureTenantSubscribedTenantFake implements TenantContract
{
    public function __construct(protected int|string $id = 1)
    {
    }

    public function getTenantKey(): string|int
    {
        return $this->id;
    }

    public function getTenantKeyName(): string
    {
        return 'id';
    }

    public function getInternal(string $key): mixed
    {
        return null;
    }

    public function setInternal(string $key, mixed $value): static
    {
        return $this;
    }

    public function run(callable $callback): mixed
    {
        return $callback($this);
    }
}

class EnsureTenantSubscribedBillingProviderFake implements TenantBillingProvider
{
    public function __construct(
        protected bool $hasActiveSubscription,
        protected string $subscribeUrl = 'https://billing.example.com/subscribe'
    ) {
    }

    public function hasActiveSubscription(TenantContract $tenant): bool
    {
        return $this->hasActiveSubscription;
    }

    public function getSubscribeUrl(TenantContract $tenant): string
    {
        return $this->subscribeUrl;
    }

    public function getBillingUrl(TenantContract $tenant): ?string
    {
        return 'https://billing.example.com/portal';
    }
}

class EnsureTenantSubscribedTenancyManagerFake implements TenancyManagerContract
{
    public function __construct(
        protected bool $initialized,
        protected ?TenantContract $tenant = null
    ) {
    }

    public function initialize(TenantContract $tenant): void
    {
        $this->initialized = true;
        $this->tenant = $tenant;
    }

    public function end(): void
    {
        $this->initialized = false;
        $this->tenant = null;
    }

    public function initialized(): bool
    {
        return $this->initialized;
    }

    public function tenant(): ?TenantContract
    {
        return $this->tenant;
    }

    public function runForMultiple(iterable $tenants, callable $callback): void
    {
        foreach ($tenants as $tenant) {
            $callback($tenant);
        }
    }
}

beforeEach(function () {
    app()->instance(PanelRegistry::class, new PanelRegistry());
});

it('passes through when tenant billing is not required for the panel', function () {
    registerEnsureTenantSubscribedPanel(Panel::make('admin')->path('admin'));

    $middleware = new EnsureTenantSubscribed();
    $request = makeEnsureTenantSubscribedRequest('admin');

    $response = $middleware->handle($request, fn () => new Response('next'));

    expect($response->getContent())->toBe('next');
});

it('passes through when tenancy is not initialized', function () {
    registerEnsureTenantSubscribedPanel(
        Panel::make('admin')
            ->path('admin')
            ->tenantBillingProvider(new EnsureTenantSubscribedBillingProviderFake(false))
    );

    app()->instance(
        TenancyManagerContract::class,
        new EnsureTenantSubscribedTenancyManagerFake(false)
    );

    $middleware = new EnsureTenantSubscribed();
    $request = makeEnsureTenantSubscribedRequest('admin');

    $response = $middleware->handle($request, fn () => new Response('next'));

    expect($response->getContent())->toBe('next');
});

it('redirects to the subscribe url when the current tenant has no active subscription', function () {
    registerEnsureTenantSubscribedPanel(
        Panel::make('admin')
            ->path('admin')
            ->tenantBillingProvider(new EnsureTenantSubscribedBillingProviderFake(false))
    );

    app()->instance(
        TenancyManagerContract::class,
        new EnsureTenantSubscribedTenancyManagerFake(true, new EnsureTenantSubscribedTenantFake(42))
    );

    $middleware = new EnsureTenantSubscribed();
    $request = makeEnsureTenantSubscribedRequest('admin');

    $response = $middleware->handle($request, fn () => new Response('next'));

    expect($response->isRedirect())->toBeTrue()
        ->and($response->headers->get('Location'))->toBe('https://billing.example.com/subscribe');
});

it('allows requests to continue when the current tenant has an active subscription', function () {
    registerEnsureTenantSubscribedPanel(
        Panel::make('admin')
            ->path('admin')
            ->tenantBillingProvider(new EnsureTenantSubscribedBillingProviderFake(true))
    );

    app()->instance(
        TenancyManagerContract::class,
        new EnsureTenantSubscribedTenancyManagerFake(true, new EnsureTenantSubscribedTenantFake(42))
    );

    $middleware = new EnsureTenantSubscribed();
    $request = makeEnsureTenantSubscribedRequest('admin');

    $response = $middleware->handle($request, fn () => new Response('next'));

    expect($response->getContent())->toBe('next');
});

function registerEnsureTenantSubscribedPanel(Panel $panel): void
{
    app(PanelRegistry::class)->register($panel);
}

function makeEnsureTenantSubscribedRequest(string $panelId): Request
{
    $request = Request::create('http://localhost/admin/billing');
    $route = new Route('GET', '/admin/billing', fn () => null);
    $route->defaults('_panel', $panelId);
    $route->bind($request);

    $request->setRouteResolver(fn () => $route);

    return $request;
}
