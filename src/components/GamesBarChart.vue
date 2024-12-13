<script setup lang="ts">
import { computed } from "vue";
import BarChart from "./BarChart.vue";

interface DataItem {
  product: string;
}

const props = defineProps<{
  data: DataItem[];
}>();

const processedData = computed(() => {
  const groupedData = new Map<string, number>();
  props.data.forEach(({ product }) => {
    groupedData.set(product, (groupedData.get(product) || 0) + 1);
  });

  const sortedData = Array.from(groupedData.entries()).sort(
    (a, b) => a[1] - b[1],
  );

  return {
    labels: sortedData.map(([product]) => product),
    dataset: sortedData.map(([, total]) => total),
  };
});
</script>

<template>
  <div>
    <h2 class="mb-6 text-2xl font-semibold">Most Popular Games</h2>
    <BarChart
      :labels="processedData.labels"
      :dataset="processedData.dataset"
      chartTitle="Most Popular Games"
      xAxisLabel="Games"
      yAxisLabel="Mentions"
    />
  </div>
</template>
