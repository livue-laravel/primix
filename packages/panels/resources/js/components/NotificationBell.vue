<template>
    <div ref="containerRef" class="relative">
        <!-- Bell button -->
        <button
            type="button"
            class="relative rounded-full p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
            @click="togglePanel"
        >
            <span class="sr-only">{{ translations.bell_label || 'Notifications' }}</span>
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>

            <!-- Badge -->
            <span
                v-if="unreadCount > 0"
                :class="[
                    'absolute -top-1 -right-1 flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold min-w-[1.25rem] h-5 px-1',
                    hasPulse ? 'animate-pulse' : ''
                ]"
            >
                {{ unreadCount > 99 ? '99+' : unreadCount }}
            </span>
        </button>

        <!-- Popup mode -->
        <Transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
        >
            <NotificationPopup
                v-if="mode === 'popup' && isOpen"
                :notifications="notifications"
                :unread-count="unreadCount"
                :has-more="hasMore"
                :loading="loading"
                :translations="translations"
                @load-more="loadMore"
                @mark-read="markAsRead"
                @mark-all-read="markAllAsRead"
                @navigate="handleNavigate"
            />
        </Transition>

        <!-- Drawer mode -->
        <NotificationDrawer
            v-if="mode === 'drawer'"
            :open="isOpen"
            :notifications="notifications"
            :unread-count="unreadCount"
            :has-more="hasMore"
            :loading="loading"
            :translations="translations"
            @close="closePanel"
            @load-more="loadMore"
            @mark-read="markAsRead"
            @mark-all-read="markAllAsRead"
            @navigate="handleNavigate"
        />
    </div>
</template>

<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue';
import NotificationPopup from './NotificationPopup.vue';
import NotificationDrawer from './NotificationDrawer.vue';

const props = defineProps({
    mode: {
        type: String,
        default: 'popup',
    },
    pollingInterval: {
        type: Number,
        default: 30,
    },
    translations: {
        type: Object,
        default: () => ({}),
    },
});

const livue = inject('livue');

const containerRef = ref(null);
const isOpen = ref(false);
const notifications = ref([]);
const unreadCount = ref(0);
const hasMore = ref(false);
const loading = ref(false);
const currentPage = ref(1);
const previousUnreadCount = ref(0);
const hasPulse = ref(false);

let pollingTimer = null;

// --- Polling ---

async function fetchUnreadCount() {
    try {
        const response = await livue.getUnreadNotificationsCount();
        const count = response.count ?? 0;

        if (count > previousUnreadCount.value) {
            hasPulse.value = true;
            setTimeout(() => { hasPulse.value = false; }, 2000);
        }

        previousUnreadCount.value = count;
        unreadCount.value = count;
    } catch {
        // silently ignore
    }
}

// --- Fetch notifications ---

async function fetchNotifications() {
    loading.value = true;
    currentPage.value = 1;
    try {
        const response = await livue.getNotifications({ page: 1, perPage: 15 });
        notifications.value = response.data ?? [];
        hasMore.value = response.hasMore ?? false;
        unreadCount.value = response.unreadCount ?? 0;
        previousUnreadCount.value = unreadCount.value;
    } catch {
        // silently ignore
    } finally {
        loading.value = false;
    }
}

async function loadMore() {
    if (loading.value) return;
    loading.value = true;
    currentPage.value += 1;
    try {
        const response = await livue.getNotifications({ page: currentPage.value, perPage: 15 });
        notifications.value = [...notifications.value, ...(response.data ?? [])];
        hasMore.value = response.hasMore ?? false;
    } catch {
        // silently ignore
    } finally {
        loading.value = false;
    }
}

// --- Actions ---

async function markAsRead(id) {
    try {
        await livue.markNotificationAsRead({ id });
        const notification = notifications.value.find(n => n.id === id);
        if (notification && !notification.read_at) {
            notification.read_at = new Date().toISOString();
            unreadCount.value = Math.max(0, unreadCount.value - 1);
        }
    } catch {
        // silently ignore
    }
}

async function markAllAsRead() {
    try {
        await livue.markAllNotificationsAsRead();
        notifications.value.forEach(n => {
            n.read_at = n.read_at || new Date().toISOString();
        });
        unreadCount.value = 0;
    } catch {
        // silently ignore
    }
}

function handleNavigate(url) {
    closePanel();
    window.location.href = url;
}

// --- Panel toggle ---

function togglePanel() {
    if (!isOpen.value) {
        isOpen.value = true;
        fetchNotifications();
    } else {
        closePanel();
    }
}

function closePanel() {
    isOpen.value = false;
}

// --- Click outside (popup mode) ---

function handleClickOutside(event) {
    if (isOpen.value && props.mode === 'popup' && containerRef.value && !containerRef.value.contains(event.target)) {
        closePanel();
    }
}

// --- Lifecycle ---

onMounted(() => {
    fetchUnreadCount();
    pollingTimer = setInterval(fetchUnreadCount, props.pollingInterval * 1000);
    document.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
    if (pollingTimer) clearInterval(pollingTimer);
    document.removeEventListener('mousedown', handleClickOutside);
});
</script>
