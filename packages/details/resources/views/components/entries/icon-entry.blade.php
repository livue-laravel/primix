@php
    $icon = $component->getIcon();
    $isEmpty = $icon === null || trim($icon) === '';
    $placeholder = $component->getPlaceholder() ?? '-';
@endphp

@if($isEmpty)
    <span class="text-surface-500 dark:text-surface-400">{{ $placeholder }}</span>
@else
    <span class="inline-flex items-center gap-2">
        <i class="{{ $icon }}"></i>

        @if($component->shouldShowClassName())
            <span class="text-xs text-surface-500 dark:text-surface-400">{{ $icon }}</span>
        @endif
    </span>
@endif
