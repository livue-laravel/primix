@props([
    'layout' => null,
    'sidebar' => null,
    'topbar' => null,
])

@php
    $layoutConfig = [];

    if ($layout instanceof \Primix\Layouts\Shell) {
        $layoutConfig = $layout->toArray();
    } elseif (is_array($layout)) {
        $layoutConfig = $layout;
    }

    $navigation = $layoutConfig['navigation'] ?? ($navigation ?? []);
    $brandName = $layoutConfig['brandName'] ?? ($brandName ?? null);
    $brandLogo = $layoutConfig['brandLogo'] ?? ($brandLogo ?? null);
    $brandLogoDark = $layoutConfig['brandLogoDark'] ?? ($brandLogoDark ?? null);
    $showTopbar = (bool) ($layoutConfig['showTopbar'] ?? true);
    $showSidebar = (bool) ($layoutConfig['showSidebar'] ?? true);
    $showPanelSwitcher = (bool) ($layoutConfig['showPanelSwitcher'] ?? true);
    $showUserMenu = (bool) ($layoutConfig['showUserMenu'] ?? true);
    $topBarNavigation = (bool) ($layoutConfig['topBarNavigation'] ?? ($topBarNavigation ?? false));
    $fixedTopbar = (bool) ($layoutConfig['fixedTopbar'] ?? ($fixedTopbar ?? true));
    $hasDarkMode = (bool) ($layoutConfig['hasDarkMode'] ?? ($hasDarkMode ?? false));
    $spa = (bool) ($layoutConfig['spa'] ?? ($spa ?? false));
    $showFlashNotifications = (bool) ($layoutConfig['showFlashNotifications'] ?? true);
    $showNotificationManager = (bool) ($layoutConfig['showNotificationManager'] ?? true);
    $userMenu = $layoutConfig['userMenu'] ?? ($userMenu ?? []);
    $hasGlobalSearch = (bool) ($layoutConfig['hasGlobalSearch'] ?? ($hasGlobalSearch ?? false));
    $globalSearchMode = $layoutConfig['globalSearchMode'] ?? ($globalSearchMode ?? 'spotlight');
    $panelId = (string) ($layoutConfig['panelId'] ?? ($panelId ?? ''));
    $hasTenantMenu = (bool) ($layoutConfig['hasTenantMenu'] ?? ($hasTenantMenu ?? false));
    $tenantMenu = $layoutConfig['tenantMenu'] ?? ($tenantMenu ?? []);
    $hasDatabaseNotifications = (bool) ($layoutConfig['hasDatabaseNotifications'] ?? ($hasDatabaseNotifications ?? false));
    $databaseNotificationsMode = (string) ($layoutConfig['databaseNotificationsMode'] ?? ($databaseNotificationsMode ?? 'popup'));
    $databaseNotificationsPollingInterval = (int) ($layoutConfig['databaseNotificationsPollingInterval'] ?? ($databaseNotificationsPollingInterval ?? 30));
    $maxContentWidth = $layoutConfig['maxContentWidth'] ?? ($maxContentWidth ?? \Primix\Support\Enums\Width::SevenExtraLarge);
    $resolvedTitle = $layoutConfig['title'] ?? ($title ?? null);
    $resolvedFavicon = $layoutConfig['favicon'] ?? ($favicon ?? null);
    $resolvedSidebar = $layoutConfig['sidebar'] ?? ($sidebar ?? null);
    $resolvedTopbar = $layoutConfig['topbar'] ?? ($topbar ?? null);
@endphp

<x-primix::layouts.base :title="$resolvedTitle" :hasDarkMode="$hasDarkMode" :favicon="$resolvedFavicon">
    @if($showTopbar && $resolvedTopbar instanceof \Illuminate\Contracts\Support\Htmlable)
        {{ $resolvedTopbar }}
    @endif

    @php
        $topbarPt = 'pt-16';
        if ($showTopbar && $fixedTopbar && $topBarNavigation) {
            $topbarPt = 'pt-26'; // h-16 toolbar + h-10 navigation bar
        }
    @endphp

    <div @class([
        'flex w-full min-h-screen',
        'lg:pl-64' => $showSidebar && ! $topBarNavigation,
        $topbarPt => $showTopbar && $fixedTopbar,
    ])>
        @if($showSidebar && ! $topBarNavigation)
            @if($resolvedSidebar instanceof \Illuminate\Contracts\Support\Htmlable)
                {{ $resolvedSidebar }}
            @else
                @livue('primix-sidebar', [
                    'navigation' => $navigation,
                    'brandName' => $brandName,
                    'brandLogo' => $brandLogo,
                    'brandLogoDark' => $brandLogoDark,
                    'spa' => $spa,
                    'panelId' => $panelId,
                ])
            @endif
        @endif

        <div class="flex w-full flex-grow">
            <main class="py-6 w-full max-w-full">
                <x-primix::content-container :maxWidth="$maxContentWidth" class="mx-auto px-4 sm:px-6 lg:px-8">
                    @renderHook(\Primix\Enums\PanelsRenderHook::CONTENT_START)
                    {{ $slot }}
                    @renderHook(\Primix\Enums\PanelsRenderHook::CONTENT_END)
                </x-primix::content-container>
            </main>
        </div>

        @if($showFlashNotifications)
            <x-primix::notifications />
        @endif
    </div>

    @if($showNotificationManager)
        @livue('notification-manager')
    @endif
</x-primix::layouts.base>
