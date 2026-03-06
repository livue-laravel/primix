<?php

namespace Primix\Forms\Concerns;

use Closure;
use Primix\Actions\Action;

trait HasEditOption
{
    protected array|Closure|null $editOptionFormSchema = null;

    protected ?Closure $editOptionUsing = null;

    protected ?Closure $editOptionActionModifier = null;

    public function editOptionForm(array|Closure $schema): static
    {
        $this->editOptionFormSchema = $schema;

        return $this;
    }

    public function editOptionUsing(?Closure $callback): static
    {
        $this->editOptionUsing = $callback;

        return $this;
    }

    public function editOptionAction(?Closure $modifier): static
    {
        $this->editOptionActionModifier = $modifier;

        return $this;
    }

    public function hasEditOptionForm(): bool
    {
        return $this->editOptionFormSchema !== null;
    }

    public function getEditOptionFormSchema(): array
    {
        return $this->evaluate($this->editOptionFormSchema) ?? [];
    }

    public function getEditOptionUsing(): ?Closure
    {
        return $this->editOptionUsing;
    }

    /**
     * Build the Action object for the edit-option modal.
     * Pre-configured with modal defaults, then optionally modified by the user's callback.
     */
    public function getEditOptionAction(): Action
    {
        $action = Action::make('edit')
            ->modal()
            ->modalHeading(__('Edit') . ' ' . ($this->getLabel() ?? 'Option'))
            ->modalSubmitActionLabel(__('Save'))
            ->modalCancelActionLabel(__('Cancel'))
            ->form($this->getEditOptionFormSchema());

        if ($this->editOptionActionModifier) {
            $action = ($this->editOptionActionModifier)($action) ?? $action;
        }

        return $action;
    }
}
