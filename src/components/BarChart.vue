<script setup lang="ts">
import { computed } from "vue";
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

const maxLabelLength = props.maxLabelLength || 10;

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
}));
</script>

<template>
  <div class="h-100 w-full">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
