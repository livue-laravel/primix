<?php

namespace Primix\Details\Components\Entries;

class TextEntry extends Entry
{
    public function getView(): string
    {
        return 'primix-details::components.entries.text-entry';
    }
}
