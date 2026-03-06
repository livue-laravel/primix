<template>
    <PrimixDropdown>
        <template #trigger="{ toggle }">
            <button
                type="button"
                class="-m-1.5 flex items-center p-1.5"
                @click="toggle"
            >
                <span class="sr-only">Open tenant menu</span>
                <!-- Building icon -->
                <svg class="h-5 w-5 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                </svg>
                <span class="hidden lg:flex lg:items-center">
                    <span class="ml-2 text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                        {{ tenantMenu.currentTenantName ?? 'Tenant' }}
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
            <div class="absolute right-0 z-50 mt-2 w-64 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none">
                <!-- Current tenant header -->
                <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <p class="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Current tenant
                    </p>
                    <p class="text-sm font-semibold text-gray-900 dark:text-white truncate mt-1">
                        {{ tenantMenu.currentTenantName }}
                    </p>
                </div>

                <!-- Switch to other tenants -->
                <template v-if="tenantMenu.tenants && tenantMenu.tenants.length > 0">
                    <div class="py-1">
                        <p class="px-4 py-1 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            Switch to
                        </p>
                        <a
                            v-for="tenant in tenantMenu.tenants"
                            :key="tenant.id"
                            :href="tenant.url"
                            class="flex w-full items-center gap-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            @click="close"
                        >
                            <svg class="h-4 w-4 text-gray-400 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                            </svg>
                            <span class="truncate">{{ tenant.name }}</span>
                        </a>
                    </div>
                </template>

                <!-- Custom menu items -->
                <template v-if="menuItems.length > 0">
                    <div class="border-t border-gray-100 dark:border-gray-700"></div>
                    <div class="py-1">
                        <a
                            v-for="(item, index) in menuItems"
                            :key="'item-' + index"
                            :href="item.url"
                            v-bind="spa ? { 'data-livue-navigate': 'true' } : {}"
                            class="flex w-full items-center gap-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            @click="close"
                        >
                            {{ item.label }}
                        </a>
                    </div>
                </template>
            </div>
        </template>
    </PrimixDropdown>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    tenantMenu: {
        type: Object,
        default: () => ({}),
    },
    spa: {
        type: Boolean,
        default: false,
    },
});

const menuItems = computed(() => {
    return props.tenantMenu.items ?? [];
});
</script>
