@php
    $workspace = $page instanceof \Primix\Resources\Pages\Page
        ? $page->getWorkspacePayload()
        : null;
@endphp
<div class="space-y-8 lg:space-y-10">
    @renderHook(\Primix\Enums\PanelsRenderHook::PAGE_START)

    @if(($workspace['enabled'] ?? false) === true)
        <primix-resource-workspace-tabs
            :workspace='@json($workspace)'
        ></primix-resource-workspace-tabs>
    @endif

    <x-primix::page-header
        :title="$this->getHeading()"
        :subheading="$this->getSubheading()"
        :breadcrumbs="$this->getBreadcrumbs()"
        :actions="$this->getVisibleHeaderActions()"
    />

    @renderHook(\Primix\Enums\PanelsRenderHook::RESOURCE_PAGE_HEADER_WIDGETS_BEFORE)
    <x-primix::widgets :widgets="$this->getVisibleHeaderWidgets()" :columns="$this->getHeaderWidgetsColumns()" />
    @renderHook(\Primix\Enums\PanelsRenderHook::RESOURCE_PAGE_HEADER_WIDGETS_AFTER)

    @renderHook(\Primix\Enums\PanelsRenderHook::CONTENT_BEFORE)

    {{ $slot }}

    @renderHook(\Primix\Enums\PanelsRenderHook::CONTENT_AFTER)

    @renderHook(\Primix\Enums\PanelsRenderHook::RESOURCE_PAGE_FOOTER_WIDGETS_BEFORE)
    <x-primix::widgets :widgets="$this->getVisibleFooterWidgets()" :columns="$this->getFooterWidgetsColumns()" />
    @renderHook(\Primix\Enums\PanelsRenderHook::RESOURCE_PAGE_FOOTER_WIDGETS_AFTER)

    @fragment('modal')
    <x-primix-actions::modals />
    @endfragment

    @fragment('relation-table-modal')
    @include('primix::components.relation-table-modal')
    @endfragment

    @renderHook(\Primix\Enums\PanelsRenderHook::PAGE_END)

    <p-confirm-dialog></p-confirm-dialog>
</div>
