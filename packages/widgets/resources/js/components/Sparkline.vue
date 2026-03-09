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

function createGradient(ctx, color) {
    const gradient = ctx.createLinearGradient(0, 0, 0, props.height);
    gradient.addColorStop(0, color + '40');
    gradient.addColorStop(1, color + '05');
    return gradient;
}

function renderChart() {
    if (!canvas.value) return;

    if (chart) {
        chart.destroy();
    }

    const ctx = canvas.value.getContext('2d');

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: props.data.map((_, i) => i),
            datasets: [{
                data: props.data,
                borderColor: props.color,
                backgroundColor: createGradient(ctx, props.color),
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
                    beginAtZero: true,
                    suggestedMax: Math.max(1, ...props.data),
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
