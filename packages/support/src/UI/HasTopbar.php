<?php

namespace Primix\Support\UI;

use InvalidArgumentException;
use LogicException;

trait HasTopbar
{
    protected ?Topbar $cachedTopbar = null;

    public function hydrateHasTopbar(): void
    {
        $this->resetTopbarCache();
    }

    public function getTopbar(): ?Topbar
    {
        if ($this->cachedTopbar !== null) {
            return $this->cachedTopbar;
        }

        $topbar = null;

        if (method_exists($this, 'topbar')) {
            $topbar = $this->topbar($this->makeTopbar());

            if (! $topbar instanceof Topbar) {
                throw new LogicException('The topbar() method must return an instance of ' . Topbar::class . '.');
            }
        } elseif ($topbarClass = $this->getTopbarClass()) {
            $topbar = $this->resolveTopbarFromClass($topbarClass);
        }

        if ($topbar === null) {
            return null;
        }

        return $this->cachedTopbar = $topbar->livue($this);
    }

    protected function getTopbarClass(): ?string
    {
        if (! property_exists($this, 'topbarClass')) {
            return null;
        }

        $topbarClass = $this->topbarClass;

        return is_string($topbarClass) && $topbarClass !== '' ? $topbarClass : null;
    }

    protected function resolveTopbarFromClass(string $topbarClass): Topbar
    {
        if (! class_exists($topbarClass)) {
            throw new InvalidArgumentException("Topbar class [{$topbarClass}] does not exist.");
        }

        if ($topbarClass !== Topbar::class && ! is_subclass_of($topbarClass, Topbar::class)) {
            throw new InvalidArgumentException("Topbar class [{$topbarClass}] must extend " . Topbar::class . '.');
        }

        /** @var class-string<Topbar> $topbarClass */
        return $topbarClass::make()->name('topbar')->livue($this);
    }

    protected function makeTopbar(): Topbar
    {
        return Topbar::make()
            ->name('topbar')
            ->livue($this);
    }

    protected function resetTopbarCache(): void
    {
        $this->cachedTopbar = null;
    }
}
