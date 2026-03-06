<template>
    <div class="space-y-4">
        <h4 class="text-sm font-medium text-surface-700 dark:text-surface-300">Strumenti AI</h4>

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
                Elaborazione... {{ progress }}%
            </p>
        </div>

        <div v-if="processing !== null && progress === 0" class="text-xs text-surface-500 dark:text-surface-400 text-center py-2">
            <i class="pi pi-spin pi-spinner mr-1"></i>
            Caricamento modello...
        </div>

        <div v-if="availableFeatures.length === 0" class="text-sm text-surface-400 dark:text-surface-500 text-center py-4">
            Nessuna funzionalità AI configurata
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const AI_FEATURES = {
    'background-removal': {
        id: 'background-removal',
        label: 'Rimuovi sfondo',
        description: 'Rimuove lo sfondo direttamente nel browser',
        icon: 'pi-eraser',
    },
    'auto-enhance': {
        id: 'auto-enhance',
        label: 'Migliora automaticamente',
        description: 'Ottimizza luminosità, contrasto e nitidezza',
        icon: 'pi-sparkles',
    },
};

const props = defineProps({
    features: { type: Array, default: () => [] },
    processing: { type: String, default: null },
    progress: { type: Number, default: 0 },
});

defineEmits(['ai-action']);

const availableFeatures = computed(() => {
    return props.features
        .map(id => AI_FEATURES[id])
        .filter(Boolean);
});
</script>
