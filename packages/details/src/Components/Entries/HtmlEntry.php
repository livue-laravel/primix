<?php

namespace Primix\Details\Components\Entries;

class HtmlEntry extends Entry
{
    public static function make(string $name): static
    {
        $entry = parent::make($name);
        $entry->html();

        return $entry;
    }

    public function getView(): string
    {
        return 'primix-details::components.entries.html-entry';
    }
}
