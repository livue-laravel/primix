<?php

namespace Primix\Widgets;

abstract class ChartWidget extends Widget
{
    protected ?string $heading = null;

    protected ?string $description = null;

    protected ?int $height = null;

    protected ?string $maxHeight = null;

    abstract protected function getType(): string;

    abstract protected function getData(): array;

    protected function getOptions(): array
    {
        return [];
    }

    public function getHeading(): ?string
    {
        return $this->heading;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function getHeight(): ?int
    {
        return $this->height;
    }

    public function getMaxHeight(): ?string
    {
        return $this->maxHeight;
    }

    protected function render(): string
    {
        return 'primix-widgets::chart';
    }
}
