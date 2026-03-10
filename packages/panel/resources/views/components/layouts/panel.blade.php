@props([
    'topBarNavigation' => $topBarNavigation ?? false
])

<x-primix::layouts.base :title="$title ?? null" :hasDarkMode="$hasDarkMode ?? false" :favicon="$favicon ?? null">

    @livue('primix-topbar', [
        'navigation' => $navigation ?? [],
        'brandName' => $brandName ?? null,
        'brandLogo' => $brandLogo ?? null,
        'brandLogoDark' => $brandLogoDark ?? null,
        'topBarNavigation' => $topBarNavigation,
        'fixedTopbar' => $fixedTopbar ?? true,
        'spa' => $spa ?? false,
        'hasDarkMode' => $hasDarkMode ?? true,
        'userMenu' => $userMenu ?? [],
        'hasGlobalSearch' => $hasGlobalSearch ?? false,
        'globalSearchMode' => $globalSearchMode ?? 'spotlight',
        'panelId' => $panelId ?? '',
        'hasTenantMenu' => $hasTenantMenu ?? false,
        'tenantMenu' => $tenantMenu ?? [],
        'hasDatabaseNotifications' => $hasDatabaseNotifications ?? false,
        'databaseNotificationsMode' => $databaseNotificationsMode ?? 'popup',
        'databaseNotificationsPollingInterval' => $databaseNotificationsPollingInterval ?? 30,
    ])

    @php
        $topbarPt = 'pt-16';
        if (($fixedTopbar ?? true) && $topBarNavigation) {
            $topbarPt = 'pt-26'; // h-16 toolbar + h-10 navigation bar
        }
    @endphp
    <div @class(['flex w-full min-h-screen', 'lg:pl-64' => !$topBarNavigation, $topbarPt => ($fixedTopbar ?? true)])>
        @if(!$topBarNavigation)
            @livue('primix-sidebar', [
          'navigation' => $navigation ?? [],
          'brandName' => $brandName ?? null,
          'brandLogo' => $brandLogo ?? null,
          'brandLogoDark' => $brandLogoDark ?? null,
          'spa' => $spa ?? false,
          'panelId' => $panelId ?? '',
        ])
        @endif
        <div
            class="flex w-full flex-grow"
        >
            <main class="py-6 w-full max-w-full">
                <x-primix::content-container :maxWidth="$maxContentWidth ?? \Primix\Support\Enums\Width::SevenExtraLarge" class="mx-auto px-4 sm:px-6 lg:px-8">
                    @renderHook(\Primix\Enums\PanelsRenderHook::CONTENT_START)
                    {{ $slot }}
                    @renderHook(\Primix\Enums\PanelsRenderHook::CONTENT_END)
                </x-primix::content-container>
            </main>
        </div>
        <x-primix::notifications/>
    </div>
    @livue('notification-manager')
</x-primix::layouts.base>
