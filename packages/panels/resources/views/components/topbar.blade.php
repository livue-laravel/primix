@persist
@php
    $notificationTranslations = [
        'title' => __('primix::panel.notifications_panel.title'),
        'bell_label' => __('primix::panel.notifications_panel.bell_label'),
        'mark_all_read' => __('primix::panel.notifications_panel.mark_all_read'),
        'no_notifications' => __('primix::panel.notifications_panel.no_notifications'),
        'loading' => __('primix::panel.notifications_panel.loading'),
        'load_more' => __('primix::panel.notifications_panel.load_more'),
        'close' => __('primix::panel.actions.close'),
    ];
@endphp
<div class="{{ $fixedTopbar ? 'fixed' : 'sticky' }} top-0 left-0 right-0 z-50">
    {{-- === NAVIGATION BAR (topbar mode only) === --}}
    @if($topBarNavigation)
        <header class="min-h-10 border-b border-gray-100 bg-white dark:border-gray-700/50 dark:bg-gray-900">
            <p-menubar :model="menuItems" :pt="menubarPt"></p-menubar>
        </header>
    @endif
    {{-- === TOOLBAR === --}}
    <header
        class="flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-100 bg-white px-4 shadow-[0_1px_0_rgba(15,23,42,0.04)] dark:border-gray-700/50 dark:bg-gray-900 sm:gap-x-6 sm:px-6 lg:px-8">

        @renderHook(\Primix\Enums\PanelsRenderHook::TOPBAR_START)

        <div class="mr-6 flex-shrink-0">
            <x-primix::brand
                :brandLogo="$brandLogo"
                :brandLogoDark="$brandLogoDark"
                :brandName="$brandName"
                inlineClass="inline-block"
                textClasses="text-lg font-semibold tracking-tight text-surface-950 dark:text-surface-50"
            />
        </div>

        @if(!$topBarNavigation)
            <x-primix::mobile-menu-button @click="mobileSidebarOpen = true" />

            <div class="h-6 w-px bg-surface-200 dark:bg-surface-700 lg:hidden"></div>
        @endif

        <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            @renderHook(\Primix\Enums\PanelsRenderHook::GLOBAL_SEARCH_START)

            @if($hasGlobalSearch)
                <primix-global-search
                    mode="{{ $globalSearchMode }}"
                    :spa="{{ $spa ? 'true' : 'false' }}"
                ></primix-global-search>
            @else
                <div class="flex-1"></div>
            @endif

            @renderHook(\Primix\Enums\PanelsRenderHook::GLOBAL_SEARCH_END)
        </div>

        {{-- Right side: panel switcher + dark mode + profile --}}
        <div class="flex items-center gap-x-4 lg:gap-x-6">
            @if($showPanelSwitcher)
                <x-primix::panel-switcher
                    :panels="app(\Primix\PanelRegistry::class)->all()"
                    :currentPanelId="app(\Primix\PanelRegistry::class)->getCurrentPanelId()"
                />
            @endif

            {{-- Tenant menu --}}
            @if($hasTenantMenu)
                @renderHook(\Primix\Enums\PanelsRenderHook::TENANT_MENU_BEFORE)
                <primix-tenant-menu
                    :tenant-menu="tenantMenu"
                    :spa="spa"
                ></primix-tenant-menu>
                @renderHook(\Primix\Enums\PanelsRenderHook::TENANT_MENU_AFTER)

                <x-primix::separator />
            @endif

            {{-- Database notifications --}}
            @if($hasDatabaseNotifications)
                @renderHook(\Primix\Enums\PanelsRenderHook::DATABASE_NOTIFICATIONS_BEFORE)
                <primix-notification-bell
                    mode="{{ $databaseNotificationsMode }}"
                    :polling-interval="{{ $databaseNotificationsPollingInterval }}"
                    :translations='@json($notificationTranslations)'
                ></primix-notification-bell>
                @renderHook(\Primix\Enums\PanelsRenderHook::DATABASE_NOTIFICATIONS_AFTER)

                <x-primix::separator />
            @endif

            {{-- Dark mode toggle --}}
            @if($hasDarkMode)
                <primix-theme-toggle></primix-theme-toggle>

                <x-primix::separator />
            @endif

            {{-- User menu dropdown --}}
            @renderHook(\Primix\Enums\PanelsRenderHook::USER_MENU_BEFORE)
            @if($showUserMenu)
                <primix-user-menu :user-menu="userMenu" :spa="spa" csrf-token="{{ csrf_token() }}"></primix-user-menu>
            @endif
            @renderHook(\Primix\Enums\PanelsRenderHook::USER_MENU_AFTER)
        </div>

        @renderHook(\Primix\Enums\PanelsRenderHook::TOPBAR_END)
    </header>

    @if(!$topBarNavigation)
        <p-drawer
            v-model:visible="mobileSidebarOpen"
            position="left"
            :pt="{ root: { class: 'lg:hidden w-64' }, content: { class: 'p-0' } }"
        >
            <template #header>
                <x-primix::brand
                    :brandLogo="$brandLogo"
                    :brandLogoDark="$brandLogoDark"
                    :brandName="$brandName"
                    inlineClass="inline-block"
                    textClasses="text-lg font-semibold tracking-tight text-surface-950 dark:text-surface-50"
                />
            </template>
            <nav class="space-y-1 px-3 pb-6" @click="mobileSidebarOpen = false">
                @renderHook(\Primix\Enums\PanelsRenderHook::SIDEBAR_NAV_START)

                @foreach($navigation as $item)
                    @if(isset($item['items']))
                        <x-primix::navigation-group :item="$item" :spa="$spa" />
                    @else
                        <x-primix::navigation-item :item="$item" :spa="$spa" />
                    @endif
                @endforeach

                @renderHook(\Primix\Enums\PanelsRenderHook::SIDEBAR_NAV_END)
            </nav>
        </p-drawer>
    @endif
</div>

@script
<script>
const mobileSidebarOpen = ref(false);
return { mobileSidebarOpen };
</script>
@endscript

@endpersist
