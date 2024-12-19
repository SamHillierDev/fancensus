<script setup lang="ts">
import { computed } from "vue";
import LineChart from "./LineChart.vue";

interface DataEntry {
  product: string;
  date: string;
}

const props = defineProps<{
  data: DataEntry[];
  selectedGame: string;
}>();

const monthsOf2024 = [
  { id: "2024-01", label: "Jan 24" },
  { id: "2024-02", label: "Feb 24" },
  { id: "2024-03", label: "Mar 24" },
  { id: "2024-04", label: "Apr 24" },
  { id: "2024-05", label: "May 24" },
  { id: "2024-06", label: "Jun 24" },
  { id: "2024-07", label: "Jul 24" },
  { id: "2024-08", label: "Aug 24" },
  { id: "2024-09", label: "Sep 24" },
  { id: "2024-10", label: "Oct 24" },
  { id: "2024-11", label: "Nov 24" },
  { id: "2024-12", label: "Dec 24" },
];

const chartData = computed(() => {
  if (!props.selectedGame) {
    return {
      labels: monthsOf2024.map((m) => m.label),
      dataset: new Array(12).fill(0),
    };
  }

  const filteredData = props.data.filter(
    (entry) => entry.product === props.selectedGame,
  );

  const mentionsByMonth = filteredData.reduce(
    (acc, entry) => {
      const month = new Date(entry.date).toISOString().slice(0, 7);
      if (monthsOf2024.some((m) => m.id === month)) {
        acc[month] = (acc[month] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  const dataset = monthsOf2024.map((month) => mentionsByMonth[month.id] || 0);

  return {
    labels: monthsOf2024.map((m) => m.label),
    dataset,
  };
});

const chartTitle = computed(
  () =>
    `Mentions in 2024${props.selectedGame ? ` - ${props.selectedGame}` : ""}`,
);
</script>

<template>
  <div>
    <h2 class="mb-6 text-2xl font-semibold">{{ chartTitle }}</h2>
    <LineChart
      :labels="chartData.labels"
      :dataset="chartData.dataset"
      :chartTitle="chartTitle"
      xAxisLabel="Month"
      yAxisLabel="Mentions"
    />
  </div>
</template>
