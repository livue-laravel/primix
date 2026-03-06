<template>
    <p-dialog
        v-model:visible="visible"
        modal
        :header="config.modal?.heading || 'Modifica immagine'"
        :style="{ width: modalWidth }"
        :closable="!processing"
        :closeOnEscape="!processing"
        :draggable="false"
        :pt="{
            content: { class: 'p-0' },
            header: { class: 'border-b border-surface-200 dark:border-surface-700' },
            footer: { class: 'border-t border-surface-200 dark:border-surface-700' },
        }"
        @hide="onClose"
    >
        <div class="primix-image-editor flex flex-col" style="height: 70vh;">
            <!-- Top toolbar (undo/redo/reset/zoom) -->
            <editor-toolbar
                :can-undo="canUndo"
                :can-redo="canRedo"
                :zoom-level="zoomLevel"
                :processing="processing"
                @undo="undo"
                @redo="redo"
                @reset="onReset"
                @zoom-in="onZoomIn"
                @zoom-out="onZoomOut"
            />

            <!-- Body: Tool Panel + Canvas + Sidebar -->
            <div class="flex flex-1 overflow-hidden">
                <!-- Left tool panel (Photoshop-style) -->
                <editor-tool-panel
                    :active-tool="activeTool"
                    :config="config"
                    @tool-change="setActiveTool"
                />

                <!-- Canvas area -->
                <editor-canvas
                    ref="canvasRef"
                    :image-url="currentImageUrl"
                    :filter-css="liveFilterCss"
                    :crop-aspect-ratio="numericAspectRatio"
                    :canvas-mode="canvasMode"
                    :config="config"
                    @ready="onCropperReady"
                />

                <!-- Right sidebar (context-sensitive controls) -->
                <editor-sidebar
                    :active-tool="activeTool"
                    :config="config"
                    :adjustments="adjustments"
                    :active-filter="activeFilter"
                    :has-adjustment-changes="hasAdjustmentChanges"
                    :ai-processing="aiProcessingState"
                    :ai-progress="aiProgress"
                    :thumbnail-url="currentImageUrl"
                    :crop-aspect-ratio="numericAspectRatio"
                    @crop-ratio-change="onCropRatioChange"
                    @apply-crop="onApplyCrop"
                    @rotate="onRotate"
                    @flip="onFlip"
                    @adjustment-change="onAdjustmentChange"
                    @reset-adjustments="resetAdjustments"
                    @filter-change="onFilterChange"
                    @ai-action="onAiAction"
                />
            </div>
        </div>

        <template #footer>
            <div class="flex items-center justify-end gap-2">
                <p-button
                    label="Annulla"
                    severity="secondary"
                    @click="onClose"
                    :disabled="processing"
                />
                <p-button
                    label="Applica"
                    icon="pi pi-check"
                    @click="onApply"
                    :loading="processing"
                />
            </div>
        </template>
    </p-dialog>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue';
import { useImageEditor } from '../composables/useImageEditor.js';
import { useAiFeatures } from '../composables/useAiFeatures.js';
import { exportImage } from '../composables/useCanvasPipeline.js';
import EditorToolbar from './image-editor/EditorToolbar.vue';
import EditorToolPanel from './image-editor/EditorToolPanel.vue';
import EditorCanvas from './image-editor/EditorCanvas.vue';
import EditorSidebar from './image-editor/EditorSidebar.vue';

const props = defineProps({
    config: { type: Object, default: () => ({}) },
    statePath: { type: String, required: true },
});

const emit = defineEmits(['save', 'close']);

// State
const visible = ref(false);
const currentImageUrl = ref(null);
const currentFileIndex = ref(null);
const originalName = ref('edited-image.png');
const canvasRef = ref(null);

// Image editor composable
const {
    activeTool, setActiveTool,
    adjustments, setAdjustment, resetAdjustments, hasAdjustmentChanges, ADJUSTMENT_RANGES,
    activeFilter, setFilter, getActiveFilterCss,
    cropAspectRatio, setCropAspectRatio,
    zoomLevel, setZoomLevel,
    canUndo, canRedo, undo, redo,
    pushHistory, resetHistory,
    liveFilterCss,
    processing, aiProcessing,
    resetAll,
} = useImageEditor(props.config);

// Client-side AI features
const {
    processing: aiProcessingState,
    progress: aiProgress,
    processFeature,
} = useAiFeatures();

