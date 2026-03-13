@php
    $state = $component->resolveBooleanState();
    $isEmpty = $state === null;
    $placeholder = $component->getPlaceholder() ?? '-';

    $isTrue = $state === true;
    $label = $isTrue ? $component->getTrueLabel() : $component->getFalseLabel();
    $icon = $isTrue ? $component->getTrueIcon() : $component->getFalseIcon();
@endphp

@if($isEmpty)
    <span class="text-surface-500 dark:text-surface-400">{{ $placeholder }}</span>
@else
    <span @class([
        'inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium',
        'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200' => $isTrue,
        'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200' => ! $isTrue,
    ])>
        @if($icon)
            {!! app(\Primix\Support\Icons\IconManager::class)->render($icon) !!}
        @endif

        {{ $label }}
    </span>
@endif
