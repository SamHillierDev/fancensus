<script setup lang="ts">
import { computed, watch, ref } from "vue";
import BarChart from "./BarChart.vue";
import { useSortData } from "../utils/useSortData";

interface DataItem {
  product: string;
}

const props = defineProps<{
  data: DataItem[];
  isDarkMode: boolean;
}>();

const sortedData = computed(() => {
  const fullData = useSortData(props.data, (item) => item.product, "desc");
  const top10Labels = fullData.labels.slice(0, 10);
  const top10Dataset = fullData.dataset.slice(0, 10);

  return {
    labels: top10Labels.reverse(),
    dataset: top10Dataset.reverse(),
  };
});

const chartTitle = computed(() => "Top 10 Most Popular Games");
</script>

<template>
  <div>
    <h2 class="mb-6 text-2xl font-semibold">{{ chartTitle }}</h2>
    <BarChart
      :labels="sortedData.labels"
      :dataset="sortedData.dataset"
      :chartTitle="chartTitle"
      :isDarkMode="props.isDarkMode"
      xAxisLabel="Games"
      yAxisLabel="Mentions"
    />
  </div>
</template>
