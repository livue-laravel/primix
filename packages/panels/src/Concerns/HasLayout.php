<?php

namespace Primix\Concerns;

use Primix\Layouts\Shell;

trait HasLayout
{
    protected array $cachedShellLayouts = [];

    public function bootHasLayout(): void
    {
        // Layouts are resolved lazily via getLayout() to keep access to hydrated state.
    }

    public function hydrateHasLayout(): void
    {
        // Rebuild layouts after hydration so closure-based config can read fresh state.
        $this->cachedShellLayouts = [];
    }

    public function getShellLayout(string $name = 'layout'): ?Shell
    {
        if (isset($this->cachedShellLayouts[$name])) {
            return $this->cachedShellLayouts[$name];
        }

        if (! method_exists($this, $name)) {
            return null;
        }

        $layout = $this->{$name}(Shell::make()->component($this));

        if (! $layout instanceof Shell) {
            $resolved = is_object($layout) ? $layout::class : gettype($layout);

            throw new \LogicException("Layout method [{$name}] must return [" . Shell::class . "], got [{$resolved}].");
        }

        $this->cachedShellLayouts[$name] = $layout;

        return $layout;
    }

    public function getShellLayouts(): array
    {
        return $this->cachedShellLayouts;
    }

    protected function resetShellLayoutCache(): void
    {
        $this->cachedShellLayouts = [];
    }
}
