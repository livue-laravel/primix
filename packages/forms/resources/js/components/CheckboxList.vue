<template>
    <div class="primix-checkbox-list-advanced">
        <div v-if="searchable" class="mb-2">
            <p-input-text
                v-model="searchQuery"
                placeholder="Search..."
                fluid
                size="small"
            />
        </div>

        <div v-if="bulkToggleable" class="mb-2 flex gap-2">
            <p-button
                label="Select All"
                size="small"
                text
                @click="selectAll"
            />
            <p-button
                label="Deselect All"
                size="small"
                text
                @click="deselectAll"
            />
        </div>

        <div :class="containerClass" :style="containerStyle">
            <div
                v-for="option in filteredOptions"
                :key="option.value"
                class="flex items-start gap-2"
            >
                <p-checkbox
                    :id="`${id}_${option.value}`"
                    :modelValue="modelValue"
                    @update:modelValue="$emit('update:modelValue', $event)"
                    :value="option.value"
                    :disabled="disabled || option.disabled"
                    :pt="checkboxPt || undefined"
                />
                <div>
                    <label :for="`${id}_${option.value}`" class="cursor-pointer">
                        {{ option.label }}
                    </label>
                    <p v-if="option.description" class="text-sm text-surface-500">
                        {{ option.description }}
                    </p>
                </div>
            </div>
        </div>

        <p v-if="searchable && filteredOptions.length === 0" class="text-sm text-surface-400 py-2">
            No results found.
        </p>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    id: String,
    modelValue: {
        type: Array,
        default: () => [],
    },
    options: {
        type: Array,
        default: () => [],
    },
    disabled: Boolean,
    searchable: Boolean,
    bulkToggleable: Boolean,
    inline: Boolean,
    gridColumns: Number,
    checkboxPt: Object,
});

const emit = defineEmits(['update:modelValue']);

const searchQuery = ref('');

const filteredOptions = computed(() => {
    if (!searchQuery.value) {
        return props.options;
    }
    const query = searchQuery.value.toLowerCase();
    return props.options.filter(option =>
        option.label.toLowerCase().includes(query)
    );
});

const containerClass = computed(() => {
    if (props.gridColumns) return '';
    return props.inline ? 'flex flex-wrap gap-4' : 'flex flex-col gap-2';
});

const containerStyle = computed(() => {
    if (props.gridColumns) {
        return {
            display: 'grid',
            gridTemplateColumns: `repeat(${props.gridColumns}, 1fr)`,
            gap: '0.5rem',
        };
    }
    return {};
});

function selectAll() {
    const allValues = filteredOptions.value
        .filter(o => !o.disabled)
        .map(o => o.value);
    const current = new Set(props.modelValue || []);
    allValues.forEach(v => current.add(v));
    emit('update:modelValue', [...current]);
}

function deselectAll() {
    const deselectableValues = new Set(
        filteredOptions.value.filter(o => !o.disabled).map(o => o.value)
    );
    const remaining = (props.modelValue || []).filter(v => !deselectableValues.has(v));
    emit('update:modelValue', remaining);
}
</script>
