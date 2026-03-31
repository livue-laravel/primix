<?php

namespace Primix\Forms\Components\Fields;

use Closure;

class Placeholder extends Field
{
    protected string|Closure|null $content = null;

    public function configure(): static
    {
        parent::configure();

        $this->dehydrated(false);

        return $this;
    }

    public function content(string|Closure $content): static
    {
        $this->content = $content;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->evaluate($this->content);
    }

    protected function getAutoRules(): array
    {
        return [];
    }

    public function getView(): string
    {
        return 'primix-forms::components.fields.placeholder';
    }

    public function toVueProps(): array
    {
        return array_merge(parent::toVueProps(), [
            'content' => $this->getContent(),
        ]);
    }
}
