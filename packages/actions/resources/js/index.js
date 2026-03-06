/**
 * Primix Actions - PrimeVue Button & Dialog Components
 *
 * Registers buttons, menus, and dialog components.
 */

import LiVue from 'livue';
import { setupTheme } from '@primix/support/primix';

import '../css/index.css';

// Buttons
import Button from 'primevue/button';
import ButtonGroup from 'primevue/buttongroup';

// Menus
import Menu from 'primevue/menu';

// Dialog & Overlay
import Dialog from 'primevue/dialog';
import ConfirmDialog from 'primevue/confirmdialog';
import SpeedDial from 'primevue/speeddial';

// Services
import ConfirmationService from 'primevue/confirmationservice';
import DialogService from 'primevue/dialogservice';

// Store confirm instance globally
let confirmInstance = null;

LiVue.setup((app) => {
    if (!app?.config?.globalProperties?.$primevue?.config) {
        setupTheme(app);
    }

    // Buttons
    app.component('PButton', Button);
    app.component('PButtonGroup', ButtonGroup);

    // Menus
    app.component('PMenu', Menu);

    // Dialog & Overlay
    app.component('PDialog', Dialog);
    app.component('PConfirmDialog', ConfirmDialog);
    // PPopover is registered by the support package
    app.component('PSpeedDial', SpeedDial);

    // Services
    app.use(ConfirmationService);
    app.use(DialogService);

    // Capture confirm instance on mount
    app.mixin({
        mounted() {
            if (!confirmInstance && this.$confirm) {
                confirmInstance = this.$confirm;
            }
        }
    });
});

// Set custom confirm handler for LiVue
LiVue.setConfirmHandler((config) => {
    return new Promise((resolve) => {
        if (!confirmInstance) {
            // Fallback to native confirm if PrimeVue not ready
            resolve(window.confirm(config.message));
            return;
        }

        confirmInstance.require({
            message: config.message,
            header: config.title || 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: config.confirmText || 'Confirm',
            rejectLabel: config.cancelText || 'Cancel',
            accept: () => resolve(true),
            reject: () => resolve(false),
        });
    });
});
