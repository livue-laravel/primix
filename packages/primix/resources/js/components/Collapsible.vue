<template>
    <div>
        <slot name="trigger" :open="open" :toggle="toggle" />
        <Transition
            @before-enter="onBeforeEnter"
            @enter="onEnter"
            @after-enter="onAfterEnter"
            @before-leave="onBeforeLeave"
            @leave="onLeave"
            @after-leave="onAfterLeave"
        >
            <div v-show="open">
                <slot />
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    defaultOpen: {
        type: Boolean,
        default: true,
    },
});

const open = ref(props.defaultOpen);

function toggle() {
    open.value = !open.value;
}

function onBeforeEnter(el) {
    el.style.height = '0';
    el.style.overflow = 'hidden';
}

function onEnter(el) {
    el.style.height = el.scrollHeight + 'px';
    el.style.transition = 'height 0.2s ease';
}

function onAfterEnter(el) {
    el.style.height = '';
    el.style.overflow = '';
    el.style.transition = '';
}

function onBeforeLeave(el) {
    el.style.height = el.scrollHeight + 'px';
    el.style.overflow = 'hidden';
}

function onLeave(el) {
    // Force reflow so the browser registers the initial height
    el.offsetHeight;
    el.style.height = '0';
    el.style.transition = 'height 0.2s ease';
}

function onAfterLeave(el) {
    el.style.height = '';
    el.style.overflow = '';
    el.style.transition = '';
}
</script>
