<x-primix::pages.page :page="$this">
    @renderHook(\Primix\Enums\PanelsRenderHook::RESOURCE_PAGE_FORM_BEFORE)
    {{ $this->form }}
    @renderHook(\Primix\Enums\PanelsRenderHook::RESOURCE_PAGE_FORM_AFTER)

    @if($this->hasRelationManagers())
        <div class="mt-12">
            <x-primix::relation-managers
                :managers="$this->getRelationManagers()"
                :owner-class="get_class($this->record)"
                :owner-key="$this->record->getKey()"
            />
        </div>
    @endif
</x-primix::pages.page>

