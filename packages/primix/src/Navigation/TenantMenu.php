<?php

namespace Primix\Navigation;

use Primix\Support\Concerns\EvaluatesClosures;
use Primix\Support\Concerns\Makeable;

class TenantMenu
{
    use EvaluatesClosures;
    use Makeable;

    protected ?string $currentTenantName = null;

    protected string|int|null $currentTenantId = null;

    /** @var array<array{id: string|int, name: string, url: string}> */
    protected array $tenants = [];

    /** @var array<TenantMenuItem> */
    protected array $items = [];

    public function currentTenantName(?string $name): static
    {
        $this->currentTenantName = $name;

        return $this;
    }

    public function getCurrentTenantName(): ?string
    {
        return $this->currentTenantName;
    }

    public function currentTenantId(string|int|null $id): static
    {
        $this->currentTenantId = $id;

        return $this;
    }

    public function getCurrentTenantId(): string|int|null
    {
        return $this->currentTenantId;
    }

    public function tenants(array $tenants): static
    {
        $this->tenants = $tenants;

        return $this;
    }

    public function getTenants(): array
    {
        return $this->tenants;
    }

    public function addItem(TenantMenuItem $item): static
    {
        $this->items[] = $item;

        return $this;
    }

    /**
     * @return array<TenantMenuItem>
     */
    public function getItems(): array
    {
        return collect($this->items)
            ->sortBy(fn (TenantMenuItem $item) => $item->getSort() ?? PHP_INT_MAX)
            ->values()
            ->all();
    }

    public function toArray(): array
    {
        return [
            'currentTenantName' => $this->getCurrentTenantName(),
            'currentTenantId' => $this->getCurrentTenantId(),
            'tenants' => $this->getTenants(),
            'items' => array_map(
                fn (TenantMenuItem $item) => $item->toArray(),
                $this->getItems()
            ),
        ];
    }
}
