<script setup lang="ts">
import { ref } from "vue";
import { useFetchData } from "../utils/useFetchData";
import GameSelector from "../components/GameSelector.vue";
import CountriesBarChart from "../components/CountriesBarChart.vue";
import GameMentionsChart from "../components/GamesBarChart.vue";
import GamesTable from "../components/GamesTable.vue";
import CountriesTable from "../components/CountriesTable.vue";
import GamesLineChart from "../components/GamesLineChart.vue";
import AppLoading from "../components/AppLoading.vue";

const { data, isLoading } = useFetchData();
const selectedGame = ref("");

const handleGameSelection = (game: string) => {
  selectedGame.value = game;
};
</script>

<template>
  <main class="mx-auto max-w-6xl space-y-8 p-6">
    <section
      class="rounded-2xl bg-blue-50 p-4 shadow-md dark:bg-slate-900 dark:text-gray-100 dark:shadow-inner"
    >
      <div v-if="isLoading">
        <AppLoading/>
      </div>
      <div v-else>
        <GameSelector :games="data" @gameSelected="handleGameSelection" />
      </div>
    </section>

    <div
      class="grid gap-8 sm:gap-6"
      :class="
        selectedGame
          ? 'grid-cols-1 lg:grid-cols-1'
          : 'grid-cols-1 sm:grid-cols-2'
      "
    >
      <section
        v-if="!selectedGame"
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
        :class="selectedGame ? 'lg:col-span-2' : ''"
      >
        <div v-if="isLoading" class="flex h-64 items-center justify-center">
          <div
            class="h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-500"
          ></div>
        </div>
        <CountriesBarChart v-else :data="data" :selectedGame="selectedGame" />
      </section>
    </div>

    <div class="space-y-6">
      <section
        v-if="!selectedGame"
        class="rounded-2xl bg-blue-50 p-4 shadow-md dark:bg-slate-900 dark:text-gray-100 dark:shadow-inner"
      >
        <div v-if="isLoading" class="flex h-64 items-center justify-center">
          <div
            class="h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-500"
          ></div>
        </div>
        <GamesTable v-else :data="data" />
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

      <section
        v-if="selectedGame"
        class="rounded-2xl bg-blue-50 p-4 shadow-md dark:bg-slate-900 dark:text-gray-100 dark:shadow-inner"
      >
        <div v-if="isLoading" class="flex h-64 items-center justify-center">
          <div
            class="h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-500"
          ></div>
        </div>
        <div v-else>
          <GamesLineChart :data="data" :selectedGame="selectedGame" />
        </div>
      </section>
    </div>
  </main>
</template>
