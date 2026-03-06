<?php

namespace Primix\Concerns;

trait HasTenancy
{
    protected ?string $tenantModel = null;

    protected ?string $tenantSlugAttribute = null;

    protected ?string $tenantIdentification = null;

    protected bool $tenantCreation = false;

    protected ?string $tenantCreationPage = null;

    public function tenant(?string $model): static
    {
        $this->tenantModel = $model;

        return $this;
    }

    public function getTenantModel(): ?string
    {
        return $this->tenantModel;
    }

    public function hasTenancy(): bool
    {
        return $this->tenantModel !== null;
    }

    public function tenantSlugAttribute(?string $attribute): static
    {
        $this->tenantSlugAttribute = $attribute;

        return $this;
    }

    public function getTenantSlugAttribute(): ?string
    {
        return $this->tenantSlugAttribute;
    }

    public function tenantIdentification(?string $method): static
    {
        $this->tenantIdentification = $method;

        return $this;
    }

    public function getTenantIdentification(): ?string
    {
        return $this->tenantIdentification;
    }

    public function tenantCreation(bool $enabled = true, ?string $pageClass = null): static
    {
        $this->tenantCreation = $enabled;

        if ($enabled) {
            $this->tenantCreationPage = $pageClass ?? \Primix\Pages\Auth\CreateTenant::class;
        }

        return $this;
    }

    public function hasTenantCreation(): bool
    {
        return $this->tenantCreation;
    }

    public function getTenantCreationPage(): ?string
    {
        return $this->tenantCreationPage;
    }

    public function getTenantCreationUrl(): ?string
    {
        if (! $this->hasTenantCreation()) {
            return null;
        }

        $pageClass = $this->getTenantCreationPage();

        return $pageClass::getUrl([], $this->getId());
    }
}
