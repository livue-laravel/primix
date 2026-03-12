<?php

namespace Primix\Concerns;

use Primix\Support\ClassDiscovery;

trait HasDiscovery
{
    protected array $discoveredResources = [];

    protected array $discoveredPages = [];

    protected array $discoveredWidgets = [];

    public function discoverResources(string $in, string $for): static
    {
        $this->discoveredResources = array_merge(
            $this->discoveredResources,
            ClassDiscovery::discover($in, $for, \Primix\Resources\Resource::class),
        );

        return $this;
    }

    public function discoverPages(string $in, string $for): static
    {
        $this->discoveredPages = array_merge(
            $this->discoveredPages,
            ClassDiscovery::discover($in, $for, \Primix\Pages\Page::class, [
                \Primix\Resources\Pages\Page::class,
            ]),
        );

        return $this;
    }

    public function discoverWidgets(string $in, string $for): static
    {
        $this->discoveredWidgets = array_merge(
            $this->discoveredWidgets,
            ClassDiscovery::discover($in, $for, \Primix\Widgets\Widget::class),
        );

        return $this;
    }
}
