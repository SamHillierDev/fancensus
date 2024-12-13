<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import {
  Chart,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import type { ChartData, ChartConfiguration } from "chart.js";

Chart.register(
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
);

const props = defineProps<{
  labels: string[];
  dataset: number[];
  chartTitle?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
}>();

const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart<"bar", number[], string> | null = null;

const updateChart = () => {
  if (!chartCanvas.value) return;

  if (chartInstance) {
    chartInstance.destroy();
  }

  const data: ChartData<"bar", number[], string> = {
    labels: props.labels,
    datasets: [
      {
        label: "Mentions",
        data: props.dataset,
        backgroundColor: "#29377c",
        borderColor: "#34479b",
        borderWidth: 1,
      },
    ],
  };

  const config: ChartConfiguration<"bar", number[], string> = {
    type: "bar",
    data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: props.chartTitle || "Bar Chart",
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
