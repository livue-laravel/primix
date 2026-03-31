<?php

namespace Primix\Actions;

use Closure;
use Primix\Support\Concerns\EvaluatesClosures;

class ModalAction
{
    use EvaluatesClosures;

    protected string|Closure $label;
    protected string $severity = 'primary';
    protected string|Closure|null $jsAction = null;
    protected ?string $role = null;
    protected bool $isOutlined = false;

    public function __construct(string|Closure $label)
    {
        $this->label = $label;
    }

    public static function make(string|Closure $label): static
    {
        return new static($label);
    }

    public static function cancel(string|Closure|null $label = null): static
    {
        $action = new static($label ?? __('primix-actions::actions.cancel'));
        $action->severity = 'secondary';
        $action->role = 'cancel';

        return $action;
    }

    public static function submit(string|Closure|null $label = null): static
    {
        $action = new static($label ?? __('primix-actions::actions.submit'));
        $action->severity = 'primary';
        $action->role = 'submit';

        return $action;
    }

    public function label(string|Closure $label): static
    {
        $this->label = $label;

        return $this;
    }

    public function severity(string $severity): static
    {
        $this->severity = $severity;

        return $this;
    }

    public function jsAction(string|Closure|null $jsAction): static
    {
        $this->jsAction = $jsAction;

        return $this;
    }

    public function outlined(bool $condition = true): static
    {
        $this->isOutlined = $condition;

        return $this;
    }

    public function getLabel(): string
    {
        return (string) $this->evaluate($this->label);
    }

    public function getSeverity(): string
    {
        return $this->severity;
    }

    public function getJsAction(): ?string
    {
        return $this->evaluate($this->jsAction);
    }

    public function getRole(): ?string
    {
        return $this->role;
    }

    public function isCancel(): bool
    {
        return $this->role === 'cancel';
    }

    public function isSubmit(): bool
    {
        return $this->role === 'submit';
    }

    public function isOutlined(): bool
    {
        return $this->isOutlined;
    }
}
