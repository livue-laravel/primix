<?php

namespace Primix\Enums;

enum PanelsRenderHook: string
{
    case PAGE_START = 'panels::page.start';
    case PAGE_END = 'panels::page.end';
    case PAGE_HEADER_ACTIONS_BEFORE = 'panels::page.header-actions.before';
    case PAGE_HEADER_ACTIONS_AFTER = 'panels::page.header-actions.after';
    case RESOURCE_PAGE_FORM_BEFORE = 'panels::resource.form.before';
    case RESOURCE_PAGE_FORM_AFTER = 'panels::resource.form.after';
    case RESOURCE_PAGE_TABLE_BEFORE = 'panels::resource.table.before';
    case RESOURCE_PAGE_TABLE_AFTER = 'panels::resource.table.after';
    case RESOURCE_PAGE_HEADER_WIDGETS_BEFORE = 'panels::resource.header-widgets.before';
    case RESOURCE_PAGE_HEADER_WIDGETS_AFTER = 'panels::resource.header-widgets.after';
    case RESOURCE_PAGE_FOOTER_WIDGETS_BEFORE = 'panels::resource.footer-widgets.before';
    case RESOURCE_PAGE_FOOTER_WIDGETS_AFTER = 'panels::resource.footer-widgets.after';
    case SIDEBAR_NAV_START = 'panels::sidebar.nav.start';
    case SIDEBAR_NAV_END = 'panels::sidebar.nav.end';
    case CONTENT_BEFORE = 'panels::content.before';
    case CONTENT_AFTER = 'panels::content.after';
    case CONTENT_START = 'panels::content.start';
    case CONTENT_END = 'panels::content.end';
    case TOPBAR_START = 'panels::topbar.start';
    case TOPBAR_END = 'panels::topbar.end';
    case GLOBAL_SEARCH_START = 'panels::global-search.start';
    case GLOBAL_SEARCH_END = 'panels::global-search.end';
    case TENANT_MENU_BEFORE = 'panels::tenant-menu.before';
    case TENANT_MENU_AFTER = 'panels::tenant-menu.after';
    case USER_MENU_BEFORE = 'panels::user-menu.before';
    case USER_MENU_AFTER = 'panels::user-menu.after';
    case DATABASE_NOTIFICATIONS_BEFORE = 'panels::database-notifications.before';
    case DATABASE_NOTIFICATIONS_AFTER = 'panels::database-notifications.after';
}
