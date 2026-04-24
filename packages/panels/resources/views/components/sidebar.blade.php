<aside
    class="fixed left-0 z-40 hidden w-64 overflow-y-auto border-r border-surface-200 bg-white dark:border-surface-700 dark:bg-surface-900 lg:block"
    style="top: 4rem; bottom: 0; height: calc(100vh - 4rem);"
>
    {{-- @todo da abilitare quando sistemiamo la possibilità di non avere la topbar
    <div class="flex h-16 items-center justify-center border-b border-gray-200 dark:border-gray-700">
        <x-primix::brand :brandLogo="$brandLogo" :brandLogoDark="$brandLogoDark" :brandName="$brandName" />
    </div>
     --}}

    <nav class="mt-6 space-y-1 px-3 pb-6">
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
</aside>
