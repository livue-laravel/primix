<?php

namespace Primix\GlobalSearch;

class GlobalSearchResultGroup
{
    public function __construct(
        public readonly string $label,
        public readonly ?string $icon = null,
        public readonly array $results = [],
        public readonly ?string $panelLabel = null,
    ) {}
}
