<template>
    <div
        :class="[
            'flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors',
            !notification.read_at ? 'bg-primary-50/50 dark:bg-primary-900/10' : ''
        ]"
        @click="handleClick"
    >
        <!-- Unread dot -->
        <div class="flex-shrink-0 mt-2 w-2">
            <div v-if="!notification.read_at" class="w-2 h-2 rounded-full bg-blue-500"></div>
        </div>

        <!-- Icon -->
        <div v-if="notification.icon" class="flex-shrink-0 mt-0.5">
            <svg
                v-if="notification.icon === 'heroicon-o-check-circle'"
                class="h-5 w-5"
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
                class="h-5 w-5"
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
                class="h-5 w-5"
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
                class="h-5 w-5"
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

        <!-- Content -->
        <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-2">
                <p v-if="notification.title" class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ notification.title }}
                </p>
                <span v-if="timeAgoString" class="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap flex-shrink-0">
                    {{ timeAgoString }}
                </span>
            </div>
            <p v-if="notification.body" class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                {{ notification.body }}
            </p>
            <div v-if="notification.actions && notification.actions.length > 0" class="mt-2 flex flex-wrap gap-3">
                <a
                    v-for="action in notification.actions"
                    :key="action.label"
                    :href="action.url"
                    class="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
                    @click.stop
                >
                    {{ action.label }}
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    notification: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['mark-read', 'navigate']);

const colorMap = {
    success: 'text-green-500',
    danger: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500',
    primary: 'text-blue-500',
    gray: 'text-gray-400',
};

function colorClass(color) {
    return colorMap[color] || 'text-gray-400';
}

const timeAgoString = computed(() => {
    if (!props.notification.created_at) return '';

    const date = new Date(props.notification.created_at);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'adesso';

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return diffInMinutes === 1 ? '1 min fa' : `${diffInMinutes} min fa`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return diffInHours === 1 ? '1 ora fa' : `${diffInHours} ore fa`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
        return diffInDays === 1 ? '1 giorno fa' : `${diffInDays} giorni fa`;
    }

    const diffInWeeks = Math.floor(diffInDays / 7);
    return diffInWeeks === 1 ? '1 settimana fa' : `${diffInWeeks} settimane fa`;
});

function handleClick() {
    if (!props.notification.read_at) {
        emit('mark-read', props.notification.id);
    }

    if (props.notification.url) {
        emit('navigate', props.notification.url);
    }
}
</script>
