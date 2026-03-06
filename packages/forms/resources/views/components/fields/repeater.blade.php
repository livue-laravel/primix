@php
    $style = $style ?? [];
    $items = $component->getItems();
    $blankItemJson = \Illuminate\Support\Js::from($component->getBlankItemData());
    $gridCols = $component->getGridColumns();
    $gridStyle = $gridCols > 1 ? "--cols: {$gridCols};" : '--cols: 1;';
    $canAdd = $addable && ($maxItems === null || count($items) < $maxItems);
    $canDelete = $deletable && ($minItems === null || count($items) > $minItems);

    $containerStyle = $style['container'] ?? [];
    $containerClass = is_array($containerStyle) ? ($containerStyle['class'] ?? '') : '';
    $itemStyle = $style['item'] ?? [];
    $itemClass = is_array($itemStyle) ? ($itemStyle['class'] ?? '') : '';
    $headerStyle = $style['header'] ?? [];
    $headerClass = is_array($headerStyle) ? ($headerStyle['class'] ?? '') : '';
@endphp

<div class="primix-repeater{{ $containerClass ? " {$containerClass}" : '' }}">
    @forelse($items as $index => $item)
        <div class="primix-repeater-item{{ $itemClass ? " {$itemClass}" : '' }}">
            {{-- Item header --}}
            <div class="primix-repeater-item-header{{ $headerClass ? " {$headerClass}" : '' }}">
                <span class="primix-repeater-item-label font-medium text-sm text-surface-600 dark:text-surface-400">
                    @if($itemLabel)
                        {{ $itemLabel }} #{{ $index + 1 }}
                    @else
                        Item #{{ $index + 1 }}
                    @endif
                </span>

                <div class="primix-repeater-item-actions flex items-center gap-1">
                    @if($reorderable && $index > 0)
                        <p-button
                            icon="pi pi-arrow-up"
                            text
                            size="small"
                            severity="secondary"
                            @click="repeaterMoveItem('{{ $statePath }}', {{ $index }}, {{ $index - 1 }})"
                        ></p-button>
                    @endif
                    @if($reorderable && $index < count($items) - 1)
                        <p-button
                            icon="pi pi-arrow-down"
                            text
                            size="small"
                            severity="secondary"
                            @click="repeaterMoveItem('{{ $statePath }}', {{ $index }}, {{ $index + 1 }})"
                        ></p-button>
                    @endif
                    @if($cloneable)
                        <p-button
                            icon="pi pi-copy"
                            text
                            size="small"
                            severity="secondary"
                            @click="repeaterCloneItem('{{ $statePath }}', {{ $index }})"
                        ></p-button>
                    @endif
                    @if($canDelete)
                        <p-button
                            icon="pi pi-trash"
                            text
                            size="small"
                            severity="danger"
                            @click="repeaterRemoveItem('{{ $statePath }}', {{ $index }})"
                        ></p-button>
                    @endif
                </div>
            </div>

            {{-- Item fields --}}
            <div class="primix-repeater-item-content">
                <div class="primix-grid" style="{{ $gridStyle }}">
                    @foreach($component->getSchema() as $child)
                        <div class="primix-grid-item">
                            {!! $component->renderItemField($child, $index) !!}
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    @empty
        <div class="primix-repeater-empty text-center py-6 text-surface-400">
            <i class="pi pi-list text-2xl mb-2"></i>
            <p class="text-sm">No items yet. Click below to add one.</p>
        </div>
    @endforelse

    {{-- Add button --}}
    @if($canAdd && !$disabled)
        <p-button
            label="{{ $addActionLabel }}"
            icon="pi pi-plus"
            outlined
            class="w-full"
            @click="repeaterAddItem('{{ $statePath }}', {!! $blankItemJson !!})"
        ></p-button>
    @endif
</div>
