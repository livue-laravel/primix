import { reactive, computed } from 'vue';

export const DEFAULT_ADJUSTMENTS = {
    brightness: 0,   // -100 to +100
    contrast: 0,     // -100 to +100
    saturation: 0,   // -100 to +100
    hue: 0,          // 0 to 360
    blur: 0,         // 0 to 20 (px)
    sharpen: 0,      // 0 to 100 (applied on export only)
};

export const ADJUSTMENT_RANGES = {
    brightness:  { min: -100, max: 100, step: 1, label: 'Luminosità', icon: 'pi-sun' },
    contrast:    { min: -100, max: 100, step: 1, label: 'Contrasto', icon: 'pi-circle-fill' },
    saturation:  { min: -100, max: 100, step: 1, label: 'Saturazione', icon: 'pi-palette' },
    hue:         { min: 0,    max: 360, step: 1, label: 'Tonalità', icon: 'pi-rainbow' },
    blur:        { min: 0,    max: 20,  step: 0.5, label: 'Sfocatura', icon: 'pi-eye' },
    sharpen:     { min: 0,    max: 100, step: 1, label: 'Nitidezza', icon: 'pi-bolt' },
};

/**
 * Convert adjustment values to a CSS filter string for live preview.
 * Sharpen is excluded since it can't be done with CSS filters.
 */
export function toCssFilter(adjustments, filterCss = null) {
    const parts = [];

    // brightness: 0 = 100% (no change), -100 = 0%, +100 = 200%
    if (adjustments.brightness !== 0) {
        parts.push(`brightness(${(100 + adjustments.brightness) / 100})`);
    }

    // contrast: 0 = 100%, -100 = 0%, +100 = 200%
    if (adjustments.contrast !== 0) {
        parts.push(`contrast(${(100 + adjustments.contrast) / 100})`);
    }

    // saturation: 0 = 100%, -100 = 0%, +100 = 200%
    if (adjustments.saturation !== 0) {
        parts.push(`saturate(${(100 + adjustments.saturation) / 100})`);
    }

    // hue-rotate in degrees
    if (adjustments.hue !== 0) {
        parts.push(`hue-rotate(${adjustments.hue}deg)`);
    }

    // blur in pixels
    if (adjustments.blur > 0) {
        parts.push(`blur(${adjustments.blur}px)`);
    }

    // Append filter preset CSS if active
    if (filterCss) {
        parts.push(filterCss);
    }

    return parts.length > 0 ? parts.join(' ') : 'none';
}

export function useAdjustments() {
    const adjustments = reactive({ ...DEFAULT_ADJUSTMENTS });

    function resetAdjustments() {
        Object.assign(adjustments, DEFAULT_ADJUSTMENTS);
    }

    function setAdjustment(key, value) {
        if (key in adjustments) {
            adjustments[key] = value;
        }
    }

    function getSnapshot() {
        return { ...adjustments };
    }

    function restoreSnapshot(snapshot) {
        Object.assign(adjustments, snapshot);
    }

    const hasChanges = computed(() => {
        return Object.keys(DEFAULT_ADJUSTMENTS).some(
            key => adjustments[key] !== DEFAULT_ADJUSTMENTS[key]
        );
    });

    return {
        adjustments,
        resetAdjustments,
        setAdjustment,
        getSnapshot,
        restoreSnapshot,
        hasChanges,
        ADJUSTMENT_RANGES,
    };
}
