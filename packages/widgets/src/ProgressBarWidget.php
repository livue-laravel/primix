<?php

namespace Primix\Widgets;

abstract class ProgressBarWidget extends Widget
{
    protected ?string $heading = null;

    protected ?string $mode = null;

    protected bool $showValue = true;

    abstract protected function getValue(): int;

    public function getHeading(): ?string
    {
        return $this->heading;
    }

    public function getMode(): ?string
    {
        return $this->mode;
    }

    public function shouldShowValue(): bool
    {
        return $this->showValue;
    }

    protected function render(): string
    {
        return 'primix-widgets::progress-bar';
    }
}
