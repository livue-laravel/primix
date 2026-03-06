<template>
    <div class="space-y-5">
        <!-- Rotation -->
        <div class="space-y-3">
            <h4 class="text-sm font-medium text-surface-700 dark:text-surface-300">Rotazione</h4>

            <div class="flex items-center gap-2">
                <p-button
                    icon="pi pi-undo"
                    severity="secondary"
                    outlined
                    size="small"
                    @click="onRotate(-90)"
                    v-tooltip.bottom="'Ruota -90°'"
                />
                <p-button
                    icon="pi pi-replay"
                    severity="secondary"
                    outlined
                    size="small"
                    @click="onRotate(90)"
                    v-tooltip.bottom="'Ruota +90°'"
                />
            </div>

            <!-- Free rotation slider -->
            <div class="space-y-1">
                <div class="flex items-center justify-between">
                    <span class="text-xs text-surface-500 dark:text-surface-400">Rotazione libera</span>
                    <span class="text-xs text-surface-500 dark:text-surface-400 tabular-nums">{{ freeRotation }}°</span>
                </div>
                <p-slider
                    v-model="freeRotation"
                    :min="-45"
                    :max="45"
                    :step="1"
                    @update:modelValue="onFreeRotate"
                    class="w-full"
                />
            </div>
        </div>

        <!-- Flip -->
        <div class="space-y-3">
            <h4 class="text-sm font-medium text-surface-700 dark:text-surface-300">Ribalta</h4>

            <div class="flex items-center gap-2">
                <p-button
                    icon="pi pi-arrows-h"
                    severity="secondary"
                    outlined
                    size="small"
                    @click="onFlipHorizontal"
                    v-tooltip.bottom="'Ribalta orizzontale'"
                    :class="{ 'ring-2 ring-primary-400': flippedH }"
                />
                <p-button
                    icon="pi pi-arrows-v"
                    severity="secondary"
                    outlined
                    size="small"
                    @click="onFlipVertical"
                    v-tooltip.bottom="'Ribalta verticale'"
                    :class="{ 'ring-2 ring-primary-400': flippedV }"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
    config: { type: Object, default: () => ({}) },
});

const emit = defineEmits(['rotate', 'flip']);

const freeRotation = ref(0);
const flippedH = ref(false);
const flippedV = ref(false);

let lastFreeRotation = 0;

function blurActiveElement() {
    if (document.activeElement && document.activeElement !== document.body) {
        document.activeElement.blur();
    }
}

function onRotate(degrees) {
    emit('rotate', degrees);
    blurActiveElement();
}

function onFreeRotate(value) {
    const delta = value - lastFreeRotation;
    lastFreeRotation = value;
    emit('rotate', delta);
}

function onFlipHorizontal() {
    flippedH.value = !flippedH.value;
    emit('flip', 'horizontal');
    blurActiveElement();
}

function onFlipVertical() {
    flippedV.value = !flippedV.value;
    emit('flip', 'vertical');
    blurActiveElement();
}
</script>
