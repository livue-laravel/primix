/**
 * Primix JavaScript Entry Point
 *
 * This file configures PrimeVue and other Vue plugins for Primix.
 * Import this file in your app.js to enable PrimeVue components.
 *
 * Usage:
 *   import './vendor/primix/primix.js';
 *   // or if using a build alias:
 *   import 'primix';
 */

import LiVue from 'livue';
import { setupTheme, PrimeVue, PrimixPreset } from './theme/index.js';

// Configure LiVue with PrimeVue using Primix theme
LiVue.setup((app) => {
    setupTheme(app);
});

// Export for potential direct usage
export { setupTheme, PrimeVue, PrimixPreset };
