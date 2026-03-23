<?php

namespace Primix\Concerns;

use Closure;
use Primix\Navigation\TenantMenu;
use Primix\Navigation\TenantMenuItem;

trait HasTenantMenu
{
    protected bool|Closure $tenantMenu = true;

    protected ?string $tenantNameAttribute = null;

    /** @var array<TenantMenuItem> */
    protected array $tenantMenuItems = [];

    public function tenantMenu(bool|Closure $condition = true): static
    {
        $this->tenantMenu = $condition;

        return $this;
    }

    public function hasTenantMenu(): bool
    {
        if (! $this->hasTenancy()) {
            return false;
        }

        if ($this->tenantMenu instanceof Closure) {
            return (bool) ($this->tenantMenu)();
        }

        return $this->tenantMenu;
    }

    public function tenantNameAttribute(?string $attribute): static
    {
        $this->tenantNameAttribute = $attribute;

        return $this;
    }

    public function getTenantNameAttribute(): string
    {
        return $this->tenantNameAttribute ?? 'name';
    }

    /**
     * @param  array<TenantMenuItem>  $items
     */
    public function tenantMenuItems(array $items): static
    {
        $this->tenantMenuItems = $items;

        return $this;
    }

    /**
     * @return array<TenantMenuItem>
     */
    public function getTenantMenuItems(): array
    {
        return $this->tenantMenuItems;
    }

    public function buildTenantMenu(): TenantMenu
    {
        $menu = TenantMenu::make();

        if (! app()->bound(\Primix\MultiTenant\Contracts\TenancyManagerContract::class)) {
            return $menu;
        }

        $tenancy = app(\Primix\MultiTenant\Contracts\TenancyManagerContract::class);

        if (! $tenancy->initialized()) {
            return $menu;
        }

        $currentTenant = $tenancy->tenant();
        $nameAttribute = $this->getTenantNameAttribute();

        $menu->currentTenantName($currentTenant->{$nameAttribute} ?? (string) $currentTenant->getTenantKey());
        $menu->currentTenantId($currentTenant->getTenantKey());

        // Load user's tenants for switching
        $guard = auth()->guard($this->getAuthGuard());
        $user = $guard->user();

        if ($user && method_exists($user, 'tenants')) {
            $identification = $this->getTenantIdentification();
            $needsDomains = in_array($identification, ['subdomain', 'domain'], true);
            $tenantsQuery = $user->tenants();

            if ($needsDomains) {
                $tenantsQuery = $tenantsQuery->with('domains');
            }

            $tenants = $tenantsQuery->get();
            $switchTenants = [];

            foreach ($tenants as $tenant) {
                if ($tenant->getTenantKey() === $currentTenant->getTenantKey()) {
                    continue;
                }

                $switchTenants[] = [
                    'id' => $tenant->getTenantKey(),
                    'name' => $tenant->{$nameAttribute} ?? (string) $tenant->getTenantKey(),
                    'url' => $this->getTenantSwitchUrl($tenant),
                ];
            }

            $menu->tenants($switchTenants);
        }

        // "Billing" link (auto-added when billing provider is configured)
        if ($this->hasTenantBilling()) {
            $billingUrl = $this->getTenantBillingProvider()->getBillingUrl($currentTenant);

            if ($billingUrl) {
                $menu->addItem(
                    TenantMenuItem::make()
                        ->label(__('primix::panel.actions.billing'))
                        ->icon('heroicon-o-credit-card')
                        ->url($billingUrl)
                        ->sort(PHP_INT_MAX - 2)
                );
            }
        }

        // "Create new organization" link
        if ($this->hasTenantCreation()) {
            $menu->addItem(
                TenantMenuItem::make()
                    ->label(__('primix::panel.actions.create_organization'))
                    ->icon('heroicon-o-plus-circle')
                    ->url($this->getTenantCreationUrl())
                    ->sort(PHP_INT_MAX - 1)
            );
        }

        // Resolve tenant menu items URLs
        foreach ($this->tenantMenuItems as $item) {
            if ($item->getPage() && ! $item->getUrl()) {
                $pageClass = $item->getPage();
                $item->url($pageClass::getUrl([], $this->getId()));
            }

            $menu->addItem($item);
        }

        return $menu;
    }

    public function getTenantSwitchUrl(mixed $tenant): string
    {
        $identification = $this->getTenantIdentification();
        $slugAttribute = $this->getTenantSlugAttribute();
        $tenantKey = $slugAttribute ? $tenant->{$slugAttribute} : $tenant->getTenantKey();

        return match ($identification) {
            'subdomain' => $this->getTenantSubdomainSwitchUrl($tenant),
            'domain' => $this->getTenantDomainSwitchUrl($tenant),
            'request_data' => url($this->getPath()) . '?tenant_id=' . $tenantKey,
            default => url($this->getPath() . '/' . $tenantKey), // path: /{panel}/{tenant}
        };
    }

    protected function getTenantSubdomainSwitchUrl(mixed $tenant): string
    {
        $domain = $tenant->domains->first();

        if (! $domain) {
            return '#';
        }

        $centralDomain = config('multi-tenant.central_domains.0', request()->getHost());
        $scheme = request()->getScheme();

        return $scheme . '://' . $domain->domain . '.' . $centralDomain . '/' . $this->getPath();
    }

    protected function getTenantDomainSwitchUrl(mixed $tenant): string
    {
        $domain = $tenant->domains->first();

        if (! $domain) {
            return '#';
        }

        $scheme = request()->getScheme();

        return $scheme . '://' . $domain->domain . '/' . $this->getPath();
    }
}
