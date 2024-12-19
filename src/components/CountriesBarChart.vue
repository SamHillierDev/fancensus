<script setup lang="ts">
import { computed } from "vue";
import { useSortData } from "../utils/useSortData";
import { countryCodeToName } from "../utils/constants";
import BarChart from "./BarChart.vue";

interface DataItem {
  countrycode: string;
  product: string;
}

const props = defineProps<{
  data: DataItem[];
  selectedGame: string;
  sortOrder?: "asc" | "desc";
}>();

const filteredData = computed(() => {
  if (!props.selectedGame) return props.data;
  return props.data.filter((item) => item.product === props.selectedGame);
});

const sortedData = computed(() => {
  const fullData = useSortData(
    filteredData.value,
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

const chartTitle = computed(
  () =>
    `Top 10 Countries by Mentions${
      props.selectedGame ? ` - ${props.selectedGame}` : ""
    }`,
);
</script>

<template>
  <div>
    <h2 class="mb-6 text-2xl font-semibold">{{ chartTitle }}</h2>
    <BarChart
      :labels="sortedData.labels"
      :dataset="sortedData.dataset"
      :chartTitle="chartTitle"
      xAxisLabel="Countries"
      yAxisLabel="Mentions"
    />
  </div>
</template>
