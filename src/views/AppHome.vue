<script setup lang="ts">
import { ref, computed } from "vue";
import type { Ref } from "vue";
import { useFetchData } from "../utils/useFetchData";
import GameSelector from "../components/GameSelector.vue";
import CountriesBarChart from "../components/CountriesBarChart.vue";
import GameMentionsChart from "../components/GamesBarChart.vue";
import GamesTable from "../components/GamesTable.vue";
import CountriesTable from "../components/CountriesTable.vue";
import GamesLineChart from "../components/GamesLineChart.vue";
import WordCloud from "../components/WordCloud.vue";
import AppLoading from "../components/AppLoading.vue";

interface DataEntry {
  product: string;
  headline: string;
  countrycode: string;
  date: string;
}

const { data, isLoading } = useFetchData() as { data: Ref<DataEntry[]>; isLoading: Ref<boolean> };
const selectedGame = ref("");

const handleGameSelection = (game: string) => {
  selectedGame.value = game;
};

const selectedGameHeadlines = computed(() => {
  if (!selectedGame.value) return [];
  return data.value
    .filter((entry: DataEntry) => entry.product === selectedGame.value)
    .map((entry: DataEntry) => entry.headline.split(" "))
    .flat();
});
</script>

<template>
  <main class="mx-auto max-w-6xl space-y-6 p-6">
    <section
      class="rounded-2xl bg-blue-50 p-4 shadow-md dark:bg-slate-900 dark:text-gray-100 dark:shadow-inner"
    >
      <div v-if="isLoading">
        <AppLoading />
      </div>
      <div v-else>
        <GameSelector :games="data" @gameSelected="handleGameSelection" />
      </div>
    </section>

    <div v-if="selectedGame" class="space-y-6">
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section
          class="rounded-2xl bg-blue-50 p-4 shadow-md dark:bg-slate-900 dark:text-gray-100 dark:shadow-inner"
        >
          <div v-if="isLoading" class="flex h-64 items-center justify-center">
            <div
              class="h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-500"
            ></div>
          </div>
          <CountriesBarChart v-else :data="data" :selectedGame="selectedGame" />
        </section>

        <section
          class="rounded-2xl bg-blue-50 p-4 shadow-md dark:bg-slate-900 dark:text-gray-100 dark:shadow-inner"
        >
          <div v-if="isLoading" class="flex h-64 items-center justify-center">
            <div
              class="h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-500"
            ></div>
          </div>
          <CountriesTable v-else :data="data" :selectedGame="selectedGame" />
        </section>
      </div>

      <section
        class="rounded-2xl bg-blue-50 p-4 shadow-md lg:col-span-2 dark:bg-slate-900 dark:text-gray-100 dark:shadow-inner"
      >
        <div v-if="isLoading" class="flex h-64 items-center justify-center">
          <div
            class="h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-500"
          ></div>
        </div>
        <GamesLineChart v-else :data="data" :selectedGame="selectedGame" />
      </section>

      <section
        class="rounded-2xl bg-blue-50 p-4 shadow-md lg:col-span-2 dark:bg-slate-900 dark:text-gray-100 dark:shadow-inner"
      >
        <div v-if="isLoading" class="flex h-64 items-center justify-center">
          <div
            class="h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-500"
          ></div>
        </div>
        <WordCloud v-else :words="selectedGameHeadlines" />
      </section>
    </div>

    <div v-else class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div class="space-y-6">
        <section
          class="rounded-2xl bg-blue-50 p-4 shadow-md dark:bg-slate-900 dark:text-gray-100 dark:shadow-inner"
        >
          <div v-if="isLoading" class="flex h-64 items-center justify-center">
            <div
              class="h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-500"
            ></div>
          </div>
          <GameMentionsChart v-else :data="data" />
        </section>

        <section
          class="rounded-2xl bg-blue-50 p-4 shadow-md dark:bg-slate-900 dark:text-gray-100 dark:shadow-inner"
        >
          <div v-if="isLoading" class="flex h-64 items-center justify-center">
            <div
              class="h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-500"
            ></div>
          </div>
          <GamesTable v-else :data="data" />
        </section>
      </div>

      <div class="space-y-6">
        <section
          class="rounded-2xl bg-blue-50 p-4 shadow-md dark:bg-slate-900 dark:text-gray-100 dark:shadow-inner"
        >
          <div v-if="isLoading" class="flex h-64 items-center justify-center">
            <div
              class="h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-500"
            ></div>
          </div>
          <CountriesBarChart v-else :data="data" :selectedGame="selectedGame" />
        </section>

        <section
          class="rounded-2xl bg-blue-50 p-4 shadow-md dark:bg-slate-900 dark:text-gray-100 dark:shadow-inner"
        >
          <div v-if="isLoading" class="flex h-64 items-center justify-center">
            <div
              class="h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-500"
            ></div>
          </div>
          <CountriesTable v-else :data="data" :selectedGame="selectedGame" />
        </section>
      </div>
    </div>
  </main>
</template>
