<?php

namespace Primix\Details\Components\Entries;

use Closure;
use Illuminate\Support\Str;

class HtmlEntry extends Entry
{
    protected bool|Closure $isMarkdown = false;

    public static function make(string $name): static
    {
        $entry = parent::make($name);
        $entry->html();

        return $entry;
    }

    public function markdown(bool|Closure $condition = true): static
    {
        $this->isMarkdown = $condition;

        return $this;
    }

    public function isMarkdown(): bool
    {
        return (bool) $this->evaluate($this->isMarkdown);
    }

    public function getState(): mixed
    {
        $state = parent::getState();

        if ($this->isMarkdown() && is_string($state) && $state !== '') {
            return Str::markdown($state, ['html_input' => 'strip', 'allow_unsafe_links' => false]);
        }

        return $state;
    }

    public function getView(): string
    {
        return 'primix-details::components.entries.html-entry';
    }
}
