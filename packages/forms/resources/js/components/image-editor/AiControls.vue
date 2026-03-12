<template>
    <div class="space-y-4">
        <h4 class="text-sm font-medium text-surface-700 dark:text-surface-300">{{ translations.ai_tools_title || 'AI Tools' }}</h4>

        <div class="space-y-2">
            <button
                v-for="feature in availableFeatures"
                :key="feature.id"
                type="button"
                class="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-colors bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 text-surface-700 dark:text-surface-300 disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="processing !== null"
                @click="$emit('ai-action', feature.id)"
            >
                <!-- Loading indicator when processing this feature -->
                <i
                    v-if="processing === feature.id"
                    class="pi pi-spin pi-spinner text-primary-500"
                ></i>
                <i
                    v-else
                    :class="'pi ' + feature.icon"
                    class="text-primary-500"
                ></i>

                <div class="flex-1 text-left">
                    <div class="font-medium">{{ feature.label }}</div>
                    <div class="text-xs text-surface-500 dark:text-surface-400">{{ feature.description }}</div>
                </div>
            </button>
        </div>

        <!-- Progress bar during processing -->
        <div v-if="processing !== null && progress > 0" class="space-y-1">
            <div class="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-1.5">
                <div
                    class="bg-primary-500 h-1.5 rounded-full transition-all duration-300"
                    :style="{ width: progress + '%' }"
                ></div>
            </div>
            <p class="text-xs text-surface-500 dark:text-surface-400 text-center">
                {{ translations.processing || 'Processing...' }} {{ progress }}%
            </p>
        </div>

        <div v-if="processing !== null && progress === 0" class="text-xs text-surface-500 dark:text-surface-400 text-center py-2">
            <i class="pi pi-spin pi-spinner mr-1"></i>
            {{ translations.loading_model || 'Loading model...' }}
        </div>

        <div v-if="availableFeatures.length === 0" class="text-sm text-surface-400 dark:text-surface-500 text-center py-4">
            {{ translations.no_ai_configured || 'No AI features configured' }}
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    features: { type: Array, default: () => [] },
    processing: { type: String, default: null },
    progress: { type: Number, default: 0 },
    translations: { type: Object, default: () => ({}) },
});

defineEmits(['ai-action']);

const availableFeatures = computed(() => {
    const featuresMap = {
        'background-removal': {
            id: 'background-removal',
            label: props.translations.bg_removal_label || 'Remove background',
            description: props.translations.bg_removal_desc || 'Removes the background directly in the browser',
            icon: 'pi-eraser',
        },
        'auto-enhance': {
            id: 'auto-enhance',
            label: props.translations.auto_enhance_label || 'Auto enhance',
            description: props.translations.auto_enhance_desc || 'Optimizes brightness, contrast and sharpness',
            icon: 'pi-sparkles',
        },
    };

    return props.features
        .map(id => featuresMap[id])
        .filter(Boolean);
});
</script>
