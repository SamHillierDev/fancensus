<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";
import { useFetchData } from "../utils/fetchData";
import GameMentionsChart from "../components/GamesBarChart.vue";
import CountriesChart from "../components/CountriesBarChart.vue";

const { data, fetchData } = useFetchData(
  "https://fancensus.com/test/dataset1.json",
);

onMounted(fetchData);
</script>

<template>
  <main class="mx-auto max-w-6xl space-y-8 p-6">
    <section
      class="rounded-2xl bg-white p-4 shadow-md dark:bg-gray-800 dark:text-gray-100"
    >
      <GameMentionsChart :data="data" />
    </section>

    <section
      class="rounded-2xl bg-white p-4 shadow-md dark:bg-gray-800 dark:text-gray-100"
    >
      <CountriesChart :data="data" />
    </section>
  </main>
</template>
