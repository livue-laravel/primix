<?php

namespace Primix\Forms\Components\Utilities;

use LiVue\Component as LiVueComponent;

class Set
{
    public function __construct(
        protected LiVueComponent $livue,
        protected ?string $containerStatePath = null,
    ) {}

    public function __invoke(string $path, mixed $value): void
    {
        $fullPath = $this->containerStatePath
            ? "{$this->containerStatePath}.{$path}"
            : $path;

        data_set($this->livue, $fullPath, $value);
    }
}
