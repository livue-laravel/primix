<x-primix::pages.page :page="$this">
    @renderHook(\Primix\Enums\PanelsRenderHook::RESOURCE_PAGE_FORM_BEFORE)
    {{ $this->form }}
    @renderHook(\Primix\Enums\PanelsRenderHook::RESOURCE_PAGE_FORM_AFTER)
</x-primix::pages.page>
