@props([
    'item' => [],
    'spa' => false,
])

<div class="pt-3 mt-2">
    <div class="border-t border-gray-200 dark:border-gray-700 mx-3 mb-2"></div>
    <h4 class="px-3 mb-1 text-xs font-medium text-gray-400 dark:text-gray-500">
        {{ $item['label'] }}
    </h4>
    @foreach($item['items'] as $child)
        <x-primix::navigation-item :item="$child" :spa="$spa" />
    @endforeach
</div>
