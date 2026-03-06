<template>
    <div class="flex items-center justify-between px-4 py-2 border-b border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800">
        <!-- Left: Undo/Redo -->
        <div class="flex items-center gap-1">
            <p-button
                icon="pi pi-undo"
                severity="secondary"
                text
                rounded
                size="small"
                :disabled="!canUndo || processing"
                @click="$emit('undo')"
                v-tooltip.bottom="'Annulla'"
            />
            <p-button
                icon="pi pi-redo"
                severity="secondary"
                text
                rounded
                size="small"
                :disabled="!canRedo || processing"
                @click="$emit('redo')"
                v-tooltip.bottom="'Ripristina'"
            />

            <span class="mx-2 w-px h-5 bg-surface-300 dark:bg-surface-600"></span>

            <p-button
                icon="pi pi-refresh"
                severity="secondary"
                text
                rounded
                size="small"
                :disabled="processing"
                @click="$emit('reset')"
                v-tooltip.bottom="'Ripristina originale'"
            />
        </div>

        <!-- Center: Zoom controls -->
        <div class="flex items-center gap-1">
            <p-button
                icon="pi pi-search-minus"
                severity="secondary"
                text
                rounded
                size="small"
                :disabled="processing"
                @click="$emit('zoom-out')"
            />
            <span class="text-xs text-surface-500 dark:text-surface-400 w-12 text-center tabular-nums">
                {{ zoomLevel }}%
            </span>
            <p-button
                icon="pi pi-search-plus"
                severity="secondary"
                text
                rounded
                size="small"
                :disabled="processing"
                @click="$emit('zoom-in')"
            />
        </div>

        <!-- Right: spacer for balance -->
        <div class="w-24"></div>
    </div>
</template>

<script setup>
defineProps({
    canUndo: Boolean,
    canRedo: Boolean,
    zoomLevel: { type: Number, default: 100 },
    processing: Boolean,
});

defineEmits(['undo', 'redo', 'reset', 'zoom-in', 'zoom-out']);
</script>
