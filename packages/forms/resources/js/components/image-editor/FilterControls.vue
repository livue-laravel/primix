<template>
    <div class="space-y-4">
        <h4 class="text-sm font-medium text-surface-700 dark:text-surface-300">Filtri</h4>

        <div class="grid grid-cols-3 gap-2">
            <button
                v-for="filter in FILTER_PRESETS"
                :key="filter.id"
                type="button"
                class="group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors"
                :class="isActive(filter.id)
                    ? 'bg-primary-100 dark:bg-primary-900/30 ring-1 ring-primary-300 dark:ring-primary-700'
                    : 'hover:bg-surface-100 dark:hover:bg-surface-700'"
                @click="$emit('filter-change', filter.id)"
            >
                <!-- Filter thumbnail preview -->
                <div
                    class="w-14 h-14 rounded-md overflow-hidden bg-surface-200 dark:bg-surface-600"
                >
                    <img
                        v-if="thumbnailUrl"
                        :src="thumbnailUrl"
                        class="w-full h-full object-cover"
                        :style="{ filter: filter.css || 'none' }"
                    >
                    <div v-else class="w-full h-full flex items-center justify-center">
                        <i class="pi pi-image text-surface-400 text-xs"></i>
                    </div>
                </div>

                <!-- Filter label -->
                <span
                    class="text-[10px] leading-tight text-center truncate w-full"
                    :class="isActive(filter.id)
                        ? 'text-primary-700 dark:text-primary-300 font-medium'
                        : 'text-surface-500 dark:text-surface-400'"
                >
                    {{ filter.label }}
                </span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { FILTER_PRESETS } from '../../composables/useFilters.js';

const props = defineProps({
    activeFilter: { type: String, default: null },
    thumbnailUrl: { type: String, default: null },
});

defineEmits(['filter-change']);

function isActive(filterId) {
    if (filterId === 'original' && !props.activeFilter) return true;
    return props.activeFilter === filterId;
}
</script>
