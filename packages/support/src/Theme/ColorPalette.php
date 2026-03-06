<?php

namespace Primix\Support\Theme;

use Primix\Support\Colors\Color;

class ColorPalette
{
    /**
     * Get palette shades as space-separated RGB strings for PrimeVue.
     *
     * @return array<int, string> Shade => '{r} {g} {b}'
     */
    public static function get(string $name): array
    {
        $palette = Color::palette($name);
        $result = [];

        foreach ($palette as $shade => $rgb) {
            $result[$shade] = "{$rgb[0]} {$rgb[1]} {$rgb[2]}";
        }

        return $result;
    }

    /**
     * Map a palette to PrimeVue semantic primary token structure.
     *
     * @return array<int, string> Shade => '{r g b}' wrapped for PrimeVue
     */
    public static function toPrimaryTokens(string $name): array
    {
        $palette = static::get($name);
        $tokens = [];

        foreach ($palette as $shade => $rgb) {
            $tokens[$shade] = "{{$rgb}}";
        }

        return $tokens;
    }

    /**
     * Generate CSS variables for a palette.
     *
     * @return array<string, string> '--prefix-shade' => 'rgb(r, g, b)'
     */
    public static function toCssVariables(string $name, string $prefix = 'p-primary'): array
    {
        $palette = Color::palette($name);
        $variables = [];

        foreach ($palette as $shade => $rgb) {
            $variables["--{$prefix}-{$shade}"] = "rgb({$rgb[0]}, {$rgb[1]}, {$rgb[2]})";
        }

        return $variables;
    }

    /**
     * Get list of valid surface palettes (neutral tones).
     *
     * @return array<string>
     */
    public static function surfacePalettes(): array
    {
        return ['slate', 'gray', 'zinc', 'neutral', 'stone'];
    }

    /**
     * Get list of all available palette names.
     *
     * @return array<string>
     */
    public static function allPalettes(): array
    {
        return [
            'slate', 'gray', 'zinc', 'neutral', 'stone',
            'red', 'orange', 'amber', 'yellow', 'lime',
            'green', 'emerald', 'teal', 'cyan', 'sky',
            'blue', 'indigo', 'violet', 'purple', 'fuchsia',
            'pink', 'rose',
        ];
    }
}
