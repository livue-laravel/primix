@props([
    'navigation' => [],
    'spa' => false,
])

@foreach($navigation as $item)
    @if(isset($item['items']))
        <x-primix::navigation-group :item="$item" :spa="$spa" />
    @else
        <x-primix::navigation-item :item="$item" :spa="$spa" />
    @endif
@endforeach
