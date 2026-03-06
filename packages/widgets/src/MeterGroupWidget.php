<?php

namespace Primix\Widgets;

abstract class MeterGroupWidget extends Widget
{
    protected ?string $heading = null;

    protected ?int $max = null;

    abstract protected function getMeters(): array;

    public function getHeading(): ?string
    {
        return $this->heading;
    }

    public function getMax(): ?int
    {
        return $this->max;
    }

    protected function render(): string
    {
        return 'primix-widgets::meter-group';
    }
}
