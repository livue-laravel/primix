@php
    $breadcrumbItems = collect($breadcrumbs ?? [])
        ->map(function (array $item): array {
            $breadcrumb = [
                'label' => (string) ($item['label'] ?? ''),
            ];

            if (! empty($item['url'])) {
                $breadcrumb['url'] = (string) $item['url'];
            }

            if (! empty($item['icon'])) {
                $breadcrumb['icon'] = (string) $item['icon'];
            }

            return $breadcrumb;
        })
        ->filter(fn (array $item): bool => $item['label'] !== '')
        ->values()
        ->all();
@endphp

<div class="md:flex md:items-center md:justify-between">
    <div>
        @if(count($breadcrumbItems) > 0)
            <p-breadcrumb
                :model="{!! \Illuminate\Support\Js::from($breadcrumbItems) !!}"
                class="mb-2"
                :pt="{ root: { style: 'background: transparent; border: none; padding: 0;' } }"
            >
                <template #item="{ item }">
                    <a
                        v-if="item.url"
                        :href="item.url"
                        @if($spa ?? false) data-livue-navigate="true" @endif
                        class="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <i v-if="item.icon" :class="item.icon" class="text-xs"></i>
                        <span>@{{ item.label }}</span>
                    </a>
                    <span
                        v-else
                        class="inline-flex items-center gap-1 text-sm text-gray-900 dark:text-white"
                    >
                        <i v-if="item.icon" :class="item.icon" class="text-xs"></i>
                        <span>@{{ item.label }}</span>
                    </span>
                </template>
            </p-breadcrumb>
        @endif
        <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">{{ $title }}</h1>
        @if($subheading)
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ $subheading }}</p>
        @endif
    </div>

    @if(count($actions) > 0)
        <div class="mt-4 flex items-center gap-x-3 md:ml-4 md:mt-0">
            @renderHook(\Primix\Enums\PanelsRenderHook::PAGE_HEADER_ACTIONS_BEFORE)
            @foreach($actions as $action)
                {{ $action }}
            @endforeach
            @renderHook(\Primix\Enums\PanelsRenderHook::PAGE_HEADER_ACTIONS_AFTER)
        </div>
    @elseif($slot->isNotEmpty())
        <div class="mt-4 flex md:ml-4 md:mt-0">
            {{ $slot }}
        </div>
    @endif
</div>
