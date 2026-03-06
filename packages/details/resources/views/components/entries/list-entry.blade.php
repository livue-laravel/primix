@php
    $items = $component->getItems();
    $isEmpty = empty($items);
    $placeholder = $component->getPlaceholder() ?? '-';
@endphp

@if($isEmpty)
    <span class="text-surface-500 dark:text-surface-400">{{ $placeholder }}</span>
@elseif($component->isBulleted())
    <ul class="list-disc pl-5 space-y-1">
        @foreach($items as $item)
            <li>
                @if($component->isHtml())
                    {!! (string) $item !!}
                @else
                    {{ $item }}
                @endif
            </li>
        @endforeach
    </ul>
@elseif($component->isHtml())
    {!! implode($component->getSeparator(), array_map(fn ($item) => (string) $item, $items)) !!}
@else
    {{ implode($component->getSeparator(), $items) }}
@endif