// Canvas mode derived from active tool
// Canvas tools (move/crop/zoom) map directly to canvas modes
// Panel tools (transform/adjustments/filters/ai) use default 'move' canvas mode
const canvasMode = computed(() => {
    const canvasTools = ['move', 'crop', 'zoom'];
    return canvasTools.includes(activeTool.value) ? activeTool.value : 'move';
});

// Modal width mapping
const modalWidth = computed(() => {
    const map = {
        sm: '400px', md: '500px', lg: '700px', xl: '900px',
        '2xl': '1100px', '3xl': '1300px', '4xl': '1500px', '5xl': '90vw',
    };
    return map[props.config.modal?.width] || '90vw';
});

// Convert crop aspect ratio to numeric value
const numericAspectRatio = computed(() => {
    const ratio = cropAspectRatio.value;
    if (ratio === null || ratio === undefined) return null;
    if (typeof ratio === 'number') return ratio;
    return null;
});

// Public method: open the editor with an image
function open(imageUrl, fileIndex = null, fileName = null) {
    currentImageUrl.value = imageUrl;
    currentFileIndex.value = fileIndex;
    originalName.value = fileName || 'edited-image.png';
    visible.value = true;

    // Reset editor state
    nextTick(() => {
        resetAll();
    });
}

function onCropperReady() {
    resetHistory();
}

function onClose() {
    visible.value = false;
    emit('close');
}

function onReset() {
    resetAll();
    if (canvasRef.value) {
        canvasRef.value.resetTransform();
    }
}

// Crop
function onCropRatioChange(ratio) {
    setCropAspectRatio(ratio);
}

// Apply crop: commit the crop selection as a new image
async function onApplyCrop() {
    if (!canvasRef.value) return;

    processing.value = true;
    try {
        const croppedUrl = await canvasRef.value.applyCrop();
        if (croppedUrl) {
            currentImageUrl.value = croppedUrl;
            canvasRef.value.replaceImage(croppedUrl);
            pushHistory();

            // Switch to move mode after crop is applied
            setActiveTool('move');
        }
    } catch (err) {
        console.error('Apply crop failed:', err);
    } finally {
        processing.value = false;
    }
}

// Transform
function onRotate(degrees) {
    if (canvasRef.value) {
        canvasRef.value.rotate(degrees);
        pushHistory();
    }
}

function onFlip(direction) {
    if (canvasRef.value) {
        if (direction === 'horizontal') {
            canvasRef.value.flipHorizontal();
        } else {
            canvasRef.value.flipVertical();
        }
        pushHistory();
    }
}

// Zoom
function onZoomIn() {
    if (canvasRef.value) {
        canvasRef.value.zoom(0.1);
        setZoomLevel(zoomLevel.value + 10);
    }
}

function onZoomOut() {
    if (canvasRef.value) {
        canvasRef.value.zoom(-0.1);
        setZoomLevel(Math.max(10, zoomLevel.value - 10));
    }
}

// Adjustments
function onAdjustmentChange({ key, value }) {
    setAdjustment(key, value);
}

// Filters
function onFilterChange(filterId) {
    setFilter(filterId);
}

// AI features (client-side, no server needed)
async function onAiAction(featureName) {
    try {
        const newUrl = await processFeature(featureName, currentImageUrl.value);
        if (newUrl) {
            currentImageUrl.value = newUrl;
            if (canvasRef.value) {
                canvasRef.value.replaceImage(newUrl);
            }
            pushHistory();
        }
    } catch (err) {
        console.error('AI processing failed:', err);
    }
}

// Apply edits and emit result
async function onApply() {
    if (!canvasRef.value) return;

    processing.value = true;
    try {
        // Use the full canvas (image is already cropped if user applied crop)
        const fullCanvas = await canvasRef.value.getFullCanvas();
        if (!fullCanvas) {
            console.error('Failed to get canvas');
            return;
        }

        const file = await exportImage(fullCanvas, {
            adjustments: { ...adjustments },
            filterCss: getActiveFilterCss(),
            outputFormat: props.config.output?.format || 'original',
            outputQuality: props.config.output?.quality || 0.92,
            maxWidth: props.config.output?.maxWidth,
            maxHeight: props.config.output?.maxHeight,
            originalName: originalName.value,
        });

        emit('save', { file, fileIndex: currentFileIndex.value });
        visible.value = false;
    } catch (err) {
        console.error('Image export failed:', err);
    } finally {
        processing.value = false;
    }
}

// Expose open method for external usage
defineExpose({ open });
</script>
