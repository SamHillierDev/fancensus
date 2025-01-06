<script setup lang="ts">
import { ref, computed } from "vue";
import type { Ref } from "vue";
import { useFetchData } from "../utils/useFetchData";
import AppContainer from "../components/AppContainer.vue";
import AppLoading from "../components/AppLoading.vue";
import GameSelector from "../components/GameSelector.vue";
import GamesBarChart from "../components/GamesBarChart.vue";
import CountriesBarChart from "../components/CountriesBarChart.vue";
import GamesTable from "../components/GamesTable.vue";
import CountriesTable from "../components/CountriesTable.vue";
import GamesLineChart from "../components/GamesLineChart.vue";
import WordCloud from "../components/WordCloud.vue";

interface DataEntry {
  product: string;
  headline: string;
  countrycode: string;
  date: string;
}

defineProps<{
  isDarkMode: boolean;
}>();

const { data, isLoading } = useFetchData() as {
  data: Ref<DataEntry[]>;
  isLoading: Ref<boolean>;
};
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
      class="rounded-2xl bg-blue-50 p-4 shadow-md dark:bg-slate-800 dark:text-gray-100 dark:shadow-inner dark:shadow-slate-600"
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
        <AppContainer :isLoading="isLoading">
          <CountriesBarChart
            :data="data"
            :selectedGame="selectedGame"
            :isDarkMode="isDarkMode"
          />
        </AppContainer>

        <AppContainer :isLoading="isLoading">
          <CountriesTable :data="data" :selectedGame="selectedGame" />
        </AppContainer>
      </div>

      <AppContainer :isLoading="isLoading">
        <GamesLineChart
          :data="data"
          :selectedGame="selectedGame"
          :isDarkMode="isDarkMode"
        />
      </AppContainer>

      <AppContainer :isLoading="isLoading">
        <WordCloud :words="selectedGameHeadlines" />
      </AppContainer>
    </div>

    <div v-else class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div class="space-y-6">
        <AppContainer :isLoading="isLoading">
          <GamesBarChart :data="data" :isDarkMode="isDarkMode" />
        </AppContainer>

        <AppContainer :isLoading="isLoading">
          <GamesTable :data="data" />
        </AppContainer>
      </div>

      <div class="space-y-6">
        <AppContainer :isLoading="isLoading">
          <CountriesBarChart
            :data="data"
            :selectedGame="selectedGame"
            :isDarkMode="isDarkMode"
          />
        </AppContainer>

        <AppContainer :isLoading="isLoading">
          <CountriesTable :data="data" :selectedGame="selectedGame" />
        </AppContainer>
      </div>
    </div>
  </main>
</template>
