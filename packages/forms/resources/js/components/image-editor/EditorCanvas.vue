<template>
    <div
        class="primix-editor-canvas flex-1 relative overflow-hidden bg-surface-900 min-h-[400px]"
        :class="canvasCursorClass"
        @click="onCanvasClick"
    >
        <!-- Loading state -->
        <div v-if="!imageLoaded" class="absolute inset-0 flex items-center justify-center z-10">
            <i class="pi pi-spin pi-spinner text-3xl text-surface-400"></i>
        </div>

        <!-- Cropper container — no sizing constraints so Cropper.js v2
             can manage the image element at natural dimensions and apply
             its own CSS transform via $center('contain'). -->
        <div
            ref="cropperContainerRef"
            class="absolute inset-0"
            :style="{ filter: filterCss }"
        >
            <img
                ref="imageRef"
                :src="imageUrl"
                crossorigin="anonymous"
                @load="onImageLoad"
                style="display: none;"
            >
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue';
import { useCropper } from '../../composables/useCropper.js';

const props = defineProps({
    imageUrl: String,
    filterCss: { type: String, default: 'none' },
    cropAspectRatio: { type: Number, default: null },
    canvasMode: { type: String, default: 'move' },
    config: { type: Object, default: () => ({}) },
});

const emit = defineEmits(['ready']);

const imageRef = ref(null);
const cropperContainerRef = ref(null);
const imageLoaded = ref(false);

const {
    initCropper,
    getCroppedCanvas,
    applyCrop,
    getFullCanvas,
    getCropperSelection,
    getCropperImage,
    getCropperCanvas,
    setAspectRatio,
    setCropVisible,
    rotate,
    flipHorizontal,
    flipVertical,
    zoom,
    resetTransform,
    replaceImage,
    destroy,
} = useCropper();

// Cursor class based on canvas mode
const canvasCursorClass = computed(() => {
    switch (props.canvasMode) {
        case 'crop': return 'cursor-crosshair';
        case 'zoom': return 'cursor-zoom-in';
        default: return 'cursor-grab';
    }
});

// Handle click for zoom mode
function onCanvasClick(e) {
    if (props.canvasMode !== 'zoom') return;

    const image = getCropperImage();
    if (!image) return;

    // Alt+click = zoom out, normal click = zoom in
    const zoomAmount = e.altKey ? -0.2 : 0.2;
    image.$zoom(zoomAmount);
}

function onImageLoad() {
    imageLoaded.value = true;
    nextTick(() => {
        initCropperInstance();
    });
}

function initCropperInstance() {
    if (!imageRef.value) return;

    initCropper(imageRef.value, {});

    // Hide crop overlay initially (default mode is 'move')
    nextTick(() => {
        setCropVisible(props.canvasMode === 'crop');

        // Set initial aspect ratio if configured
        if (props.cropAspectRatio !== null && props.cropAspectRatio !== undefined) {
            setAspectRatio(props.cropAspectRatio);
        }
    });

    emit('ready');
}

// Watch canvas mode changes to show/hide crop overlay
watch(() => props.canvasMode, (mode) => {
    setCropVisible(mode === 'crop');
});

// Watch aspect ratio changes
watch(() => props.cropAspectRatio, (ratio) => {
    setAspectRatio(ratio);
});

// Watch image URL changes (e.g., after AI processing)
watch(() => props.imageUrl, (newUrl) => {
    if (newUrl) {
        imageLoaded.value = false;
        replaceImage(newUrl);
        imageLoaded.value = true;
    }
});

// Expose methods for parent component
defineExpose({
    getCroppedCanvas,
    applyCrop,
    getFullCanvas,
    getCropperSelection,
    getCropperImage,
    getCropperCanvas,
    rotate,
    flipHorizontal,
    flipVertical,
    zoom,
    resetTransform,
    replaceImage,
    setCropVisible,
    destroy,
});
</script>

<style>
/*
 * The cropper-canvas web component is the viewport.  It must fill the
 * available space so Cropper.js can compute contain-scaling correctly.
 *
 * IMPORTANT: Do NOT set max-width / max-height on cropper-image.
 * Cropper.js v2 sets the element to naturalWidth × naturalHeight and
 * then applies a CSS transform (from $center('contain')) to scale it.
 * Adding constraints would cause $center() to miscalculate the scale
 * (it would think the element already fits) and the image would stretch.
 */
.primix-editor-canvas cropper-canvas {
    display: block;
    width: 100%;
    height: 100%;
}

/* Hide crop overlay visually while preserving selection coordinates */
cropper-canvas.crop-hidden cropper-selection,
cropper-canvas.crop-hidden cropper-shade,
cropper-canvas.crop-hidden cropper-handle[action="select"] {
    opacity: 0 !important;
    pointer-events: none !important;
}
</style>
