<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import Table from "./AppTable.vue";
import { useSortData } from "../utils/useSortData";
import { countryCodeToName } from "../utils/constants";

interface DataItem {
  countrycode: string;
  product: string;
}

const props = defineProps<{
  data: DataItem[];
  selectedGame: string;
}>();

const filteredData = computed(() => {
  if (!props.selectedGame) return props.data;
  return props.data.filter((item) => item.product === props.selectedGame);
});

const groupedByCountry = computed(() => {
  const { labels, dataset } = useSortData(
    filteredData.value,
    (item) => item.countrycode,
    "desc",
  );
  return labels.map((countryCode, index) => {
    const count = dataset[index];
    let emoji = "";
    if (index === 0) {
      emoji = "🥇";
    } else if (index === 1) {
      emoji = "🥈";
    } else if (index === 2) {
      emoji = "🥉";
    }
    return {
      country: `${emoji} ${countryCodeToName[countryCode] || countryCode}`,
      count,
      code: countryCode,
    };
  });
});

const countryColumns = [
  { header: "Country", key: "country" },
  { header: "Mentions", key: "count" },
];

const router = useRouter();

const navigateToArticle = (row: { code: string }) => {
  const countryCode = row.code.toLowerCase();
  const gameName = props.selectedGame.toLowerCase();

  if (countryCode) {
    router.push({
      name: "articles",
      params: { countrycode: countryCode },
      hash: gameName ? `#${gameName}` : undefined,
    });
  } else {
    console.error("Country code is missing.");
  }
};
</script>

<template>
  <div>
    <h2 class="mb-6 text-2xl font-semibold">
      Most Mentions by Country{{ selectedGame ? ` - ${selectedGame}` : "" }}
    </h2>
    <div class="max-h-96 overflow-y-auto rounded-md border border-gray-300 p-2">
      <Table
        :columns="countryColumns"
        :rows="groupedByCountry"
        @row-click="navigateToArticle"
      />
    </div>
  </div>
</template>
