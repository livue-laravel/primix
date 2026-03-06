/**
 * Primix Preset for PrimeVue
 *
 * Creates a customized PrimeVue preset based on Aura.
 * Supports dynamic primary/surface colors, border radius, and custom tokens.
 */

import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import { palettes } from './palettes.js';

/**
 * Map a palette name to PrimeVue semantic primary color tokens.
 */
function buildPrimaryTokens(paletteName) {
    // Validate that the palette exists in our known palettes
    if (!palettes[paletteName]) return {};

    // Reference Aura's built-in primitive tokens by name
    // e.g. '{violet.500}' resolves to Aura's primitive.violet.500
    const tokens = {};
    for (const shade of [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]) {
        tokens[shade] = `{${paletteName}.${shade}}`;
    }

    return tokens;
}

/**
 * Map a palette name to PrimeVue surface tokens.
 *
 * Returns an object for use in semantic.colorScheme.light.surface
 * and semantic.colorScheme.dark.surface, referencing Aura's built-in
 * primitive palette tokens (e.g. '{zinc.50}').
 */
function buildSurfaceTokens(paletteName) {
    if (!palettes[paletteName]) return {};

    const tokens = {};
    for (const shade of [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]) {
        if (shade === 0) {
            tokens[shade] = '#ffffff';
        } else {
            tokens[shade] = `{${paletteName}.${shade}}`;
        }
    }

    return tokens;
}

/**
 * Map border radius preset name to PrimeVue primitive border radius tokens.
 */
function buildBorderRadiusTokens(size) {
    const radiusMap = {
        none: { xs: '0', sm: '0', md: '0', lg: '0', xl: '0' },
        sm: { xs: '2px', sm: '4px', md: '6px', lg: '8px', xl: '10px' },
        md: { xs: '2px', sm: '4px', md: '8px', lg: '12px', xl: '16px' },
        lg: { xs: '4px', sm: '6px', md: '10px', lg: '16px', xl: '20px' },
        xl: { xs: '4px', sm: '8px', md: '12px', lg: '20px', xl: '28px' },
        '2xl': { xs: '6px', sm: '10px', md: '16px', lg: '24px', xl: '32px' },
    };

    return radiusMap[size] || radiusMap.md;
}

/**
 * Recursively deep-merge two objects (source into target).
 */
function deepMerge(target, source) {
    const result = { ...target };

    for (const key of Object.keys(source)) {
        if (
            source[key] &&
            typeof source[key] === 'object' &&
            !Array.isArray(source[key]) &&
            target[key] &&
            typeof target[key] === 'object' &&
            !Array.isArray(target[key])
        ) {
            result[key] = deepMerge(target[key], source[key]);
        } else {
            result[key] = source[key];
        }
    }

    return result;
}

/**
 * Build a customized PrimeVue preset from the theme config provided by PHP.
 *
 * @param {Object} config - Theme configuration from window.LiVueData.primix.theme
 * @param {string} [config.primaryColor] - Tailwind palette name (e.g. 'indigo')
 * @param {string} [config.surfaceColor] - Tailwind palette name (e.g. 'zinc')
 * @param {string} [config.borderRadius] - Size preset (none|sm|md|lg|xl|2xl)
 * @param {Object} [config.tokens] - Custom design token overrides
 * @param {Object} [config.darkTokens] - Dark mode specific token overrides
 * @returns {Object} PrimeVue preset
 */
export function buildPreset(config = {}) {
    const overrides = {};

    // Primary color
    if (config.primaryColor && palettes[config.primaryColor]) {
        if (!overrides.semantic) overrides.semantic = {};
        overrides.semantic.primary = buildPrimaryTokens(config.primaryColor);
    }

    // Surface color (lives in semantic.colorScheme, referencing primitives)
    if (config.surfaceColor && palettes[config.surfaceColor]) {
        const surfaceTokens = buildSurfaceTokens(config.surfaceColor);
        if (!overrides.semantic) overrides.semantic = {};
        if (!overrides.semantic.colorScheme) overrides.semantic.colorScheme = {};
        overrides.semantic.colorScheme.light = deepMerge(
            overrides.semantic.colorScheme.light || {},
            { surface: surfaceTokens }
        );
        overrides.semantic.colorScheme.dark = deepMerge(
            overrides.semantic.colorScheme.dark || {},
            { surface: surfaceTokens }
        );
    }

    // Border radius
    if (config.borderRadius) {
        if (!overrides.primitive) overrides.primitive = {};
        overrides.primitive.borderRadius = buildBorderRadiusTokens(config.borderRadius);
    }

    // Custom token overrides (merged into semantic)
    if (config.tokens && Object.keys(config.tokens).length > 0) {
        if (!overrides.semantic) overrides.semantic = {};
        overrides.semantic = deepMerge(overrides.semantic, config.tokens);
    }

    // Dark mode token overrides
    if (config.darkTokens && Object.keys(config.darkTokens).length > 0) {
        if (!overrides.semantic) overrides.semantic = {};
        if (!overrides.semantic.colorScheme) overrides.semantic.colorScheme = {};
        if (!overrides.semantic.colorScheme.dark) overrides.semantic.colorScheme.dark = {};
        overrides.semantic.colorScheme.dark = deepMerge(
            overrides.semantic.colorScheme.dark,
            config.darkTokens
        );
    }

    // If no customization, return default Aura-based preset
    if (Object.keys(overrides).length === 0) {
        return definePreset(Aura, {
            semantic: {
                primary: buildPrimaryTokens('emerald'),
            },
        });
    }

    return definePreset(Aura, overrides);
}

/**
 * Default Primix preset (emerald primary, Aura defaults).
 */
export const PrimixPreset = definePreset(Aura, {
    semantic: {
        primary: buildPrimaryTokens('emerald'),
    },
});
