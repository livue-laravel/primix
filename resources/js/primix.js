/**
 * Primix - Complete Bundle
 *
 * This file imports and configures all Primix packages with PrimeVue.
 * Import this for a full Primix installation with all components.
 *
 * Usage:
 *   import 'primix';
 *
 * Or import individual packages for tree-shaking:
 *   import 'primix/support';
 *   import 'primix/forms';
 */

// Core configuration (PrimeVue setup)
import '../../packages/support/resources/js/primix.js';

// Package components
import '@primix/support';
import '@primix/forms';
import '@primix/tables';
import '@primix/actions';
import '@primix/notifications';
import '@primix/widgets';
import '@primix/panels';

// Re-export for advanced usage
export * from '../../packages/support/resources/js/primix.js';
