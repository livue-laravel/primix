/**
 * Primix Theme Setup
 *
 * Reads theme configuration from window.LiVueData.primix.theme,
 * builds a customized PrimeVue preset, and initializes PrimeVue.
 */

import PrimeVue from 'primevue/config';
import { buildPreset, PrimixPreset } from './preset.js';
import { primixDefaultPT, mergePT } from './passthrough.js';

/**
 * Set up PrimeVue with the Primix theme configuration.
 *
 * Reads config from window.LiVueData.primix.theme (injected by PHP ThemeManager)
 * and configures PrimeVue accordingly. Falls back to defaults if no config found.
 *
 * @param {import('vue').App} app - Vue application instance
 */
export function setupTheme(app) {
    const primixData = window.LiVueData?.primix;
    const themeConfig = primixData?.theme;
    const ptConfig = primixData?.pt;

    // Build preset from PHP config or use defaults
    const preset = themeConfig ? buildPreset(themeConfig) : PrimixPreset;

    // Merge PassThrough: JS defaults + PHP overrides
    const pt = mergePT(primixDefaultPT, ptConfig || null);

    // Build PrimeVue options
    const options = {
        theme: {
            preset,
            options: {
                darkModeSelector: '.dark',
                cssLayer: {
                    name: 'primevue',
                    order: 'theme, base, primevue',
                },
            },
        },
        ripple: true,
    };

    // Only add PT if there are entries
    if (pt && Object.keys(pt).length > 0) {
        options.pt = pt;
    }

    app.use(PrimeVue, options);
}

export { PrimeVue, PrimixPreset };
