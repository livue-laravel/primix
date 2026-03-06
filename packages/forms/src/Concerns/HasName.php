<?php

namespace Primix\Forms\Concerns;

use Illuminate\Contracts\Support\Htmlable;

trait HasName
{
    protected ?string $name = null;

    public function name(?string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function getLabel(): string | Htmlable | null
    {
        $label = $this->evaluate($this->label);

        if ($label === null) {
            $label = (string) str($this->getName())
                ->afterLast('.')
                ->kebab()
                ->replace(['-', '_'], ' ')
                ->ucfirst();
        }

        return (is_string($label) && $this->shouldTranslateLabel) ?
            __($label) :
            $label;
    }
}
