<x-primix::pages.page :page="$this">
    @renderHook(\Primix\Enums\PanelsRenderHook::RESOURCE_PAGE_TABLE_BEFORE)
    <div class="mt-6">
        {{ $this->table }}
    </div>
    @renderHook(\Primix\Enums\PanelsRenderHook::RESOURCE_PAGE_TABLE_AFTER)
</x-primix::pages.page>
