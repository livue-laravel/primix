<template>
    <p-auto-complete
        :id="id"
        :modelValue="modelValue"
        @update:modelValue="onUpdate"
        :suggestions="filteredSuggestions"
        @complete="onComplete"
        multiple
        :typeahead="hasSuggestions"
        :disabled="disabled"
        :invalid="invalid"
        :placeholder="currentPlaceholder"
        :pt="computedPt"
        fluid
    ></p-auto-complete>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    id: String,
    modelValue: {
        type: Array,
        default: () => []
    },
    suggestions: {
        type: Array,
        default: () => []
    },
    disabled: Boolean,
    invalid: Boolean,
    separator: {
        type: String,
        default: null
    },
    maxItems: {
        type: Number,
        default: null
    },
    allowDuplicates: Boolean,
    addOnBlur: {
        type: Boolean,
        default: true
    },
    placeholder: String,
    stylePt: {
        type: Object,
        default: () => ({})
    }
});

const emit = defineEmits(['update:modelValue']);

const filteredSuggestions = ref([]);

const hasSuggestions = computed(() => props.suggestions.length > 0);

const isAtMax = computed(() => {
    return props.maxItems !== null && (props.modelValue || []).length >= props.maxItems;
});

const currentPlaceholder = computed(() => {
    if (isAtMax.value) return '';
    return props.placeholder;
});

const computedPt = computed(() => {
    const pt = {};
    if (props.stylePt?.input) pt.root = props.stylePt.input;
    if (props.stylePt?.chip) pt.pcChip = props.stylePt.chip;
    return Object.keys(pt).length > 0 ? pt : undefined;
});

function onComplete(event) {
    const query = event.query.toLowerCase();
    const current = props.modelValue || [];

    filteredSuggestions.value = props.suggestions.filter(s => {
        const matchesQuery = s.toLowerCase().includes(query);
        const notDuplicate = props.allowDuplicates || !current.includes(s);
        return matchesQuery && notDuplicate;
    });
}

function onUpdate(value) {
    if (!value) {
        emit('update:modelValue', []);
        return;
    }

    let newValue = Array.isArray(value) ? value : [value];

    // Enforce max items
    if (props.maxItems !== null && newValue.length > props.maxItems) {
        newValue = newValue.slice(0, props.maxItems);
    }

    // Enforce no duplicates
    if (!props.allowDuplicates) {
        newValue = [...new Set(newValue)];
    }

    emit('update:modelValue', newValue);
}
</script>
