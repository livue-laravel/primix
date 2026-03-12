<template>
    <Teleport to="body">
        <!-- Backdrop -->
        <Transition
            enter-active-class="transition-opacity ease-linear duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity ease-linear duration-300"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div v-if="open" class="fixed inset-0 z-50 bg-gray-900/50" @click="$emit('close')"></div>
        </Transition>

        <!-- Panel -->
        <Transition
            enter-active-class="transform transition ease-in-out duration-300"
            enter-from-class="translate-x-full"
            enter-to-class="translate-x-0"
            leave-active-class="transform transition ease-in-out duration-300"
            leave-from-class="translate-x-0"
            leave-to-class="translate-x-full"
        >
            <div v-if="open" class="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white dark:bg-gray-800 shadow-xl flex flex-col">
                <!-- Header -->
                <div class="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 class="text-base font-semibold text-gray-900 dark:text-white">
                        {{ translations.title || 'Notifications' }}
                        <span v-if="unreadCount > 0" class="ml-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                            ({{ unreadCount }})
                        </span>
                    </h2>
                    <div class="flex items-center gap-3">
                        <button
                            v-if="unreadCount > 0"
                            type="button"
                            class="text-xs text-primary-600 hover:text-primary-500 dark:text-primary-400 font-medium"
                            @click="$emit('mark-all-read')"
                        >
                            {{ translations.mark_all_read || 'Mark all as read' }}
                        </button>
                        <button
                            type="button"
                            class="rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                            @click="$emit('close')"
                        >
                            <span class="sr-only">{{ translations.close || 'Close' }}</span>
                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Notification list -->
                <div class="flex-1 overflow-y-auto">
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
                    <div v-else class="px-4 py-12 text-center">
                        <svg class="mx-auto h-10 w-10 text-gray-300 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.143 17.082a24.248 24.248 0 0 0 5.714 0m-5.714 0a2.25 2.25 0 0 1-2.244-2.077L6.394 5.694a6.001 6.001 0 0 1 11.212 0l-.505 9.311a2.25 2.25 0 0 1-2.244 2.077m-5.714 0a3 3 0 0 0 5.714 0" />
                        </svg>
                        <p class="mt-3 text-sm text-gray-500 dark:text-gray-400">{{ translations.no_notifications || 'No notifications' }}</p>
                    </div>
                </div>

                <!-- Load more footer -->
                <div v-if="hasMore" class="border-t border-gray-200 dark:border-gray-700">
                    <button
                        type="button"
                        class="w-full px-4 py-3 text-sm text-center text-primary-600 hover:bg-gray-50 dark:text-primary-400 dark:hover:bg-gray-700/50 font-medium"
                        :disabled="loading"
                        @click="$emit('load-more')"
                    >
                        {{ loading ? (translations.loading || 'Loading...') : (translations.load_more || 'Load more') }}
                    </button>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import NotificationItem from './NotificationItem.vue';

defineProps({
    open: {
        type: Boolean,
        default: false,
    },
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
    translations: {
        type: Object,
        default: () => ({}),
    },
});

const emit = defineEmits(['close', 'load-more', 'mark-read', 'mark-all-read', 'navigate']);

function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        emit('close');
    }
}

onMounted(() => {
    document.addEventListener('keydown', handleEscapeKey);
});

onUnmounted(() => {
    document.removeEventListener('keydown', handleEscapeKey);
});
</script>
