/**
 * Primix Notifications - PrimeVue Message Components
 *
 * Registers toast and message components.
 */

import LiVue from 'livue';
import { setupTheme } from '@primix/support/primix';

import '../css/index.css';

// Services (must be loaded eagerly)
import ToastService from 'primevue/toastservice';

LiVue.setup((app) => {
    if (!app?.config?.globalProperties?.$primevue?.config) {
        setupTheme(app);
    }

    // Services
    app.use(ToastService);
});
