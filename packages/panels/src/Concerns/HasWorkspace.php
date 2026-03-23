<?php

namespace Primix\Concerns;

use Closure;

trait HasWorkspace
{
    protected bool|Closure|null $workspace = null;

    public function workspace(bool|Closure $condition = true): static
    {
        $this->workspace = $condition;

        return $this;
    }

    public function hasWorkspace(): bool
    {
        if ($this->workspace === null) {
            if (! app()->bound('config')) {
                return false;
            }

            return (bool) config('primix.workspace.enabled', false);
        }

        if ($this->workspace instanceof Closure) {
            return (bool) ($this->workspace)();
        }

        return $this->workspace;
    }

    public function hasWorkspaceSetting(): bool
    {
        return $this->workspace !== null;
    }
}
