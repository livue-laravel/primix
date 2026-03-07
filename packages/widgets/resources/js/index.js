/**
 * Primix Widgets - Chart & Visualization Components
 *
 * Registers chart and data visualization components.
 * Components are registered as needed.
 */

import LiVue from 'livue';
import { ensurePrimeVueTheme } from '@primix/support/primix';

import '../css/index.css';

// Chart (requires chart.js as peer dependency)
import Chart from 'primevue/chart';

// Data Visualization
import MeterGroup from 'primevue/metergroup';
import ProgressBar from 'primevue/progressbar';

// Sparkline (mini chart for stat cards)
import Sparkline from './components/Sparkline.vue';

const registerWidgetsComponents = (app) => {
    if (app?.config?.globalProperties?.__primixWidgetsReady) {
        return;
    }

    app.config.globalProperties.__primixWidgetsReady = true;

    ensurePrimeVueTheme(app);

    // Chart
    app.component('PChart', Chart);

    // Data Visualization
    app.component('PMeterGroup', MeterGroup);
    app.component('PProgressBar', ProgressBar);

    // Sparkline
    app.component('PrimixSparkline', Sparkline);
};

LiVue.setup(registerWidgetsComponents);
