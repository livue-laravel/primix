<?php

namespace Primix\Actions\Concerns;

use Closure;
use Primix\Support\Enums\SlideOverPosition;

trait CanOpenModal
{
    protected bool|Closure $isModal = false;

    protected bool|Closure $isSlideOver = false;

    protected SlideOverPosition|Closure|null $slideOverPosition = null;

    protected string|Closure|null $modalHeading = null;

    protected string|Closure|null $modalDescription = null;

    protected string|Closure|null $modalWidth = null;

    protected string|Closure|null $modalSubmitActionLabel = null;

    protected string|Closure|null $modalCancelActionLabel = null;

    protected bool|Closure $modalCloseOnClickAway = true;

    protected bool|Closure $modalCloseOnEscape = true;

    protected string|Closure|null $modalPosition = null;

    protected bool|Closure $modalBlockScroll = true;

    protected bool|Closure $modalDraggable = false;

    protected bool|Closure $modalMaximizable = false;

    protected array|Closure $modalPassThrough = [];

    protected bool|Closure $modalFooterHidden = false;

    protected bool|Closure $isPopover = false;

    public function modal(bool|Closure $condition = true): static
    {
        $this->isModal = $condition;

        return $this;
    }

    public function modalHeading(string|Closure|null $heading): static
    {
        $this->modalHeading = $heading;

        return $this;
    }

    public function modalDescription(string|Closure|null $description): static
    {
        $this->modalDescription = $description;

        return $this;
    }

    public function modalWidth(string|Closure|null $width): static
    {
        $this->modalWidth = $width;

        return $this;
    }

    public function modalSubmitActionLabel(string|Closure|null $label): static
    {
        $this->modalSubmitActionLabel = $label;

        return $this;
    }

    public function modalCancelActionLabel(string|Closure|null $label): static
    {
        $this->modalCancelActionLabel = $label;

        return $this;
    }

    public function closeModalOnClickAway(bool|Closure $condition = true): static
    {
        $this->modalCloseOnClickAway = $condition;

        return $this;
    }

    public function closeModalOnEscape(bool|Closure $condition = true): static
    {
        $this->modalCloseOnEscape = $condition;

        return $this;
    }

    public function isModal(): bool
    {
        return (bool) $this->evaluate($this->isModal) || $this->hasForm();
    }

    public function getModalHeading(): ?string
    {
        return $this->evaluate($this->modalHeading) ?? $this->getLabel();
    }

    public function getModalDescription(): ?string
    {
        return $this->evaluate($this->modalDescription);
    }

    public function getModalWidth(): string
    {
        return $this->evaluate($this->modalWidth) ?? 'md';
    }

    public function getModalSubmitActionLabel(): string
    {
        return $this->evaluate($this->modalSubmitActionLabel) ?? 'Submit';
    }

    public function getModalCancelActionLabel(): string
    {
        return $this->evaluate($this->modalCancelActionLabel) ?? 'Cancel';
    }

    public function shouldCloseModalOnClickAway(): bool
    {
        return (bool) $this->evaluate($this->modalCloseOnClickAway);
    }

    public function shouldCloseModalOnEscape(): bool
    {
        return (bool) $this->evaluate($this->modalCloseOnEscape);
    }

    public function modalPosition(string|Closure|null $position): static
    {
        $this->modalPosition = $position;

        return $this;
    }

    public function modalBlockScroll(bool|Closure $condition = true): static
    {
        $this->modalBlockScroll = $condition;

        return $this;
    }

    public function modalDraggable(bool|Closure $condition = true): static
    {
        $this->modalDraggable = $condition;

        return $this;
    }

    public function modalMaximizable(bool|Closure $condition = true): static
    {
        $this->modalMaximizable = $condition;

        return $this;
    }

    public function modalPt(array|Closure $passThrough): static
    {
        $this->modalPassThrough = $passThrough;

        return $this;
    }

    public function getModalPosition(): string
    {
        return $this->evaluate($this->modalPosition) ?? 'center';
    }

    public function shouldModalBlockScroll(): bool
    {
        return (bool) $this->evaluate($this->modalBlockScroll);
    }

    public function isModalDraggable(): bool
    {
        return (bool) $this->evaluate($this->modalDraggable);
    }

    public function isModalMaximizable(): bool
    {
        return (bool) $this->evaluate($this->modalMaximizable);
    }

    public function getModalPassThrough(): array
    {
        return $this->evaluate($this->modalPassThrough) ?? [];
    }

    /**
     * Enable slide-over mode. The modal appears fixed to an edge of the screen.
     *
     * @param bool|Closure $condition Whether to enable slide-over mode
     * @param SlideOverPosition|Closure|null $position Edge to attach to (default: Right)
     */
    public function slideOver(bool|Closure $condition = true, SlideOverPosition|Closure|null $position = null): static
    {
        $this->isSlideOver = $condition;
        $this->slideOverPosition = $position;

        return $this;
    }

    public function isSlideOver(): bool
    {
        return (bool) $this->evaluate($this->isSlideOver);
    }

    public function getSlideOverPosition(): SlideOverPosition
    {
        $position = $this->evaluate($this->slideOverPosition);

        if ($position instanceof SlideOverPosition) {
            return $position;
        }

        return SlideOverPosition::Right;
    }

    public function hideModalFooter(bool|Closure $condition = true): static
    {
        $this->modalFooterHidden = $condition;

        return $this;
    }

    public function isModalFooterHidden(): bool
    {
        return (bool) $this->evaluate($this->modalFooterHidden);
    }

    public function popover(bool|Closure $condition = true): static
    {
        $this->isPopover = $condition;

        return $this;
    }

    public function isPopover(): bool
    {
        return (bool) $this->evaluate($this->isPopover);
    }
}
