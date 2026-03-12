<?php

namespace Primix\Forms\Concerns;

use Closure;
use Primix\Actions\Action;

trait HasCreateOption
{
    protected array|Closure|null $createOptionFormSchema = null;

    protected ?Closure $createOptionUsing = null;

    protected ?Closure $createOptionActionModifier = null;

    public function createOptionForm(array|Closure $schema): static
    {
        $this->createOptionFormSchema = $schema;

        return $this;
    }

    public function createOptionUsing(?Closure $callback): static
    {
        $this->createOptionUsing = $callback;

        return $this;
    }

    public function createOptionAction(?Closure $modifier): static
    {
        $this->createOptionActionModifier = $modifier;

        return $this;
    }

    public function hasCreateOptionForm(): bool
    {
        return $this->createOptionFormSchema !== null;
    }

    public function getCreateOptionFormSchema(): array
    {
        return $this->evaluate($this->createOptionFormSchema) ?? [];
    }

    public function getCreateOptionUsing(): ?Closure
    {
        return $this->createOptionUsing;
    }

    /**
     * Build the Action object for the create-option modal.
     * Pre-configured with modal defaults, then optionally modified by the user's callback.
     */
    public function getCreateOptionAction(): Action
    {
        $action = Action::make('create')
            ->modal()
            ->modalHeading(__('Create') . ' ' . ($this->getLabel() ?? __('primix-forms::forms.option')))
            ->modalSubmitActionLabel(__('Create'))
            ->modalCancelActionLabel(__('Cancel'))
            ->form($this->getCreateOptionFormSchema());

        if ($this->createOptionActionModifier) {
            $action = ($this->createOptionActionModifier)($action) ?? $action;
        }

        return $action;
    }
}
