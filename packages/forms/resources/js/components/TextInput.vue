<template>
    <p-input-group :pt="stylePt?.group ? { root: stylePt.group } : undefined">
        <!-- Prefix slot for PHP actions and static content -->
        <slot name="prefix"></slot>

        <!-- The actual input -->
        <p-input-mask
            v-if="mask"
            :id="id"
            :modelValue="modelValue"
            @update:modelValue="$emit('update:modelValue', $event)"
            :disabled="disabled"
            :readonly="readonly"
            :invalid="invalid"
            :placeholder="placeholder"
            :maxlength="maxLength"
            :autocomplete="autocomplete"
            :mask="mask"
            :pt="stylePt?.input ? { root: stylePt.input } : undefined"
            fluid
        ></p-input-mask>
        <p-input-text
            v-else
            :id="id"
            :type="computedType"
            :modelValue="modelValue"
            @update:modelValue="$emit('update:modelValue', $event)"
            :disabled="disabled"
            :readonly="readonly"
            :invalid="invalid"
            :placeholder="placeholder"
            :maxlength="maxLength"
            :autocomplete="autocomplete"
            :pt="stylePt?.input ? { root: stylePt.input } : undefined"
            fluid
        ></p-input-text>

        <!-- Suffix slot for PHP actions and static content -->
        <slot name="suffix"></slot>

        <!-- Vue-native actions (client-side only) -->
        <p-input-group-addon
            v-for="(action, index) in vueActions"
            :key="index"
            class="p-0"
        >
            <p-button
                type="button"
                :icon="getActionIcon(action)"
                :severity="action.severity || 'secondary'"
                :text="action.text !== false"
                @click="executeAction(action)"
            ></p-button>
        </p-input-group-addon>
    </p-input-group>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    id: String,
    type: {
        type: String,
        default: 'text'
    },
    modelValue: [String, Number],
    disabled: Boolean,
    readonly: Boolean,
    invalid: Boolean,
    placeholder: String,
    maxLength: Number,
    mask: {
        type: String,
        default: null
    },
    autocomplete: {
        type: String,
        default: null
    },
    // Vue-native actions configuration
    actions: {
        type: Array,
        default: () => []
    },
    // Style PassThrough from PHP
    stylePt: {
        type: Object,
        default: () => ({})
    }
});

const emit = defineEmits(['update:modelValue']);

// Internal state for actions that modify the input
const revealed = ref(false);

// Filter actions that are Vue-native (not PHP)
const vueActions = computed(() => {
    return props.actions.filter(action => action.handler || action.type);
});

// Compute the actual input type based on state
const computedType = computed(() => {
    if (props.type === 'password' && revealed.value) {
        return 'text';
    }
    return props.type;
});

// Get the appropriate icon for an action based on state
function getActionIcon(action) {
    if (action.type === 'reveal-password') {
        return revealed.value ? 'pi pi-eye-slash' : 'pi pi-eye';
    }
    if (typeof action.icon === 'function') {
        return action.icon({ revealed: revealed.value });
    }
    return action.icon;
}

// Execute a Vue action
function executeAction(action) {
    // Built-in action types
    if (action.type === 'reveal-password') {
        revealed.value = !revealed.value;
        return;
    }

    // Custom handler
    if (action.handler) {
        action.handler({
            revealed,
            value: props.modelValue,
            emit
        });
    }
}
</script>
