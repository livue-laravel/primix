<?php

namespace Primix\Support\Concerns;

use Primix\Support\Enums\SchemaContext;

trait HasContext
{
    protected ?SchemaContext $context = null;

    public function context(?SchemaContext $context): static
    {
        $this->context = $context;

        return $this;
    }

    public function getContext(): ?SchemaContext
    {
        if ($this->context !== null) {
            return $this->context;
        }

        if (isset($this->container) && $this->container !== null) {
            return $this->container->getContext();
        }

        return null;
    }

    public function isInEditableContext(): bool
    {
        return $this->getContext()?->isEditable() ?? true;
    }

    public function isInReadOnlyContext(): bool
    {
        return $this->getContext()?->isReadOnly() ?? false;
    }
}
