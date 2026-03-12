<template>
    <TransitionGroup
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <div
            v-for="notification in notifications"
            :key="notification.id"
            class="pointer-events-auto mb-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg ring-1 ring-black ring-opacity-5 overflow-hidden"
        >
            <div class="p-4">
                <div class="flex items-start">
                    <div v-if="notification.icon" class="flex-shrink-0">
                        <svg
                            v-if="notification.icon === 'heroicon-o-check-circle'"
                            class="h-6 w-6"
                            :class="colorClass(notification.color)"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <svg
                            v-else-if="notification.icon === 'heroicon-o-exclamation-triangle'"
                            class="h-6 w-6"
                            :class="colorClass(notification.color)"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                        </svg>
                        <svg
                            v-else-if="notification.icon === 'heroicon-o-x-circle'"
                            class="h-6 w-6"
                            :class="colorClass(notification.color)"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <svg
                            v-else-if="notification.icon === 'heroicon-o-information-circle'"
                            class="h-6 w-6"
                            :class="colorClass(notification.color)"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg>
                    </div>

                    <div class="ml-3 w-0 flex-1 pt-0.5">
                        <p v-if="notification.title" class="text-sm font-medium text-gray-900 dark:text-white">
                            {{ notification.title }}
                        </p>
                        <p v-if="notification.body" class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {{ notification.body }}
                        </p>
                    </div>

                    <div v-if="notification.closeable !== false" class="ml-4 flex flex-shrink-0">
                        <button
                            @click="dismiss(notification.id)"
                            type="button"
                            class="inline-flex rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        >
                            <span class="sr-only">Close</span>
                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </TransitionGroup>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const notifications = ref([]);
let nextId = 0;

const colorMap = {
    success: 'text-green-400',
    danger: 'text-red-400',
    warning: 'text-yellow-400',
    info: 'text-blue-400',
    primary: 'text-blue-400',
    gray: 'text-gray-400',
};

function colorClass(color) {
    return colorMap[color] || 'text-gray-400';
}

function dismiss(id) {
    notifications.value = notifications.value.filter(n => n.id !== id);
}

function handleNotification(event) {
    const data = event.detail;
    const id = ++nextId;
    const notification = { ...data, id };

    notifications.value.push(notification);

    const duration = data.duration ?? 5000;
    if (duration > 0) {
        setTimeout(() => dismiss(id), duration);
    }
}

onMounted(() => {
    window.addEventListener('primix:notification', handleNotification);
});

onUnmounted(() => {
    window.removeEventListener('primix:notification', handleNotification);
});
</script>
