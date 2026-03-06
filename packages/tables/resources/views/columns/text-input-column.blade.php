@php
    $state = $component->getState($record);
    $editable = $component->isEditable();
    $inputType = $component->getInputType();
    $step = $component->getStep();
    $recordKey = $record->getKey();
    $columnName = $component->getName();
@endphp

<div class="primix-text-input-column">
    @if($editable)
        <input
            type="{{ $inputType }}"
            value="{{ e($state ?? '') }}"
            @if($step) step="{{ $step }}" @endif
            @if($component->getPlaceholder()) placeholder="{{ $component->getPlaceholder() }}" @endif
            @change="updateTableColumnState('{{ $columnName }}', {!! \Illuminate\Support\Js::from($recordKey) !!}, $event.target.value)"
            class="w-full rounded-md border border-surface-300 px-2 py-1.5 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
        />
    @else
        <span>{{ $state ?? $component->getPlaceholder() ?? '—' }}</span>
    @endif
</div>
