<script setup lang="ts">
import { computed } from "vue";
import Table from "./Table.vue";
import { sortData } from "../utils/sortData";

interface DataItem {
  product: string;
}

const props = defineProps<{ data: DataItem[] }>();

const groupedByGame = computed(() => {
  const { labels, dataset } = sortData(
    props.data,
    (item) => item.product,
    "desc",
  );
  return labels.map((game, index) => {
    let emoji = "";
    if (index === 0) emoji = "🥇";
    else if (index === 1) emoji = "🥈";
    else if (index === 2) emoji = "🥉";
    return { game: `${emoji} ${game}`, count: dataset[index] };
  });
});

const columns = [
  { header: "Games", key: "game" },
  { header: "Mentions", key: "count" },
];
</script>

<template>
  <div>
    <h2 class="mb-6 text-2xl font-semibold">Most Popular Games</h2>
    <div class="max-h-96 overflow-y-auto rounded-md border border-gray-300 p-2">
      <Table :columns="columns" :rows="groupedByGame" />
    </div>
  </div>
</template>
