<template>
    <div class="primix-editor-sidebar w-72 flex-shrink-0 border-l border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 flex flex-col">
        <!-- Tool-specific controls -->
        <div class="flex-1 overflow-y-auto p-4">
            <!-- Move mode info -->
            <div v-if="activeTool === 'move'" class="space-y-3">
                <h4 class="text-sm font-medium text-surface-700 dark:text-surface-300">Sposta</h4>
                <p class="text-xs text-surface-500 dark:text-surface-400 leading-relaxed">
                    Trascina per spostare l'immagine.
                </p>
                <p class="text-xs text-surface-500 dark:text-surface-400 leading-relaxed">
                    Usa la rotella del mouse per lo zoom.
                </p>
            </div>

            <!-- Crop controls -->
            <crop-controls
                v-if="activeTool === 'crop'"
                :current-ratio="cropAspectRatio"
                :config="config"
                @crop-ratio-change="$emit('crop-ratio-change', $event)"
                @apply-crop="$emit('apply-crop')"
            />

            <!-- Zoom mode info -->
            <div v-if="activeTool === 'zoom'" class="space-y-3">
                <h4 class="text-sm font-medium text-surface-700 dark:text-surface-300">Zoom</h4>
                <p class="text-xs text-surface-500 dark:text-surface-400 leading-relaxed">
                    Clicca sull'immagine per ingrandire.
                </p>
                <p class="text-xs text-surface-500 dark:text-surface-400 leading-relaxed">
                    <kbd class="px-1 py-0.5 bg-surface-100 dark:bg-surface-700 rounded text-[10px]">Alt</kbd> + Clicca per ridurre.
                </p>
                <p class="text-xs text-surface-500 dark:text-surface-400 leading-relaxed">
                    Rotella del mouse per zoom continuo.
                </p>
            </div>

            <!-- Transform controls -->
            <transform-controls
                v-if="activeTool === 'transform'"
                :config="config"
                @rotate="$emit('rotate', $event)"
                @flip="$emit('flip', $event)"
            />

            <!-- Adjustment controls -->
            <adjustment-controls
                v-if="activeTool === 'adjustments'"
                :adjustments="adjustments"
                :has-changes="hasAdjustmentChanges"
                @adjustment-change="$emit('adjustment-change', $event)"
                @reset="$emit('reset-adjustments')"
            />

            <!-- Filter controls -->
            <filter-controls
                v-if="activeTool === 'filters'"
                :active-filter="activeFilter"
                :thumbnail-url="thumbnailUrl"
                @filter-change="$emit('filter-change', $event)"
            />

            <!-- AI controls -->
            <ai-controls
                v-if="activeTool === 'ai'"
                :features="config.ai?.features || []"
                :processing="aiProcessing"
                :progress="aiProgress"
                @ai-action="$emit('ai-action', $event)"
            />
        </div>
    </div>
</template>

<script setup>
import CropControls from './CropControls.vue';
import TransformControls from './TransformControls.vue';
import AdjustmentControls from './AdjustmentControls.vue';
import FilterControls from './FilterControls.vue';
import AiControls from './AiControls.vue';

defineProps({
    activeTool: { type: String, required: true },
    config: { type: Object, default: () => ({}) },
    adjustments: { type: Object, required: true },
    activeFilter: { type: String, default: null },
    hasAdjustmentChanges: Boolean,
    aiProcessing: { type: String, default: null },
    aiProgress: { type: Number, default: 0 },
    thumbnailUrl: { type: String, default: null },
    cropAspectRatio: { type: Number, default: null },
});

defineEmits([
    'crop-ratio-change',
    'apply-crop',
    'rotate',
    'flip',
    'adjustment-change',
    'reset-adjustments',
    'filter-change',
    'ai-action',
]);
</script>
