<script setup lang="ts">
import { computed } from "vue";
import { sortData } from "../utils/sortData";
import { countryCodeToName } from "../utils/constants";
import BarChart from "./BarChart.vue";

interface DataItem {
  countrycode: string;
}

const props = defineProps<{
  data: DataItem[];
  sortOrder?: "asc" | "desc";
}>();

const sortedData = computed(() => {
  const fullData = sortData(
    props.data,
    (item) => item.countrycode,
    props.sortOrder || "desc",
  );
  const top10Labels = fullData.labels
    .slice(0, 10)
    .map((code) => countryCodeToName[code] || code);
  const top10Dataset = fullData.dataset.slice(0, 10);

  return {
    labels: top10Labels.reverse(),
    dataset: top10Dataset.reverse(),
  };
});
</script>

<template>
  <div>
    <h2 class="mb-6 text-2xl font-semibold">Most Mentions by Country</h2>
    <BarChart
      :labels="sortedData.labels"
      :dataset="sortedData.dataset"
      chartTitle="Most Mentions by Country"
      xAxisLabel="Countries"
      yAxisLabel="Mentions"
    />
  </div>
</template>
