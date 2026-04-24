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

<div class="md:flex md:items-start md:justify-between">
    <div class="min-w-0">
        @if(count($breadcrumbItems) > 0)
            <p-breadcrumb
                :model="{!! \Illuminate\Support\Js::from($breadcrumbItems) !!}"
                class="mb-3"
                :pt="{ root: { style: 'background: transparent; border: none; padding: 0;' } }"
            >
                <template #item="{ item }">
                    <a
                        v-if="item.url"
                        :href="item.url"
                        @if($spa ?? false) data-livue-navigate="true" @endif
                        class="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.16em] text-surface-500 transition-colors hover:text-surface-700 dark:text-surface-300 dark:hover:text-surface-100"
                    >
                        <i v-if="item.icon" :class="item.icon" class="text-xs"></i>
                        <span>@{{ item.label }}</span>
                    </a>
                    <span
                        v-else
                        class="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-surface-950 dark:text-surface-50"
                    >
                        <i v-if="item.icon" :class="item.icon" class="text-xs"></i>
                        <span>@{{ item.label }}</span>
                    </span>
                </template>
            </p-breadcrumb>
        @endif
        <h1 class="max-w-4xl text-3xl font-semibold tracking-tight text-surface-950 dark:text-surface-50 sm:text-[2rem]">{{ $title }}</h1>
        @if($subheading)
            <p class="mt-3 max-w-3xl text-sm leading-6 text-surface-500 dark:text-surface-400">{{ $subheading }}</p>
        @endif
    </div>

    @if(count($actions) > 0)
        <div class="mt-5 flex items-center gap-x-3 md:ml-6 md:mt-0 md:justify-end">
            @renderHook(\Primix\Enums\PanelsRenderHook::PAGE_HEADER_ACTIONS_BEFORE)
            @foreach($actions as $action)
                {{ $action }}
            @endforeach
            @renderHook(\Primix\Enums\PanelsRenderHook::PAGE_HEADER_ACTIONS_AFTER)
        </div>
    @elseif($slot->isNotEmpty())
        <div class="mt-5 flex md:ml-6 md:mt-0">
            {{ $slot }}
        </div>
    @endif
</div>
