<?php

namespace Primix\Resources\Concerns;

trait HasRelationManagers
{
    public function getRelationManagers(): array
    {
        return $this->resolveResource()::getRelationManagers();
    }

    public function hasRelationManagers(): bool
    {
        return ! empty($this->getRelationManagers());
    }
}
