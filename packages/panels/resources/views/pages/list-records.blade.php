<x-primix::pages.page :page="$this">
    @renderHook(\Primix\Enums\PanelsRenderHook::RESOURCE_PAGE_TABLE_BEFORE)
    {{-- The 'table' fragment matches #[Fragment('modal', 'table')] on
         RerendersTableAfterAction::callAction so that row/header actions
         (delete, edit, etc.) re-render the table after mutating data. --}}
    @fragment('table')
    <div class="mt-6">
        {{ $this->table }}
    </div>
    @endfragment
    @renderHook(\Primix\Enums\PanelsRenderHook::RESOURCE_PAGE_TABLE_AFTER)
</x-primix::pages.page>
