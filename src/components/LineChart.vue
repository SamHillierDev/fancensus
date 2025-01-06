<script setup lang="ts">
import { computed, watch, ref } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
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
  isDarkMode: boolean;
}>();

const chartKey = ref(0);
watch(
  () => props.isDarkMode,
  () => {
    chartKey.value++;
  },
);

const chartData = computed(() => ({
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
}));

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: props.chartTitle || "Line Chart",
      color: props.isDarkMode ? "#ffffff" : "#000000",
    },
    tooltip: {
      bodyColor: props.isDarkMode ? "#ffffff" : "#000000",
    },
    legend: {
      labels: {
        color: props.isDarkMode ? "#ffffff" : "#000000",
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: props.xAxisLabel || "X-Axis",
        color: props.isDarkMode ? "#ffffff" : "#000000",
      },
      ticks: {
        color: props.isDarkMode ? "#ffffff" : "#000000",
      },
    },
    y: {
      title: {
        display: true,
        text: props.yAxisLabel || "Y-Axis",
        color: props.isDarkMode ? "#ffffff" : "#000000",
      },
      ticks: {
        color: props.isDarkMode ? "#ffffff" : "#000000",
      },
      beginAtZero: true,
    },
  },
}));
</script>

<template>
  <div class="h-100 w-full">
    <Line :key="chartKey" :data="chartData" :options="chartOptions" />
  </div>
</template>
