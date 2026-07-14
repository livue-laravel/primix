<?php

namespace Primix\Forms\Components\Utilities;

use LiVue\Component as LiVueComponent;

class Set
{
    public function __construct(
        protected ?LiVueComponent $livue,
        protected ?string $containerStatePath = null,
    ) {}

    public function __invoke(string $path, mixed $value): void
    {
        // Senza componente LiVue non c'è stato da scrivere: no-op, così le
        // closure che usano $set girano anche in rendering standalone.
        if ($this->livue === null) {
            return;
        }

        $fullPath = $this->containerStatePath
            ? "{$this->containerStatePath}.{$path}"
            : $path;

        data_set($this->livue, $fullPath, $value);
    }
}
