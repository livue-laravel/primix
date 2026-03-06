<?php

namespace Primix\Support\Colors;

use InvalidArgumentException;

class ColorManager
{
    /**
     * Semantic colors mapped to [palette, defaultShade].
     *
     * @var array<string, array{palette: string, shade: int}>
     */
    protected array $semanticColors = [];

    /**
     * Semantic colors registered with a raw hex value (no palette).
     *
     * @var array<string, string>
     */
    protected array $hexColors = [];

    /**
     * PrimeVue severity mapping.
     *
     * @var array<string, ?string>
     */
    protected array $primeVueSeverityMap = [
        'primary' => null,
        'secondary' => 'secondary',
        'gray' => 'secondary',
        'success' => 'success',
        'info' => 'info',
        'warning' => 'warn',
        'warn' => 'warn',
        'danger' => 'danger',
    ];

    /**
     * Mapping from semantic name to Tailwind palette name.
     *
     * @var array<string, string>
     */
    protected array $tailwindPaletteMap = [
        'primary' => 'blue',
        'secondary' => 'gray',
        'gray' => 'gray',
        'success' => 'green',
        'danger' => 'red',
        'warning' => 'yellow',
        'warn' => 'yellow',
        'info' => 'blue',
    ];

    public function __construct()
    {
        $this->register('primary', 'blue', 600);
        $this->register('secondary', 'gray', 500);
        $this->register('success', 'green', 500);
        $this->register('danger', 'red', 500);
        $this->register('warning', 'yellow', 500);
        $this->register('warn', 'yellow', 500);
        $this->register('info', 'blue', 500);
        $this->register('gray', 'gray', 500);
    }

    // ─── Registration ───────────────────────────────────────────────

    /**
     * Register a semantic color name mapped to a Tailwind palette.
     */
    public function register(string $name, string $palette, int $shade = 500): static
    {
        $this->semanticColors[$name] = [
            'palette' => $palette,
            'shade' => $shade,
        ];

        unset($this->hexColors[$name]);

        return $this;
    }

    /**
     * Register a semantic color name mapped to a raw hex value.
     */
    public function registerHex(string $name, string $hex): static
    {
        $this->hexColors[$name] = $hex;
        unset($this->semanticColors[$name]);

        return $this;
    }

    // ─── Resolution ─────────────────────────────────────────────────

    /**
     * Resolve a color string (semantic name or hex) to a Color instance.
     */
    public function resolve(string $colorOrHex): Color
    {
        if (str_starts_with($colorOrHex, '#')) {
            return Color::hex($colorOrHex);
        }

        if (isset($this->hexColors[$colorOrHex])) {
            return Color::hex($this->hexColors[$colorOrHex]);
        }

        if (isset($this->semanticColors[$colorOrHex])) {
            $def = $this->semanticColors[$colorOrHex];

            return Color::shade($def['palette'], $def['shade']);
        }

        // Try as a Tailwind palette name at shade 500
        try {
            return Color::shade($colorOrHex, 500);
        } catch (InvalidArgumentException) {
            // Not a known palette — treat as hex without '#'
            throw new InvalidArgumentException("Cannot resolve color: '{$colorOrHex}'. Use a semantic name (success, danger, etc.), a Tailwind palette name (red, blue, etc.), or a hex value (#ff0000).");
        }
    }

    /**
     * Check if a value is a registered semantic color name.
     */
    public function isSemanticName(string $value): bool
    {
        return isset($this->semanticColors[$value]) || isset($this->hexColors[$value]);
    }

    // ─── Output Helpers ─────────────────────────────────────────────

    /**
     * Resolve a color and return its hex value.
     */
    public function toHex(string $colorOrHex): string
    {
        return $this->resolve($colorOrHex)->toHex();
    }

