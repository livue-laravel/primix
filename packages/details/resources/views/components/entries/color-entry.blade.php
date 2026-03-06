@php
    $color = $component->getColor();
    $isEmpty = $color === null || trim($color) === '';
    $placeholder = $component->getPlaceholder() ?? '-';
    $swatchSize = $component->getSwatchSize();
@endphp

@if($isEmpty)
    <span class="text-surface-500 dark:text-surface-400">{{ $placeholder }}</span>
@else
    <span class="inline-flex items-center gap-2">
        @if($component->shouldShowSwatch())
            <span class="inline-block rounded border border-surface-200 dark:border-surface-700"
                style="width: {{ $swatchSize }}px; height: {{ $swatchSize }}px; background-color: {{ $color }};"
            ></span>
        @endif

        <span>{{ $color }}</span>
    </span>
@endif
