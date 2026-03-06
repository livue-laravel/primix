import { ref } from 'vue';

export const FILTER_PRESETS = [
    {
        id: 'original',
        label: 'Originale',
        css: null,
    },
    {
        id: 'bw',
        label: 'B/N',
        css: 'grayscale(100%)',
    },
    {
        id: 'sepia',
        label: 'Seppia',
        css: 'sepia(80%)',
    },
    {
        id: 'vivid',
        label: 'Vivido',
        css: 'saturate(160%) contrast(110%)',
    },
    {
        id: 'cool',
        label: 'Freddo',
        css: 'saturate(80%) hue-rotate(15deg) brightness(105%)',
    },
    {
        id: 'warm',
        label: 'Caldo',
        css: 'saturate(120%) hue-rotate(-10deg) brightness(105%)',
    },
    {
        id: 'vintage',
        label: 'Vintage',
        css: 'sepia(30%) contrast(90%) brightness(105%) saturate(80%)',
    },
    {
        id: 'dramatic',
        label: 'Drammatico',
        css: 'contrast(140%) brightness(90%) saturate(120%)',
    },
    {
        id: 'fade',
        label: 'Sbiadito',
        css: 'contrast(80%) brightness(115%) saturate(70%)',
    },
    {
        id: 'highcontrast',
        label: 'Alto Contrasto',
        css: 'contrast(160%) brightness(95%)',
    },
];

export function useFilters() {
    const activeFilter = ref(null);

    function setFilter(filterId) {
        if (filterId === 'original' || filterId === null) {
            activeFilter.value = null;
            return;
        }
        activeFilter.value = filterId;
    }

    function getActiveFilterCss() {
        if (!activeFilter.value) return null;
        const preset = FILTER_PRESETS.find(f => f.id === activeFilter.value);
        return preset?.css ?? null;
    }

    function resetFilter() {
        activeFilter.value = null;
    }

    function getSnapshot() {
        return activeFilter.value;
    }

    function restoreSnapshot(snapshot) {
        activeFilter.value = snapshot;
    }

    return {
        activeFilter,
        setFilter,
        getActiveFilterCss,
        resetFilter,
        getSnapshot,
        restoreSnapshot,
        FILTER_PRESETS,
    };
}
