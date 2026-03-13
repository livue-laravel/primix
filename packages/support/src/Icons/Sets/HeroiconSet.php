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

        // Fallback: map heroicons to PrimeIcons to avoid missing icon glyphs
        $mappedIcon = $this->mapToPrimeIcon($icon);
        $classAttr = $classes ? ' ' . $classes : '';
        $styleAttr = $style ? ' style="' . e($style) . '"' : '';

        return '<i class="' . e(trim($mappedIcon . $classAttr)) . '"' . $styleAttr . '></i>';
    }

    protected function mapToPrimeIcon(string $icon): string
    {
        $normalized = str($icon)
            ->replaceStart('heroicon-o-', '')
            ->replaceStart('heroicon-s-', '')
            ->replaceStart('heroicon-m-', '')
            ->toString();

        $map = [
            'home' => 'pi pi-home',
            'rectangle-stack' => 'pi pi-table',
            'plus' => 'pi pi-plus',
            'plus-circle' => 'pi pi-plus-circle',
            'pencil-square' => 'pi pi-pencil',
            'trash' => 'pi pi-trash',
            'eye' => 'pi pi-eye',
            'x-mark' => 'pi pi-times',
            'x-circle' => 'pi pi-times-circle',
            'check-circle' => 'pi pi-check-circle',
            'exclamation-triangle' => 'pi pi-exclamation-triangle',
            'information-circle' => 'pi pi-info-circle',
            'arrow-uturn-left' => 'pi pi-replay',
            'arrow-down-tray' => 'pi pi-download',
            'arrow-up-tray' => 'pi pi-upload',
            'arrow-left-on-rectangle' => 'pi pi-sign-out',
            'credit-card' => 'pi pi-credit-card',
            'user-circle' => 'pi pi-user',
            'envelope' => 'pi pi-envelope',
            'magnifying-glass' => 'pi pi-search',
            'link' => 'pi pi-link',
        ];

        return $map[$normalized] ?? 'pi pi-circle';
    }
}
