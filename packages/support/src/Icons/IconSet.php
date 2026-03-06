<?php

namespace Primix\Support\Icons;

interface IconSet
{
    /**
     * Get the unique name of this icon set.
     */
    public function getName(): string;

    /**
     * Check if this set can render the given icon string.
     */
    public function canRender(string $icon): bool;

    /**
     * Render the icon as HTML.
     */
    public function render(string $icon, ?string $class = null, ?string $size = null, ?string $style = null): string;
}
