/**
 * Primix JavaScript Entry Point
 *
 * This file configures PrimeVue and other Vue plugins for Primix.
 * Import this file in your app.js to enable PrimeVue components.
 *
 * Usage:
 *   import './vendor/livue/primix/support/primix-support.js';
 *   // or if using a build alias:
 *   import '@primix/support';
 */

import LiVue from 'livue';
import { setupTheme, PrimeVue, PrimixPreset } from './theme/index.js';

/**
 * Ensure the current bundle's PrimeVue plugin instance is installed.
 *
 * Primix bundles are built independently and may each include a different
 * PrimeVue plugin object reference. Checking only $primevue is not enough:
 * it can be populated by another bundle instance.
 */
export function ensurePrimeVueTheme(app) {
    const plugins = app?._context?.plugins;
    const hasCurrentPrimeVue = Boolean(
        plugins &&
        typeof plugins.has === 'function' &&
        plugins.has(PrimeVue)
    );

    if (!hasCurrentPrimeVue) {
        setupTheme(app);
    }
}

const registerPrimeVueTheme = (app) => {
    ensurePrimeVueTheme(app);
};

LiVue.setup(registerPrimeVueTheme);

// Export for potential direct usage
export { setupTheme, PrimeVue, PrimixPreset };
