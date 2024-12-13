<script setup lang="ts">
import { computed } from "vue";
import BarChart from "./BarChart.vue";

interface DataItem {
  countrycode: string;
}

const props = defineProps<{
  data: DataItem[];
}>();

const processedData = computed(() => {
  const groupedData = new Map<string, number>();
  props.data.forEach(({ countrycode }) => {
    groupedData.set(countrycode, (groupedData.get(countrycode) || 0) + 1);
  });

  const sortedData = Array.from(groupedData.entries()).sort(
    (a, b) => a[1] - b[1],
  );

  return {
    labels: sortedData.map(([country]) => country),
    dataset: sortedData.map(([, total]) => total),
  };
});
</script>

<template>
  <div>
    <h2 class="mb-6 text-2xl font-semibold">Most Mentions by Country</h2>
    <BarChart
      :labels="processedData.labels"
      :dataset="processedData.dataset"
      chartTitle="Most Mentions by Country"
      xAxisLabel="Countries"
      yAxisLabel="Mentions"
    />
  </div>
</template>