    /**
     * Resolve a color and return a muted (shade-200) hex variant.
     * Useful for toggle off-state backgrounds, light badges, etc.
     */
    public function toMutedHex(string $colorOrHex, int $shade = 200): string
    {
        return $this->shadeOf($colorOrHex, $shade)->toHex();
    }

    /**
     * Get a specific shade of a semantic color.
     *
     * For palette-based colors, looks up the palette shade directly.
     * For hex-based or arbitrary colors, uses lighten/darken approximation.
     */
    public function shadeOf(string $colorOrHex, int $shade): Color
    {
        // If it's a hex value, resolve and use lighten/darken
        if (str_starts_with($colorOrHex, '#')) {
            return $this->approximateShade(Color::hex($colorOrHex), $shade);
        }

        // If registered with a hex value, use lighten/darken
        if (isset($this->hexColors[$colorOrHex])) {
            return $this->approximateShade(Color::hex($this->hexColors[$colorOrHex]), $shade);
        }

        // If semantic with a palette, look up the palette shade directly
        if (isset($this->semanticColors[$colorOrHex])) {
            $palette = $this->semanticColors[$colorOrHex]['palette'];

            return Color::shade($palette, $shade);
        }

        // Try as a Tailwind palette name
        try {
            return Color::shade($colorOrHex, $shade);
        } catch (InvalidArgumentException) {
            throw new InvalidArgumentException("Cannot resolve shade for color: '{$colorOrHex}'.");
        }
    }

    /**
     * Generate a Tailwind CSS class for a color.
     *
     * For semantic names: returns 'prefix-paletteName-shade' (e.g., 'text-green-500').
     * For hex values: returns 'prefix-[#hex]' using Tailwind arbitrary value syntax.
     */
    public function toTailwindClass(string $colorOrHex, string $prefix = 'text', int $shade = 500): string
    {
        if (str_starts_with($colorOrHex, '#')) {
            return "{$prefix}-[{$colorOrHex}]";
        }

        if (isset($this->hexColors[$colorOrHex])) {
            return "{$prefix}-[{$this->hexColors[$colorOrHex]}]";
        }

        $palette = $this->getTailwindPalette($colorOrHex);

        if ($palette) {
            return "{$prefix}-{$palette}-{$shade}";
        }

        // Unknown — try using the value directly as a Tailwind color name
        return "{$prefix}-{$colorOrHex}-{$shade}";
    }

    /**
     * Map a color name to a PrimeVue severity string.
     *
     * Returns null for 'primary' (PrimeVue default) or unknown colors.
     */
    public function toPrimeVueSeverity(string $colorOrHex): ?string
    {
        return $this->primeVueSeverityMap[$colorOrHex] ?? null;
    }

    // ─── Internal ───────────────────────────────────────────────────

    /**
     * Get the Tailwind palette name for a semantic color.
     */
    protected function getTailwindPalette(string $name): ?string
    {
        if (isset($this->tailwindPaletteMap[$name])) {
            return $this->tailwindPaletteMap[$name];
        }

        if (isset($this->semanticColors[$name])) {
            return $this->semanticColors[$name]['palette'];
        }

        return null;
    }

    /**
     * Approximate a shade for a color that doesn't have a Tailwind palette.
     * Uses HSL lightness adjustment based on Tailwind shade semantics.
     */
    protected function approximateShade(Color $base, int $shade): Color
    {
        // Map shade to target lightness relative to base (500 = 1.0)
        $intensityMap = [
            50 => 0.95,
            100 => 0.9,
            200 => 0.75,
            300 => 0.6,
            400 => 0.3,
            500 => 0.0,
            600 => -0.1,
            700 => -0.25,
            800 => -0.4,
            900 => -0.51,
            950 => -0.7,
        ];

        $intensity = $intensityMap[$shade] ?? 0.0;

        if ($intensity > 0) {
            return $base->lighten($intensity);
        } elseif ($intensity < 0) {
            return $base->darken(abs($intensity));
        }

        return $base;
    }
}
