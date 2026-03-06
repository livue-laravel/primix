<template>
    <div class="primix-editor-toolpanel flex flex-col items-center w-12 flex-shrink-0 border-r border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 py-2 gap-0.5">
        <template v-for="item in visibleTools" :key="item.id || item.type">
            <!-- Separator -->
            <div
                v-if="item.type === 'separator'"
                class="my-1.5 w-6 h-px bg-surface-300 dark:bg-surface-600"
            ></div>

            <!-- Tool button -->
            <button
                v-else
                type="button"
                class="w-9 h-9 flex items-center justify-center rounded-lg transition-colors"
                :class="activeTool === item.id
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                    : 'text-surface-500 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700 hover:text-surface-700 dark:hover:text-surface-300'"
                @click="$emit('tool-change', item.id)"
                v-tooltip.right="item.label"
            >
                <i :class="'pi ' + item.icon" class="text-sm"></i>
            </button>
        </template>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    activeTool: { type: String, required: true },
    config: { type: Object, default: () => ({}) },
});

defineEmits(['tool-change']);

const allTools = [
    // Canvas interaction tools
    { id: 'move', label: 'Sposta', icon: 'pi-arrows-alt' },
    { id: 'crop', label: 'Ritaglia', icon: 'pi-objects-column', configKey: 'crop' },
    { id: 'zoom', label: 'Zoom', icon: 'pi-search-plus' },
    // Separator
    { type: 'separator' },
    // Panel tools
    { id: 'transform', label: 'Trasforma', icon: 'pi-sync' },
    { id: 'adjustments', label: 'Regolazioni', icon: 'pi-sliders-h', configKey: 'adjustments' },
    { id: 'filters', label: 'Filtri', icon: 'pi-palette', configKey: 'filters' },
    { id: 'ai', label: 'AI', icon: 'pi-sparkles', configKey: 'ai' },
];

const visibleTools = computed(() => {
    return allTools.filter(item => {
        if (item.type === 'separator') return true;

        // Transform: visible if rotate or flip enabled
        if (item.id === 'transform') {
            return props.config.rotate?.enabled !== false || props.config.flip?.enabled !== false;
        }
        // AI: only if features configured
        if (item.id === 'ai') {
            return props.config.ai?.features?.length > 0;
        }
        // Others: check configKey
        if (item.configKey && props.config[item.configKey]?.enabled === false) {
            return false;
        }
        return true;
    });
});
</script>
