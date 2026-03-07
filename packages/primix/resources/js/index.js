/**
 * Primix Panels - Navigation Components
 *
 * Registers navigation and panel-specific components.
 */

import LiVue from 'livue';

import '../css/index.css';

import Dropdown from './components/Dropdown.vue';
import Collapsible from './components/Collapsible.vue';
import Toast from './components/Toast.vue';
import NotificationToasts from './components/NotificationToasts.vue';
import ThemeToggle from './components/ThemeToggle.vue';
import UserMenu from './components/UserMenu.vue';
import TenantMenu from './components/TenantMenu.vue';
import GlobalSearch from './components/GlobalSearch.vue';
import NotificationBell from './components/NotificationBell.vue';

const registerPanelComponents = (app) => {
    if (app?.config?.globalProperties?.__primixPanelsReady) {
        return;
    }

    app.config.globalProperties.__primixPanelsReady = true;

    app.component('PrimixDropdown', Dropdown);
    app.component('PrimixCollapsible', Collapsible);
    app.component('PrimixToast', Toast);
    app.component('PrimixNotificationToasts', NotificationToasts);
    app.component('PrimixThemeToggle', ThemeToggle);
    app.component('PrimixUserMenu', UserMenu);
    app.component('PrimixTenantMenu', TenantMenu);
    app.component('PrimixGlobalSearch', GlobalSearch);
    app.component('PrimixNotificationBell', NotificationBell);
};

LiVue.setup(registerPanelComponents);
