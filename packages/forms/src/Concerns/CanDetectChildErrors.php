<?php

namespace Primix\Forms\Concerns;

use Illuminate\Support\ViewErrorBag;

trait CanDetectChildErrors
{
    public function getChildFieldStatePaths(): array
    {
        return $this->collectFieldStatePaths($this->getChildComponents());
    }

    protected function collectFieldStatePaths(array $components): array
    {
        $paths = [];

        foreach ($components as $component) {
            if (method_exists($component, 'getStatePath')) {
                $path = $component->getStatePath();

                if ($path !== null) {
                    $paths[] = $path;
                }
            }

            if (method_exists($component, 'getChildComponents')) {
                $paths = array_merge(
                    $paths,
                    $this->collectFieldStatePaths($component->getChildComponents())
                );
            }
        }

        return $paths;
    }

    public function hasChildErrors(ViewErrorBag $errors): bool
    {
        if ($errors->isEmpty()) {
            return false;
        }

        foreach ($this->getChildFieldStatePaths() as $path) {
            if ($errors->has($path) || $errors->has($path . '.*')) {
                return true;
            }
        }

        return false;
    }
}
