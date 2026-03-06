<template>
    <div ref="container" class="relative">
        <slot name="trigger" :open="open" :toggle="toggle" />
        <Transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
        >
            <div v-if="open">
                <slot :close="close" />
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const container = ref(null);
const open = ref(false);

function toggle() {
    open.value = !open.value;
}

function close() {
    open.value = false;
}

function onClickOutside(event) {
    if (open.value && container.value && !container.value.contains(event.target)) {
        close();
    }
}

onMounted(() => {
    document.addEventListener('click', onClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', onClickOutside);
});
</script>
