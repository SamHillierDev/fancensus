<script setup lang="ts">
import { onMounted } from "vue";
import { useFetchData } from "../utils/fetchData";
import GameMentionsChart from "../components/GamesBarChart.vue";
import CountriesChart from "../components/CountriesBarChart.vue";
import GamesTable from "../components/GamesTable.vue";

const { data, fetchData } = useFetchData(
  "https://fancensus.com/test/dataset1.json",
);

onMounted(fetchData);
</script>

<template>
  <main class="mx-auto max-w-6xl space-y-8 p-6">
    <div class="grid grid-cols-1 gap-8 sm:gap-6 lg:grid-cols-2">
      <section
        class="rounded-2xl bg-blue-50 p-4 shadow-md dark:bg-slate-900 dark:text-gray-100 dark:shadow-inner"
      >
        <GameMentionsChart :data="data" />
      </section>

      <section
        class="rounded-2xl bg-blue-50 p-4 shadow-md dark:bg-slate-900 dark:text-gray-100 dark:shadow-inner"
      >
        <CountriesChart :data="data" />
      </section>
    </div>

    <div class="space-y-6">
      <section
        class="rounded-2xl bg-blue-50 p-4 shadow-md dark:bg-slate-900 dark:text-gray-100 dark:shadow-inner"
      >
        <GamesTable :data="data" />
      </section>
    </div>
  </main>
</template>
