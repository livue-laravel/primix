@php
    $style = $style ?? [];
    $items = $component->getItems();
    $blankItemJson = \Illuminate\Support\Js::from($component->getBlankItemData());
    $canAdd = $addable && ($maxItems === null || count($items) < $maxItems);
    $canDelete = $deletable && ($minItems === null || count($items) > $minItems);
    $schema = $component->getSchema();
    $columns = $component->getTableColumns();
    $hasActions = $reorderable || $cloneable || $canDelete;

    $tableStyle = $style['table'] ?? [];
    $tableClass = is_array($tableStyle) ? ($tableStyle['class'] ?? '') : '';
    $theadStyle = $style['thead'] ?? [];
    $theadClass = is_array($theadStyle) ? ($theadStyle['class'] ?? '') : '';
    $thStyle = $style['th'] ?? [];
    $thClass = is_array($thStyle) ? ($thStyle['class'] ?? '') : '';
    $tbodyStyle = $style['tbody'] ?? [];
    $tbodyClass = is_array($tbodyStyle) ? ($tbodyStyle['class'] ?? '') : '';
    $trStyle = $style['tr'] ?? [];
    $trClass = is_array($trStyle) ? ($trStyle['class'] ?? '') : '';
    $tdStyle = $style['td'] ?? [];
    $tdClass = is_array($tdStyle) ? ($tdStyle['class'] ?? '') : '';
@endphp

<div class="primix-repeater primix-repeater-table">
    <div class="overflow-x-auto">
        <table class="w-full{{ $tableClass ? " {$tableClass}" : '' }}">
            <thead class="{{ $theadClass }}">
                <tr>
                    @foreach($columns as $col)
                        <th
                            class="text-left text-sm font-medium text-surface-600 dark:text-surface-400 px-2 py-2{{ $thClass ? " {$thClass}" : '' }}"
                            @if($col['width']) style="width: {{ $col['width'] }}" @endif
                        >
                            {{ $col['label'] }}
                            @if($col['required'])
                                <span class="text-red-500">*</span>
                            @endif
                        </th>
                    @endforeach
                    @if($hasActions)
                        <th class="w-px px-2 py-2{{ $thClass ? " {$thClass}" : '' }}"></th>
                    @endif
                </tr>
            </thead>
            <tbody class="{{ $tbodyClass }}">
                @forelse($items as $index => $item)
                    <tr class="primix-repeater-table-row border-t border-surface-200 dark:border-surface-700{{ $trClass ? " {$trClass}" : '' }}">
                        @foreach($schema as $child)
                            <td class="px-2 py-1.5 align-top{{ $tdClass ? " {$tdClass}" : '' }}">
                                <div class="primix-repeater-table-cell">
                                    {!! $component->renderItemFieldForTable($child, $index) !!}
                                </div>
                            </td>
                        @endforeach
                        @if($hasActions)
                            <td class="px-2 py-1.5 align-top">
                                <div class="flex items-center gap-0.5 justify-end">
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
                            </td>
                        @endif
                    </tr>
                @empty
                    <tr>
                        <td colspan="{{ count($columns) + ($hasActions ? 1 : 0) }}" class="text-center py-6 text-surface-400">
                            <i class="pi pi-list text-2xl mb-2"></i>
                            <p class="text-sm">No items yet. Click below to add one.</p>
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    {{-- Add button --}}
    @if($canAdd && !$disabled)
        <div class="mt-2">
            <p-button
                label="{{ $addActionLabel }}"
                icon="pi pi-plus"
                outlined
                class="w-full"
                @click="repeaterAddItem('{{ $statePath }}', {!! $blankItemJson !!})"
            ></p-button>
        </div>
    @endif
</div>
