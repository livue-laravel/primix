<aside
    class="fixed left-0 z-40 hidden w-64 overflow-y-auto border-r border-gray-100 bg-white dark:border-gray-700/50 dark:bg-gray-900 lg:block"
    style="top: 4rem; bottom: 0; height: calc(100vh - 4rem);"
>
    {{-- @todo da abilitare quando sistemiamo la possibilità di non avere la topbar
    <div class="flex h-16 items-center justify-center border-b border-gray-200 dark:border-gray-700">
        <x-primix::brand :brandLogo="$brandLogo" :brandLogoDark="$brandLogoDark" :brandName="$brandName" />
    </div>
     --}}

    <nav class="mt-6 space-y-1 px-3 pb-6">
        @renderHook(\Primix\Enums\PanelsRenderHook::SIDEBAR_NAV_START)

        <x-primix::navigation-list :navigation="$navigation" :spa="$spa" />

        @renderHook(\Primix\Enums\PanelsRenderHook::SIDEBAR_NAV_END)
    </nav>
</aside>
