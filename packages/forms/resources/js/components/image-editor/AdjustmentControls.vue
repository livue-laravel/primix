<template>
    <div class="space-y-4">
        <div class="flex items-center justify-between">
            <h4 class="text-sm font-medium text-surface-700 dark:text-surface-300">Regolazioni</h4>
            <p-button
                v-if="hasChanges"
                label="Reset"
                severity="secondary"
                text
                size="small"
                @click="$emit('reset')"
            />
        </div>

        <div class="space-y-4">
            <div
                v-for="(range, key) in ADJUSTMENT_RANGES"
                :key="key"
                class="space-y-1"
            >
                <div class="flex items-center justify-between">
                    <label class="text-xs text-surface-600 dark:text-surface-400 flex items-center gap-1.5">
                        <i :class="'pi ' + range.icon" class="text-[10px]"></i>
                        {{ range.label }}
                    </label>
                    <span class="text-xs text-surface-500 dark:text-surface-400 tabular-nums w-10 text-right">
                        {{ formatValue(key, adjustments[key]) }}
                    </span>
                </div>
                <p-slider
                    :modelValue="adjustments[key]"
                    @update:modelValue="onAdjustmentChange(key, $event)"
                    :min="range.min"
                    :max="range.max"
                    :step="range.step"
                    class="w-full"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ADJUSTMENT_RANGES } from '../../composables/useAdjustments.js';

defineProps({
    adjustments: { type: Object, required: true },
    hasChanges: Boolean,
});

const emit = defineEmits(['adjustment-change', 'reset']);

function onAdjustmentChange(key, value) {
    emit('adjustment-change', { key, value });
}

function formatValue(key, value) {
    if (key === 'hue') return `${value}°`;
    if (key === 'blur') return `${value}px`;
    if (key === 'sharpen') return `${value}%`;
    return value > 0 ? `+${value}` : `${value}`;
}
</script>
