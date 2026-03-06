/**
 * Primix Tables - PrimeVue Data Components
 *
 * Registers components used by table filters.
 * Tables use Blade views with standard HTML (not PrimeVue DataTable).
 */

import LiVue from 'livue';
import DatePicker from 'primevue/datepicker';
import Select from 'primevue/select';
import SelectButton from 'primevue/selectbutton';
import { setupTheme } from '@primix/support/primix';

import '../css/index.css';

LiVue.setup((app) => {
    if (!app?.config?.globalProperties?.$primevue?.config) {
        setupTheme(app);
    }

    app.component('PDatePicker', DatePicker);
    app.component('PSelect', Select);
    app.component('PSelectButton', SelectButton);
});
