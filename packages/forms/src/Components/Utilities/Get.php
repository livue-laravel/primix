<?php

namespace Primix\Forms\Components\Utilities;

use LiVue\Component as LiVueComponent;

class Get
{
    public function __construct(
        protected LiVueComponent $livue,
        protected ?string $containerStatePath = null,
    ) {}

    public function __invoke(string $path): mixed
    {
        $fullPath = $this->containerStatePath
            ? "{$this->containerStatePath}.{$path}"
            : $path;

        return data_get($this->livue, $fullPath);
    }
}
