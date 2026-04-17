<?php

namespace Primix\Widgets;

abstract class GroupWidget extends Widget
{
    protected array $childWidgets = [];

    protected function getChildWidgets(): array
    {
        return $this->childWidgets;
    }

    protected function render(): string
    {
        return 'primix-widgets::group-widget';
    }
}
