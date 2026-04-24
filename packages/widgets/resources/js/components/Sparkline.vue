<template>
    <canvas ref="canvas" :style="{ height: height + 'px', width: '100%' }"></canvas>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler);

const props = defineProps({
    data: {
        type: Array,
        required: true,
    },
    color: {
        type: String,
        default: '#6366f1',
    },
    height: {
        type: Number,
        default: 40,
    },
});

const canvas = ref(null);
let chart = null;

function resolveRange(values) {
    if (!Array.isArray(values) || values.length === 0) {
        return { min: -1, max: 1 };
    }

    const numericValues = values.map((value) => Number(value) || 0);
    const min = Math.min(...numericValues);
    const max = Math.max(...numericValues);

    if (min === max) {
        const padding = Math.max(Math.abs(max) * 0.35, 1);

        return {
            min: min - padding,
            max: max + padding,
        };
    }

    const spread = max - min;
    const padding = Math.max(spread * 0.18, 0.5);

    return {
        min: min - padding,
        max: max + padding,
    };
}

function resolveColor(color) {
    if (typeof color !== 'string') return '#6366f1';
    const trimmed = color.trim();
    const match = trimmed.match(/^var\((--[^,)\s]+)(?:\s*,\s*([^)]+))?\)$/);
    if (!match) return trimmed;
    const [, varName, fallback] = match;
    const resolved = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    if (resolved) return resolveColor(resolved);
    if (fallback) return resolveColor(fallback.trim());
    return '#6366f1';
}

function toRgba(color, alpha) {
    const probe = document.createElement('canvas').getContext('2d');
    probe.fillStyle = '#000';
    probe.fillStyle = color;
    const computed = probe.fillStyle;
    if (computed.startsWith('#')) {
        const hex = computed.length === 4
            ? computed.replace(/^#(.)(.)(.)$/, '#$1$1$2$2$3$3')
            : computed;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r},${g},${b},${alpha})`;
    }
    const rgbMatch = computed.match(/^rgba?\(([^)]+)\)$/);
    if (rgbMatch) {
        const [r, g, b] = rgbMatch[1].split(',').map((s) => s.trim());
        return `rgba(${r},${g},${b},${alpha})`;
    }
    return computed;
}

function createGradient(ctx, color) {
    const resolved = resolveColor(color);
    const gradient = ctx.createLinearGradient(0, 0, 0, props.height);
    gradient.addColorStop(0, toRgba(resolved, 0.25));
    gradient.addColorStop(1, toRgba(resolved, 0.02));
    return gradient;
}

function renderChart() {
    if (!canvas.value) return;

    if (chart) {
        chart.destroy();
    }

    const ctx = canvas.value.getContext('2d');
    const resolved = resolveColor(props.color);
    const range = resolveRange(props.data);

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: props.data.map((_, i) => i),
            datasets: [{
                data: props.data,
                borderColor: resolved,
                backgroundColor: createGradient(ctx, resolved),
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHitRadius: 0,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false },
            },
            scales: {
                x: { display: false },
                y: {
                    display: false,
                    min: range.min,
                    max: range.max,
                },
            },
            animation: {
                duration: 500,
            },
        },
    });
}

onMounted(() => {
    renderChart();
});

watch(() => [props.data, props.color], () => {
    renderChart();
}, { deep: true });

onBeforeUnmount(() => {
    if (chart) {
        chart.destroy();
        chart = null;
    }
});
</script>
