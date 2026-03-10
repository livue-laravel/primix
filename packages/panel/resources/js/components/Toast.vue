<template>
    <Transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <div v-if="visible">
            <slot :close="close" />
        </div>
    </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
    duration: {
        type: Number,
        default: 5000,
    },
});

const visible = ref(true);

function close() {
    visible.value = false;
}

onMounted(() => {
    if (props.duration > 0) {
        setTimeout(close, props.duration);
    }
});
</script>
