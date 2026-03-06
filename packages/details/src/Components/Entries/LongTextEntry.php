<?php

namespace Primix\Details\Components\Entries;

use Closure;

class LongTextEntry extends Entry
{
    protected bool|Closure $preserveLineBreaks = true;

    protected int|Closure|null $lineClamp = null;

    public function preserveLineBreaks(bool|Closure $condition = true): static
    {
        $this->preserveLineBreaks = $condition;

        return $this;
    }

    public function lineClamp(int|Closure|null $lines): static
    {
        $this->lineClamp = $lines;

        return $this;
    }

    public function shouldPreserveLineBreaks(): bool
    {
        return (bool) $this->evaluate($this->preserveLineBreaks);
    }

    public function getLineClamp(): ?int
    {
        $lines = $this->evaluate($this->lineClamp);

        return $lines === null ? null : (int) $lines;
    }

    public function getView(): string
    {
        return 'primix-details::components.entries.long-text-entry';
    }

    public function toVueProps(): array
    {
        return array_merge(parent::toVueProps(), [
            'preserveLineBreaks' => $this->shouldPreserveLineBreaks(),
            'lineClamp' => $this->getLineClamp(),
        ]);
    }
}
