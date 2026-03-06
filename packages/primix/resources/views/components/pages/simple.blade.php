<div>
    @renderHook(\Primix\Enums\PanelsRenderHook::PAGE_START)

    {{ $slot }}

    @renderHook(\Primix\Enums\PanelsRenderHook::PAGE_END)
</div>
