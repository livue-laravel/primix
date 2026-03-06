@php
    $state = $component->getState($record);
    $editable = $component->isEditable();
    $options = $component->getOptions();
    $columnName = $component->getName();
    $selectPlaceholder = $component->getSelectPlaceholder();
    $recordKey = $record->getKey();
@endphp

<div class="primix-select-column">
    @if($editable)
        <select
            @change="updateTableColumnState('{{ $columnName }}', {!! \Illuminate\Support\Js::from($recordKey) !!}, $event.target.value)"
            class="w-full rounded-md border border-surface-300 px-2 py-1.5 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
        >
            @if($selectPlaceholder)
                <option value="" disabled {{ $state === null ? 'selected' : '' }}>{{ $selectPlaceholder }}</option>
            @endif
            @foreach($options as $optValue => $optLabel)
                <option value="{{ $optValue }}" {{ (string) $state === (string) $optValue ? 'selected' : '' }}>{{ $optLabel }}</option>
            @endforeach
        </select>
    @else
        <span>{{ $options[$state] ?? $state ?? $component->getPlaceholder() ?? '—' }}</span>
    @endif
</div>
