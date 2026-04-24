<x-primix::layouts.base :title="$title ?? null" :hasDarkMode="$hasDarkMode ?? true" :favicon="$favicon ?? null">

    <div class="flex min-h-screen flex-col items-center justify-center bg-[var(--p-surface-50)] px-4 py-12 dark:bg-[var(--p-surface-950)]">
        <div class="mb-8 text-center">
            <template v-if="panelConfig.brandLogoDark">
                <span class="inline-block dark:hidden" v-html="panelConfig.brandLogo"></span>
                <span class="hidden dark:inline-block" v-html="panelConfig.brandLogoDark"></span>
            </template>
            <template v-else-if="panelConfig.brandLogo">
                <span class="inline-block" v-html="panelConfig.brandLogo"></span>
            </template>
            <h2
                v-else-if="panelConfig.brandName"
                class="text-2xl font-bold tracking-tight text-[var(--p-text-color)]"
                v-html="panelConfig.brandName"
            ></h2>
        </div>

        @if($title ?? null)
            <div class="mb-6 text-center">
                <h1 class="text-xl font-semibold text-[var(--p-text-color)]">
                    {{ $title }}
                </h1>
                @if($subheading ?? null)
                    <p class="mt-2 text-sm text-[var(--p-text-muted-color)]">
                        {{ $subheading }}
                    </p>
                @endif
            </div>
        @endif

        <x-primix::content-container :maxWidth="$maxContentWidth ?? \Primix\Support\Enums\Width::ExtraLarge">
            <div class="bg-[var(--p-surface-0)] shadow-sm ring-1 ring-[var(--p-surface-200)] sm:rounded-lg dark:bg-[var(--p-surface-900)] dark:ring-[var(--p-content-border-color)]">
                <div class="px-4 py-6 sm:p-8">
                    {{ $slot }}
                </div>
            </div>
        </x-primix::content-container>
    </div>

    <x-primix::notifications />
    @livue('notification-manager')
</x-primix::layouts.base>
