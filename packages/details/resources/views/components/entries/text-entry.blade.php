@php
    $state = $component->getState();

    if ($state instanceof \DateTimeInterface) {
        $state = $state->format('Y-m-d H:i:s');
    } elseif (is_bool($state)) {
        $state = $state ? 'Yes' : 'No';
    } elseif (is_array($state) || is_object($state)) {
        $encoded = json_encode($state, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        $state = $encoded === false ? null : $encoded;
    }

    $isEmpty = $state === null || $state === '';
    $placeholder = $component->getPlaceholder() ?? '-';
@endphp

@if($isEmpty)
    <span class="text-surface-500 dark:text-surface-400">{{ $placeholder }}</span>
@elseif($component->isHtml())
    {!! (string) $state !!}
@else
    {{ $state }}
@endif
