<template>
    <div class="absolute right-0 z-50 mt-2 w-96 origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10">
        <!-- Header -->
        <div class="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white">
                Notifiche
                <span v-if="unreadCount > 0" class="ml-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                    ({{ unreadCount }})
                </span>
            </h3>
            <button
                v-if="unreadCount > 0"
                type="button"
                class="text-xs text-primary-600 hover:text-primary-500 dark:text-primary-400 font-medium"
                @click="$emit('mark-all-read')"
            >
                Segna tutte come lette
            </button>
        </div>

        <!-- Notification list -->
        <div class="max-h-[32rem] overflow-y-auto">
            <template v-if="notifications.length > 0">
                <NotificationItem
                    v-for="notification in notifications"
                    :key="notification.id"
                    :notification="notification"
                    @mark-read="$emit('mark-read', $event)"
                    @navigate="$emit('navigate', $event)"
                />
            </template>

            <!-- Empty state -->
            <div v-else class="px-4 py-8 text-center">
                <svg class="mx-auto h-8 w-8 text-gray-300 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.143 17.082a24.248 24.248 0 0 0 5.714 0m-5.714 0a2.25 2.25 0 0 1-2.244-2.077L6.394 5.694a6.001 6.001 0 0 1 11.212 0l-.505 9.311a2.25 2.25 0 0 1-2.244 2.077m-5.714 0a3 3 0 0 0 5.714 0" />
                </svg>
                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Nessuna notifica</p>
            </div>
        </div>

        <!-- Load more -->
        <div v-if="hasMore" class="border-t border-gray-100 dark:border-gray-700">
            <button
                type="button"
                class="w-full px-4 py-2 text-xs text-center text-primary-600 hover:bg-gray-50 dark:text-primary-400 dark:hover:bg-gray-700/50 font-medium"
                :disabled="loading"
                @click="$emit('load-more')"
            >
                {{ loading ? 'Caricamento...' : 'Carica altre' }}
            </button>
        </div>
    </div>
</template>

<script setup>
import NotificationItem from './NotificationItem.vue';

defineProps({
    notifications: {
        type: Array,
        default: () => [],
    },
    unreadCount: {
        type: Number,
        default: 0,
    },
    hasMore: {
        type: Boolean,
        default: false,
    },
    loading: {
        type: Boolean,
        default: false,
    },
});

defineEmits(['load-more', 'mark-read', 'mark-all-read', 'navigate']);
</script>
