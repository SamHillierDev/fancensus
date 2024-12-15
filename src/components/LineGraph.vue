<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartData, ChartConfiguration } from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
);

const props = defineProps<{
  labels: string[];
  dataset: number[];
  chartTitle?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
}>();

const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart<"line", number[], string> | null = null;

const updateChart = () => {
  if (!chartCanvas.value) return;

  if (chartInstance) {
    chartInstance.destroy();
  }

  const data: ChartData<"line", number[], string> = {
    labels: props.labels,
    datasets: [
      {
        label: "Mentions",
        data: props.dataset,
        borderColor: "#34479b",
        backgroundColor: "rgba(41, 55, 124, 0.5)",
        tension: 0.3,
      },
    ],
  };

  const config: ChartConfiguration<"line", number[], string> = {
    type: "line",
    data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: props.chartTitle || "Line Chart",
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: props.xAxisLabel || "X-Axis",
          },
        },
        y: {
          title: {
            display: true,
            text: props.yAxisLabel || "Y-Axis",
          },
          beginAtZero: true,
        },
      },
      animation: {
        duration: 1000,
        easing: "easeInOutQuad",
      },
    },
  };

  chartInstance = new Chart(chartCanvas.value, config);
};

onMounted(updateChart);
watch(() => [props.labels, props.dataset], updateChart);
</script>

<template>
  <div class="h-100 w-full">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>
