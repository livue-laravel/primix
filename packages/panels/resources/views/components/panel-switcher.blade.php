@props([
    'panels' => [],
    'currentPanelId' => '',
])

@if(count($panels) > 1)
    <div class="flex items-center gap-x-1">
        @foreach($panels as $panel)
            <a
                href="/{{ $panel->getPath() }}"
                @if($spa ?? false) data-livue-navigate="true" @endif
                class="rounded-md px-3 py-1.5 text-sm font-medium {{ $panel->getId() === $currentPanelId ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200' }}"
            >
                {{ $panel->getBrandName() }}
            </a>
        @endforeach
    </div>

    <x-primix::separator />
@endif
