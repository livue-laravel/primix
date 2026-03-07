/**
 * Primix Notifications - PrimeVue Message Components
 *
 * Registers toast and message components.
 */

import LiVue from 'livue';
import { ensurePrimeVueTheme } from '@primix/support/primix';

import '../css/index.css';

// Services (must be loaded eagerly)
import ToastService from 'primevue/toastservice';

const registerNotificationsComponents = (app) => {
    if (app?.config?.globalProperties?.__primixNotificationsReady) {
        return;
    }

    app.config.globalProperties.__primixNotificationsReady = true;

    ensurePrimeVueTheme(app);

    // Services
    app.use(ToastService);
};

LiVue.setup(registerNotificationsComponents);
