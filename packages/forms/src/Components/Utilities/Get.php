<?php

namespace Primix\Forms\Components\Utilities;

use LiVue\Component as LiVueComponent;

class Get
{
    public function __construct(
        protected ?LiVueComponent $livue,
        protected ?string $containerStatePath = null,
    ) {}

    public function __invoke(string $path): mixed
    {
        // Senza componente LiVue (es. rendering standalone di un form nelle
        // Details auto-generate) non c'è stato da leggere: le closure che
        // usano $get devono comunque poter girare.
        if ($this->livue === null) {
            return null;
        }

        $fullPath = $this->containerStatePath
            ? "{$this->containerStatePath}.{$path}"
            : $path;

        return data_get($this->livue, $fullPath);
    }
}
