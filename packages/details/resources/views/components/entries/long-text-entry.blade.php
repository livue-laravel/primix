@php
    $state = $component->getState();
    $isEmpty = $state === null || $state === '';
    $placeholder = $component->getPlaceholder() ?? '-';
    $lineClamp = $component->getLineClamp();
@endphp

@if($isEmpty)
    <span class="text-surface-500 dark:text-surface-400">{{ $placeholder }}</span>
@else
    <div
        @class([
            'whitespace-pre-wrap' => $component->shouldPreserveLineBreaks(),
        ])
        @if($lineClamp)
            style="display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden; -webkit-line-clamp: {{ $lineClamp }};"
        @endif
    >
        @if($component->isHtml())
            {!! (string) $state !!}
        @else
            {{ $state }}
        @endif
    </div>
@endif
