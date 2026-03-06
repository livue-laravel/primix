@php
    $state = $component->getState();
    $isEmpty = $state === null || $state === '';
    $placeholder = $component->getPlaceholder() ?? '-';
@endphp

@if($isEmpty)
    <span class="text-surface-500 dark:text-surface-400">{{ $placeholder }}</span>
@else
    <div class="prose prose-sm max-w-none dark:prose-invert">
        {!! (string) $state !!}
    </div>
@endif
