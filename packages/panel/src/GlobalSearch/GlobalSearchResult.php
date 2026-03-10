<?php

namespace Primix\GlobalSearch;

class GlobalSearchResult
{
    public function __construct(
        public readonly string $title,
        public readonly string $url,
        public readonly array $details = [],
        public readonly ?string $panelId = null,
    ) {}
}
