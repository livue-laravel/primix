<template>
    <PrimixDropdown>
        <template #trigger="{ toggle }">
            <button
                type="button"
                class="-m-1.5 flex items-center p-1.5"
                @click="toggle"
            >
                <span class="sr-only">Open user menu</span>
                <!-- Avatar -->
                <img
                    v-if="userMenu.avatarUrl"
                    :src="userMenu.avatarUrl"
                    :alt="userMenu.userName"
                    class="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 object-cover"
                >
                <span
                    v-else
                    class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300"
                >
                    {{ initials }}
                </span>
                <span class="hidden lg:flex lg:items-center">
                    <span class="ml-4 text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                        {{ userMenu.userName ?? 'User' }}
                    </span>
                    <svg class="ml-2 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fill-rule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </span>
            </button>
        </template>

        <template #default="{ close }">
            <div class="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none">
                <!-- User info header -->
                <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {{ userMenu.userName }}
                    </p>
                    <p v-if="userMenu.userEmail" class="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                        {{ userMenu.userEmail }}
                    </p>
                </div>

                <!-- Menu items -->
                <div class="py-1">
                    <template v-for="(item, index) in regularItems" :key="index">
                        <a
                            :href="item.url"
                            v-bind="spa ? { 'data-livue-navigate': 'true' } : {}"
                            class="flex w-full items-center gap-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            @click="close"
                        >
                            {{ item.label }}
                        </a>
                    </template>
                </div>

                <!-- Logout (post actions) -->
                <template v-if="postItems.length > 0">
                    <div class="border-t border-gray-100 dark:border-gray-700"></div>
                    <div class="py-1">
                        <button
                            v-for="(item, index) in postItems"
                            :key="'post-' + index"
                            type="button"
                            class="flex w-full items-center gap-x-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                            :class="colorClass(item.color)"
                            @click="submitPost(item.url); close()"
                        >
                            {{ item.label }}
                        </button>
                    </div>
                </template>
            </div>
        </template>
    </PrimixDropdown>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    userMenu: {
        type: Object,
        default: () => ({}),
    },
    spa: {
        type: Boolean,
        default: false,
    },
    csrfToken: {
        type: String,
        default: '',
    },
});

const initials = computed(() => {
    const name = props.userMenu.userName ?? '';
    if (!name) return '?';
    return name
        .split(' ')
        .map(part => part.charAt(0))
        .slice(0, 2)
        .join('')
        .toUpperCase();
});

const regularItems = computed(() => {
    return (props.userMenu.items ?? []).filter(item => !item.isPostAction);
});

const postItems = computed(() => {
    return (props.userMenu.items ?? []).filter(item => item.isPostAction);
});

function colorClass(color) {
    if (color === 'danger') {
        return 'text-red-600 dark:text-red-400';
    }
    return 'text-gray-700 dark:text-gray-300';
}

function submitPost(url) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = url;

    const csrfInput = document.createElement('input');
    csrfInput.type = 'hidden';
    csrfInput.name = '_token';
    csrfInput.value = props.csrfToken;
    form.appendChild(csrfInput);

    document.body.appendChild(form);
    form.submit();
}
</script>
