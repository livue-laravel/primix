<?php

namespace Primix\Support\UI;

use InvalidArgumentException;
use LogicException;

trait HasSidebar
{
    protected ?Sidebar $cachedSidebar = null;

    public function hydrateHasSidebar(): void
    {
        $this->resetSidebarCache();
    }

    public function getSidebar(): ?Sidebar
    {
        if ($this->cachedSidebar !== null) {
            return $this->cachedSidebar;
        }

        $sidebar = null;

        if (method_exists($this, 'sidebar')) {
            $sidebar = $this->sidebar($this->makeSidebar());

            if (! $sidebar instanceof Sidebar) {
                throw new LogicException('The sidebar() method must return an instance of ' . Sidebar::class . '.');
            }
        } elseif ($sidebarClass = $this->getSidebarClass()) {
            $sidebar = $this->resolveSidebarFromClass($sidebarClass);
        }

        if ($sidebar === null) {
            return null;
        }

        return $this->cachedSidebar = $sidebar->livue($this);
    }

    protected function getSidebarClass(): ?string
    {
        if (! property_exists($this, 'sidebarClass')) {
            return null;
        }

        $sidebarClass = $this->sidebarClass;

        return is_string($sidebarClass) && $sidebarClass !== '' ? $sidebarClass : null;
    }

    protected function resolveSidebarFromClass(string $sidebarClass): Sidebar
    {
        if (! class_exists($sidebarClass)) {
            throw new InvalidArgumentException("Sidebar class [{$sidebarClass}] does not exist.");
        }

        if ($sidebarClass !== Sidebar::class && ! is_subclass_of($sidebarClass, Sidebar::class)) {
            throw new InvalidArgumentException("Sidebar class [{$sidebarClass}] must extend " . Sidebar::class . '.');
        }

        /** @var class-string<Sidebar> $sidebarClass */
        return $sidebarClass::make()->name('sidebar')->livue($this);
    }

    protected function makeSidebar(): Sidebar
    {
        return Sidebar::make()
            ->name('sidebar')
            ->livue($this);
    }

    protected function resetSidebarCache(): void
    {
        $this->cachedSidebar = null;
    }
}

