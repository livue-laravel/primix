<?php

namespace Primix\Support\Icons\Sets;

use Primix\Support\Icons\IconSet;

class PrimixIconSet implements IconSet
{
    public function getName(): string
    {
        return 'primix';
    }

    public function canRender(string $icon): bool
    {
        return str_starts_with($icon, 'primix-');
    }

    public function render(string $icon, ?string $class = null, ?string $size = null, ?string $style = null): string
    {
        $svg = file_get_contents($this->getSvgPath($icon));

        if ($svg === false) {
            return '';
        }

        $classes = trim(implode(' ', array_filter([
            $this->resolveSizeClasses($size),
            $class,
        ])));

        $attributes = [];

        if ($classes !== '') {
            $attributes[] = 'class="' . e($classes) . '"';
        }

        if ($style !== null && trim($style) !== '') {
            $attributes[] = 'style="' . e($style) . '"';
        }

        if ($attributes === []) {
            return $svg;
        }

        return preg_replace('/<svg\b/', '<svg ' . implode(' ', $attributes), $svg, 1) ?? $svg;
    }

    protected function getSvgPath(string $icon): string
    {
        $name = str($icon)
            ->replaceStart('primix-', '')
            ->toString();

        return __DIR__ . '/../../../resources/svg/' . $name . '.svg';
    }

    protected function resolveSizeClasses(?string $size): ?string
    {
        return match ($size) {
            'xs' => 'w-3 h-3',
            'sm' => 'w-4 h-4',
            'md' => 'w-5 h-5',
            'lg' => 'w-6 h-6',
            'xl' => 'w-8 h-8',
            default => null,
        };
    }
}
