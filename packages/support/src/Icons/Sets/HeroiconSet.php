<?php

namespace Primix\Support\Icons\Sets;

use Primix\Support\Icons\IconSet;

class HeroiconSet implements IconSet
{
    public function getName(): string
    {
        return 'heroicons';
    }

    public function canRender(string $icon): bool
    {
        return str_starts_with($icon, 'heroicon-');
    }

    public function render(string $icon, ?string $class = null, ?string $size = null, ?string $style = null): string
    {
        $classes = '';

        if ($size) {
            $classes = match ($size) {
                'xs' => 'w-3 h-3',
                'sm' => 'w-4 h-4',
                'md' => 'w-5 h-5',
                'lg' => 'w-6 h-6',
                'xl' => 'w-8 h-8',
                default => 'w-5 h-5',
            };
        }

        if ($class) {
            $classes .= ($classes ? ' ' : '') . $class;
        }

        $classes = trim($classes);

        // Use blade-icons svg() helper if available (blade-heroicons package)
        if (function_exists('svg')) {
            try {
                $svg = svg($icon, $classes);
                if ($style) {
                    return str_replace('<svg', '<svg style="' . e($style) . '"', $svg->toHtml());
                }
                return $svg->toHtml();
            } catch (\Exception $e) {
                // Fall through to fallback
            }
        }

        // Fallback: render as <i> tag
        $classAttr = $classes ? ' ' . $classes : '';
        $styleAttr = $style ? ' style="' . e($style) . '"' : '';

        return '<i class="' . e(trim($icon . $classAttr)) . '"' . $styleAttr . '></i>';
    }
}
