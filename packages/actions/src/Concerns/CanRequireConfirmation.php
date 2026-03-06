<?php

namespace Primix\Actions\Concerns;

use Closure;

trait CanRequireConfirmation
{
    protected bool|Closure $requiresConfirmation = false;

    protected string|Closure|null $confirmationHeading = null;

    protected string|Closure|null $confirmationDescription = null;

    protected string|Closure|null $confirmationButtonLabel = null;

    protected string|Closure|null $cancelButtonLabel = null;

    public function requiresConfirmation(bool|Closure $condition = true): static
    {
        $this->requiresConfirmation = $condition;

        return $this;
    }

    public function confirmationHeading(string|Closure|null $heading): static
    {
        $this->confirmationHeading = $heading;

        return $this;
    }

    public function confirmationDescription(string|Closure|null $description): static
    {
        $this->confirmationDescription = $description;

        return $this;
    }

    public function confirmationButtonLabel(string|Closure|null $label): static
    {
        $this->confirmationButtonLabel = $label;

        return $this;
    }

    public function cancelButtonLabel(string|Closure|null $label): static
    {
        $this->cancelButtonLabel = $label;

        return $this;
    }

    public function doesRequireConfirmation(): bool
    {
        return (bool) $this->evaluate($this->requiresConfirmation);
    }

    public function getConfirmationHeading(): ?string
    {
        return $this->evaluate($this->confirmationHeading);
    }

    public function getConfirmationDescription(): ?string
    {
        return $this->evaluate($this->confirmationDescription);
    }

    public function getConfirmationButtonLabel(): string
    {
        return $this->evaluate($this->confirmationButtonLabel) ?? 'Confirm';
    }

    public function getCancelButtonLabel(): string
    {
        return $this->evaluate($this->cancelButtonLabel) ?? 'Cancel';
    }
}
