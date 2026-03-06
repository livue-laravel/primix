<?php

namespace Primix\Support\Icons\Sets;

use Primix\Support\Icons\IconSet;

class PrimeIconSet implements IconSet
{
    public function getName(): string
    {
        return 'primeicons';
    }

    public function canRender(string $icon): bool
    {
        return str_starts_with($icon, 'pi ');
    }

    public function render(string $icon, ?string $class = null, ?string $size = null, ?string $style = null): string
    {
        $classes = $icon;

        if ($size) {
            $sizeClass = match ($size) {
                'xs' => 'text-xs',
                'sm' => 'text-sm',
                'md' => 'text-base',
                'lg' => 'text-lg',
                'xl' => 'text-xl',
                default => '',
            };

            if ($sizeClass) {
                $classes .= ' ' . $sizeClass;
            }
        }

        if ($class) {
            $classes .= ' ' . $class;
        }

        $styleAttr = $style ? ' style="' . e($style) . '"' : '';

        return '<i class="' . e(trim($classes)) . '"' . $styleAttr . '></i>';
    }
}
