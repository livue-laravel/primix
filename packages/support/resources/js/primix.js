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
 * Ensure PrimeVue is installed on the given Vue app instance.
 *
 * Multiple Primix bundles each call LiVue.setup(registerPrimeVueTheme) and
 * each bundle contains its own copy of the PrimeVue object reference. Using
 * Vue's internal WeakSet (app._context.plugins) to detect duplicates does not
 * work across bundles because each bundle's PrimeVue reference is distinct.
 *
 * Instead we rely on $primevue which PrimeVue sets in globalProperties during
 * install(). This is the authoritative signal that PrimeVue is already active
 * on this app, regardless of which bundle performed the installation.
 */
export function ensurePrimeVueTheme(app) {
    if (app.config?.globalProperties?.$primevue) return;
    setupTheme(app);
}

const registerPrimeVueTheme = (app) => {
    ensurePrimeVueTheme(app);
};

LiVue.setup(registerPrimeVueTheme);

// Export for potential direct usage
export { setupTheme, PrimeVue, PrimixPreset };
