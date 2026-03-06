@props([
    'item' => [],
    'spa' => false,
])

<primix-collapsible :default-open="{{ ($item['collapsed'] ?? false) ? 'false' : 'true' }}" class="mt-4">
    @if($item['collapsible'] ?? true)
        <template #trigger="{ open, toggle }">
            <div class="flex w-full items-center justify-between px-3 py-1">
                @php
                    $toggleGroupAction = \Primix\Actions\Action::make('toggleNavigationGroup')
                        ->label($item['label'])
                        ->link()
                        ->color('gray')
                        ->jsAction('toggle')
                        ->extraAttributes([
                            'class' => 'flex-1 justify-start p-0 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider',
                        ]);
                @endphp
                {{ $toggleGroupAction }}
                <svg
                    @click="toggle"
                    :class="{ 'rotate-90': open }"
                    class="h-4 w-4 text-gray-400 transition-transform duration-200"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </template>
    @else
        <template #trigger>
            <h3 class="px-3 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {{ $item['label'] }}
            </h3>
        </template>
    @endif

    <template #default>
        <div class="mt-1 space-y-1">
            @foreach($item['items'] as $subItem)
                @if(($subItem['type'] ?? null) === 'sub-group')
                    <x-primix::navigation-sub-group :item="$subItem" :spa="$spa" />
                @else
                    <x-primix::navigation-item :item="$subItem" :spa="$spa" />
                @endif
            @endforeach
        </div>
    </template>
</primix-collapsible>
