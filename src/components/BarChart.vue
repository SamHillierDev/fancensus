<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
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
  isDarkMode: boolean;
  chartTitle?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  maxLabelLength?: number;
}>();

const truncateLabels = (labels: string[], maxLength: number) => {
  return labels.map((label) =>
    label.length > maxLength ? label.slice(0, maxLength) + "..." : label,
  );
};

const chartKey = ref(0);

watch(
  () => props.isDarkMode,
  () => {
    chartKey.value++;
  },
);

const maxLabelLength = props.maxLabelLength ?? 10;

const chartData = computed(() => ({
  labels: truncateLabels(props.labels, maxLabelLength),
  datasets: [
    {
      label: "Mentions",
      data: props.dataset,
      backgroundColor: "#29377c",
      borderColor: "#34479b",
      borderWidth: 1,
    },
  ],
}));

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: props.chartTitle ?? "Bar Chart",
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
        text: props.xAxisLabel ?? "X-Axis",
        color: props.isDarkMode ? "#ffffff" : "#000000",
      },
      ticks: {
        color: props.isDarkMode ? "#ffffff" : "#000000",
      },
    },
    y: {
      title: {
        display: true,
        text: props.yAxisLabel ?? "Y-Axis",
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
    <Bar :key="chartKey" :data="chartData" :options="chartOptions" />
  </div>
</template>
