<?php

namespace Primix\Concerns;

use Primix\Contracts\Plugin;

trait HasPlugins
{
    /** @var array<string, Plugin> */
    protected array $plugins = [];

    public function plugin(Plugin $plugin): static
    {
        $plugin->register($this);

        $this->plugins[$plugin->getId()] = $plugin;

        return $this;
    }

    /**
     * @param  array<Plugin>  $plugins
     */
    public function plugins(array $plugins): static
    {
        foreach ($plugins as $plugin) {
            $this->plugin($plugin);
        }

        return $this;
    }

    public function getPlugin(string $id): Plugin
    {
        if (! $this->hasPlugin($id)) {
            throw new \InvalidArgumentException("Plugin [{$id}] is not registered.");
        }

        return $this->plugins[$id];
    }

    /**
     * @return array<string, Plugin>
     */
    public function getPlugins(): array
    {
        return $this->plugins;
    }

    public function hasPlugin(string $id): bool
    {
        return isset($this->plugins[$id]);
    }

    public function bootPlugins(): void
    {
        foreach ($this->plugins as $plugin) {
            $plugin->boot($this);
        }
    }
}
