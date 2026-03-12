<template>
    <div class="primix-editor-sidebar w-72 flex-shrink-0 border-l border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 flex flex-col">
        <!-- Tool-specific controls -->
        <div class="flex-1 overflow-y-auto p-4">
            <!-- Move mode info -->
            <div v-if="activeTool === 'move'" class="space-y-3">
                <h4 class="text-sm font-medium text-surface-700 dark:text-surface-300">{{ translations.move_title || 'Move' }}</h4>
                <p class="text-xs text-surface-500 dark:text-surface-400 leading-relaxed">
                    {{ translations.drag_to_move || 'Drag to move the image.' }}
                </p>
                <p class="text-xs text-surface-500 dark:text-surface-400 leading-relaxed">
                    {{ translations.mouse_wheel_zoom || 'Use the mouse wheel to zoom.' }}
                </p>
            </div>

            <!-- Crop controls -->
            <crop-controls
                v-if="activeTool === 'crop'"
                :current-ratio="cropAspectRatio"
                :config="config"
                :translations="translations"
                @crop-ratio-change="$emit('crop-ratio-change', $event)"
                @apply-crop="$emit('apply-crop')"
            />

            <!-- Zoom mode info -->
            <div v-if="activeTool === 'zoom'" class="space-y-3">
                <h4 class="text-sm font-medium text-surface-700 dark:text-surface-300">{{ translations.zoom_title || 'Zoom' }}</h4>
                <p class="text-xs text-surface-500 dark:text-surface-400 leading-relaxed">
                    {{ translations.click_to_zoom_in || 'Click on the image to zoom in.' }}
                </p>
                <p class="text-xs text-surface-500 dark:text-surface-400 leading-relaxed">
                    <kbd class="px-1 py-0.5 bg-surface-100 dark:bg-surface-700 rounded text-[10px]">Alt</kbd> + {{ translations.alt_click_zoom_out || 'Click to zoom out.' }}
                </p>
                <p class="text-xs text-surface-500 dark:text-surface-400 leading-relaxed">
                    {{ translations.mouse_wheel_continuous || 'Mouse wheel for continuous zoom.' }}
                </p>
            </div>

            <!-- Transform controls -->
            <transform-controls
                v-if="activeTool === 'transform'"
                :config="config"
                :translations="translations"
                @rotate="$emit('rotate', $event)"
                @flip="$emit('flip', $event)"
            />

            <!-- Adjustment controls -->
            <adjustment-controls
                v-if="activeTool === 'adjustments'"
                :adjustments="adjustments"
                :has-changes="hasAdjustmentChanges"
                :translations="translations"
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
                :translations="translations"
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
    translations: { type: Object, default: () => ({}) },
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
