/**
 * Primix Support - PrimeVue Layout Components
 *
 * Registers common layout and utility components.
 */

import LiVue from 'livue';
import { setupTheme } from './theme/index.js';

import '../css/index.css';

// PrimeIcons - used across all packages
import 'primeicons/primeicons.css';

// Layout Components
import Card from 'primevue/card';
import Panel from 'primevue/panel';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import Fieldset from 'primevue/fieldset';

// Navigation Components
import Menubar from 'primevue/menubar';
import Breadcrumb from 'primevue/breadcrumb';

// Overlay Components
import Popover from 'primevue/popover';
import Tooltip from 'primevue/tooltip';

// Misc Components
import Badge from 'primevue/badge';
import Tag from 'primevue/tag';

LiVue.setup((app) => {
    if (!app?.config?.globalProperties?.$primevue?.config) {
        setupTheme(app);
    }

    // Layout
    app.component('PCard', Card);
    app.component('PPanel', Panel);
    app.component('PTabs', Tabs);
    app.component('PTabList', TabList);
    app.component('PTab', Tab);
    app.component('PTabPanels', TabPanels);
    app.component('PTabPanel', TabPanel);
    app.component('PFieldset', Fieldset);

    // Navigation
    app.component('PMenubar', Menubar);
    app.component('PBreadcrumb', Breadcrumb);

    // Overlay
    app.component('PPopover', Popover);

    // Directives
    app.directive('tooltip', Tooltip);

    // Misc
    app.component('PBadge', Badge);
    app.component('PTag', Tag);
});
