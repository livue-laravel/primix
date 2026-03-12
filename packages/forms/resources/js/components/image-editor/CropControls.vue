<template>
    <div class="space-y-4">
        <h4 class="text-sm font-medium text-surface-700 dark:text-surface-300">{{ translations.crop_aspect_ratio || 'Aspect ratio' }}</h4>

        <div class="grid grid-cols-2 gap-2">
            <!-- Free crop (always available) -->
            <button
                type="button"
                class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors"
                :class="currentRatio === null
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 ring-1 ring-primary-300 dark:ring-primary-700'
                    : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-600'"
                @click="$emit('crop-ratio-change', null)"
            >
                <i class="pi pi-arrows-alt text-xs"></i>
                <span>{{ translations.crop_free || 'Free' }}</span>
            </button>

            <!-- Configured aspect ratios -->
            <button
                v-for="(value, label) in ratios"
                :key="label"
                type="button"
                class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors"
                :class="isActive(value)
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 ring-1 ring-primary-300 dark:ring-primary-700'
                    : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-600'"
                @click="$emit('crop-ratio-change', value)"
            >
                <span class="w-4 h-4 flex items-center justify-center">
                    <span
                        class="border border-current rounded-sm"
                        :style="getRatioPreviewStyle(value)"
                    ></span>
                </span>
                <span>{{ label }}</span>
            </button>
        </div>

        <!-- Apply crop button -->
        <div class="pt-2 border-t border-surface-200 dark:border-surface-700">
            <p-button
                :label="translations.apply_crop || 'Apply crop'"
                icon="pi pi-check"
                class="w-full"
                size="small"
                @click="$emit('apply-crop')"
            />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    currentRatio: { type: Number, default: null },
    config: { type: Object, default: () => ({}) },
    translations: { type: Object, default: () => ({}) },
});

defineEmits(['crop-ratio-change', 'apply-crop']);

const defaultRatios = {
    '1:1': 1,
    '4:3': 4 / 3,
    '3:4': 3 / 4,
    '16:9': 16 / 9,
    '9:16': 9 / 16,
};

const ratios = props.config.crop?.aspectRatios || defaultRatios;

function isActive(value) {
    if (value === null && props.currentRatio === null) return true;
    return Math.abs((props.currentRatio || 0) - (value || 0)) < 0.001;
}

function getRatioPreviewStyle(ratio) {
    if (!ratio || ratio === 1) return { width: '12px', height: '12px' };
    if (ratio > 1) return { width: '14px', height: Math.round(14 / ratio) + 'px' };
    return { width: Math.round(14 * ratio) + 'px', height: '14px' };
}
</script>
