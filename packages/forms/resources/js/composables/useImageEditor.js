import { ref, computed } from 'vue';
import { useAdjustments, toCssFilter } from './useAdjustments.js';
import { useFilters } from './useFilters.js';

const MAX_HISTORY = 30;

export function useImageEditor(config = {}) {
    // Active tool (left toolbar selection)
    const activeTool = ref('move');

    // Processing state
    const processing = ref(false);
    const aiProcessing = ref(null); // name of AI feature being processed, or null

    // Adjustments & filters (delegated to sub-composables)
    const {
        adjustments,
        resetAdjustments,
        setAdjustment,
        getSnapshot: getAdjustmentsSnapshot,
        restoreSnapshot: restoreAdjustmentsSnapshot,
        hasChanges: hasAdjustmentChanges,
        ADJUSTMENT_RANGES,
    } = useAdjustments();

    const {
        activeFilter,
        setFilter,
        getActiveFilterCss,
        resetFilter,
        getSnapshot: getFilterSnapshot,
        restoreSnapshot: restoreFilterSnapshot,
        FILTER_PRESETS,
    } = useFilters();

    // Crop aspect ratio
    const cropAspectRatio = ref(config.crop?.defaultAspectRatio ?? null);

    // Zoom level tracking (for display purposes)
    const zoomLevel = ref(100);

    // Undo/redo history
    const history = ref([]);
    const historyIndex = ref(-1);

    function createSnapshot() {
        return {
            adjustments: getAdjustmentsSnapshot(),
            filter: getFilterSnapshot(),
            cropAspectRatio: cropAspectRatio.value,
        };
    }

    function restoreFromSnapshot(snapshot) {
        restoreAdjustmentsSnapshot(snapshot.adjustments);
        restoreFilterSnapshot(snapshot.filter);
        cropAspectRatio.value = snapshot.cropAspectRatio;
    }

    function pushHistory() {
        const snapshot = createSnapshot();

        // Remove any forward history if we've undone
        if (historyIndex.value < history.value.length - 1) {
            history.value = history.value.slice(0, historyIndex.value + 1);
        }

        history.value.push(snapshot);

        // Limit history size
        if (history.value.length > MAX_HISTORY) {
            history.value = history.value.slice(history.value.length - MAX_HISTORY);
        }

        historyIndex.value = history.value.length - 1;
    }

    function undo() {
        if (historyIndex.value > 0) {
            historyIndex.value--;
            restoreFromSnapshot(history.value[historyIndex.value]);
        }
    }

    function redo() {
        if (historyIndex.value < history.value.length - 1) {
            historyIndex.value++;
            restoreFromSnapshot(history.value[historyIndex.value]);
        }
    }

    const canUndo = computed(() => historyIndex.value > 0);
    const canRedo = computed(() => historyIndex.value < history.value.length - 1);

    function resetHistory() {
        history.value = [createSnapshot()];
        historyIndex.value = 0;
    }

    // Tool switching
    function setActiveTool(tool) {
        activeTool.value = tool;
    }

    // Crop
    function setCropAspectRatio(ratio) {
        cropAspectRatio.value = ratio;
        pushHistory();
    }

    // Zoom (display tracking only, actual zoom handled by cropper)
    function setZoomLevel(level) {
        zoomLevel.value = Math.round(level);
    }

    // Computed CSS filter string for live preview
    const liveFilterCss = computed(() => {
        return toCssFilter(adjustments, getActiveFilterCss());
    });

    // Full reset
    function resetAll() {
        activeTool.value = 'move';
        resetAdjustments();
        resetFilter();
        cropAspectRatio.value = config.crop?.defaultAspectRatio ?? null;
        zoomLevel.value = 100;
        pushHistory();
    }

    return {
        // Tool state
        activeTool,
        setActiveTool,

        // Adjustments
        adjustments,
        setAdjustment: (key, value) => {
            setAdjustment(key, value);
        },
        resetAdjustments: () => {
            resetAdjustments();
            pushHistory();
        },
        hasAdjustmentChanges,
        ADJUSTMENT_RANGES,

        // Filters
        activeFilter,
        setFilter: (filterId) => {
            setFilter(filterId);
            pushHistory();
        },
        getActiveFilterCss,
        FILTER_PRESETS,

        // Crop
        cropAspectRatio,
        setCropAspectRatio,

        // Zoom
        zoomLevel,
        setZoomLevel,

        // History
        pushHistory,
        undo,
        redo,
        canUndo,
        canRedo,
        resetHistory,

        // Live preview
        liveFilterCss,

        // Processing
        processing,
        aiProcessing,

        // Reset
        resetAll,
    };
}
