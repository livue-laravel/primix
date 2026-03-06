<?php

use Primix\Enums\PanelsRenderHook;

// ============================================================
// Enum Cases
// ============================================================

it('has PAGE_START case', function () {
    expect(PanelsRenderHook::PAGE_START->value)->toBe('panels::page.start');
});

it('has PAGE_END case', function () {
    expect(PanelsRenderHook::PAGE_END->value)->toBe('panels::page.end');
});

it('has PAGE_HEADER_ACTIONS_BEFORE case', function () {
    expect(PanelsRenderHook::PAGE_HEADER_ACTIONS_BEFORE->value)->toBe('panels::page.header-actions.before');
});

it('has PAGE_HEADER_ACTIONS_AFTER case', function () {
    expect(PanelsRenderHook::PAGE_HEADER_ACTIONS_AFTER->value)->toBe('panels::page.header-actions.after');
});

it('has RESOURCE_PAGE_FORM_BEFORE case', function () {
    expect(PanelsRenderHook::RESOURCE_PAGE_FORM_BEFORE->value)->toBe('panels::resource.form.before');
});

it('has RESOURCE_PAGE_FORM_AFTER case', function () {
    expect(PanelsRenderHook::RESOURCE_PAGE_FORM_AFTER->value)->toBe('panels::resource.form.after');
});

it('has RESOURCE_PAGE_TABLE_BEFORE case', function () {
    expect(PanelsRenderHook::RESOURCE_PAGE_TABLE_BEFORE->value)->toBe('panels::resource.table.before');
});

it('has RESOURCE_PAGE_TABLE_AFTER case', function () {
    expect(PanelsRenderHook::RESOURCE_PAGE_TABLE_AFTER->value)->toBe('panels::resource.table.after');
});

it('has RESOURCE_PAGE_HEADER_WIDGETS_BEFORE case', function () {
    expect(PanelsRenderHook::RESOURCE_PAGE_HEADER_WIDGETS_BEFORE->value)->toBe('panels::resource.header-widgets.before');
});

it('has RESOURCE_PAGE_HEADER_WIDGETS_AFTER case', function () {
    expect(PanelsRenderHook::RESOURCE_PAGE_HEADER_WIDGETS_AFTER->value)->toBe('panels::resource.header-widgets.after');
});

it('has RESOURCE_PAGE_FOOTER_WIDGETS_BEFORE case', function () {
    expect(PanelsRenderHook::RESOURCE_PAGE_FOOTER_WIDGETS_BEFORE->value)->toBe('panels::resource.footer-widgets.before');
});

it('has RESOURCE_PAGE_FOOTER_WIDGETS_AFTER case', function () {
    expect(PanelsRenderHook::RESOURCE_PAGE_FOOTER_WIDGETS_AFTER->value)->toBe('panels::resource.footer-widgets.after');
});

it('has SIDEBAR_NAV_START case', function () {
    expect(PanelsRenderHook::SIDEBAR_NAV_START->value)->toBe('panels::sidebar.nav.start');
});

it('has SIDEBAR_NAV_END case', function () {
    expect(PanelsRenderHook::SIDEBAR_NAV_END->value)->toBe('panels::sidebar.nav.end');
});

it('has CONTENT_BEFORE case', function () {
    expect(PanelsRenderHook::CONTENT_BEFORE->value)->toBe('panels::content.before');
});

it('has CONTENT_AFTER case', function () {
    expect(PanelsRenderHook::CONTENT_AFTER->value)->toBe('panels::content.after');
});

it('has CONTENT_START case', function () {
    expect(PanelsRenderHook::CONTENT_START->value)->toBe('panels::content.start');
});

it('has CONTENT_END case', function () {
    expect(PanelsRenderHook::CONTENT_END->value)->toBe('panels::content.end');
});

it('has TOPBAR_START case', function () {
    expect(PanelsRenderHook::TOPBAR_START->value)->toBe('panels::topbar.start');
});

it('has TOPBAR_END case', function () {
    expect(PanelsRenderHook::TOPBAR_END->value)->toBe('panels::topbar.end');
});

it('has GLOBAL_SEARCH_START case', function () {
    expect(PanelsRenderHook::GLOBAL_SEARCH_START->value)->toBe('panels::global-search.start');
});

it('has GLOBAL_SEARCH_END case', function () {
    expect(PanelsRenderHook::GLOBAL_SEARCH_END->value)->toBe('panels::global-search.end');
});

it('has TENANT_MENU_BEFORE case', function () {
    expect(PanelsRenderHook::TENANT_MENU_BEFORE->value)->toBe('panels::tenant-menu.before');
});

it('has TENANT_MENU_AFTER case', function () {
    expect(PanelsRenderHook::TENANT_MENU_AFTER->value)->toBe('panels::tenant-menu.after');
});

it('has USER_MENU_BEFORE case', function () {
    expect(PanelsRenderHook::USER_MENU_BEFORE->value)->toBe('panels::user-menu.before');
});

it('has USER_MENU_AFTER case', function () {
    expect(PanelsRenderHook::USER_MENU_AFTER->value)->toBe('panels::user-menu.after');
});

it('has DATABASE_NOTIFICATIONS_BEFORE case', function () {
    expect(PanelsRenderHook::DATABASE_NOTIFICATIONS_BEFORE->value)->toBe('panels::database-notifications.before');
});

it('has DATABASE_NOTIFICATIONS_AFTER case', function () {
    expect(PanelsRenderHook::DATABASE_NOTIFICATIONS_AFTER->value)->toBe('panels::database-notifications.after');
});

// ============================================================
// Count & From
// ============================================================

it('has exactly 28 cases', function () {
    expect(PanelsRenderHook::cases())->toHaveCount(28);
});

it('can be created from string value', function () {
    $hook = PanelsRenderHook::from('panels::page.start');

    expect($hook)->toBe(PanelsRenderHook::PAGE_START);
});
