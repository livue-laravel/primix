<template>
    <PrimixDropdown>
        <template #trigger="{ toggle }">
            <button
                type="button"
                class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                @click="toggle"
            >
                <span class="sr-only">Toggle theme</span>
                <!-- Sun icon (light mode) -->
                <svg v-if="effectiveMode === 'light'" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
                <!-- Moon icon (dark mode) -->
                <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
            </button>
        </template>

        <template #default="{ close }">
            <div class="absolute right-0 z-50 mt-2 w-36 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none">
                <div class="py-1">
                    <button
                        v-for="option in options"
                        :key="option.value"
                        type="button"
                        class="flex w-full items-center gap-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        :class="{ 'bg-gray-50 dark:bg-gray-700/50 font-medium': mode === option.value }"
                        @click="setMode(option.value); close()"
                    >
                        <component :is="option.icon" class="h-4 w-4" />
                        {{ option.label }}
                    </button>
                </div>
            </div>
        </template>
    </PrimixDropdown>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, h } from 'vue';

const STORAGE_KEY = 'primix-color-mode';

const SunIcon = {
    render() {
        return h('svg', { fill: 'none', viewBox: '0 0 24 24', 'stroke-width': '1.5', stroke: 'currentColor' }, [
            h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z' })
        ]);
    }
};

const MoonIcon = {
    render() {
        return h('svg', { fill: 'none', viewBox: '0 0 24 24', 'stroke-width': '1.5', stroke: 'currentColor' }, [
            h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z' })
        ]);
    }
};

const MonitorIcon = {
    render() {
        return h('svg', { fill: 'none', viewBox: '0 0 24 24', 'stroke-width': '1.5', stroke: 'currentColor' }, [
            h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z' })
        ]);
    }
};

const options = [
    { value: 'light', label: 'Light', icon: SunIcon },
    { value: 'dark', label: 'Dark', icon: MoonIcon },
    { value: 'system', label: 'System', icon: MonitorIcon },
];

const mode = ref('system');
const systemPrefersDark = ref(false);

const effectiveMode = computed(() => {
    if (mode.value === 'system') {
        return systemPrefersDark.value ? 'dark' : 'light';
    }
    return mode.value;
});

let mediaQuery = null;

function applyTheme() {
    if (effectiveMode.value === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

function setMode(newMode) {
    mode.value = newMode;
    localStorage.setItem(STORAGE_KEY, newMode);
    applyTheme();
}

function onSystemChange(e) {
    systemPrefersDark.value = e.matches;
    if (mode.value === 'system') {
        applyTheme();
    }
}

onMounted(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
        mode.value = stored;
    }

    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    systemPrefersDark.value = mediaQuery.matches;
    mediaQuery.addEventListener('change', onSystemChange);

    applyTheme();
});

onBeforeUnmount(() => {
    if (mediaQuery) {
        mediaQuery.removeEventListener('change', onSystemChange);
    }
});
</script>
