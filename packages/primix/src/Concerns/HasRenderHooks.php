<?php

namespace Primix\Concerns;

use BackedEnum;
use Primix\Pages\BasePage;
use Primix\Support\RenderHook\RenderHookManager;

trait HasRenderHooks
{
    public function renderHook(string|BackedEnum $name): string
    {
        return app(RenderHookManager::class)->render($name, $this->getRenderHookScopes());
    }

    protected function getRenderHookScopes(): array
    {
        $scopes = [];

        // Add the class hierarchy up to BasePage
        $class = static::class;
        while ($class && $class !== BasePage::class) {
            $scopes[] = $class;
            $class = get_parent_class($class);
        }

        // Include BasePage itself
        if ($class === BasePage::class) {
            $scopes[] = BasePage::class;
        }

        // Add the resource class if this is a resource page
        if (method_exists($this, 'resolveResource')) {
            $resource = $this->resolveResource();
            if ($resource) {
                $scopes[] = $resource;
            }
        }

        return $scopes;
    }
}
