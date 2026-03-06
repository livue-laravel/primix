<a
    href="{{ $item['url'] }}"
    @if($spa) v-navigate @endif
    class="group flex items-center px-3 py-2 text-sm font-medium rounded-md {{ $stateClasses() }}"
>
    @if($item['icon'] ?? null)
        <span class="mr-3 h-5 w-5 flex-shrink-0">
            <x-dynamic-component :component="$isActive() ? ($item['activeIcon'] ?? $item['icon']) : $item['icon']" class="h-5 w-5" />
        </span>
    @endif

    <span class="flex-1">{{ $item['label'] }}</span>

    @if($item['badge'] ?? null)
        <span class="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium {{ $item['badgeColor'] ?? 'bg-gray-100 text-gray-600' }}">
            {{ $item['badge'] }}
        </span>
    @endif
</a>
