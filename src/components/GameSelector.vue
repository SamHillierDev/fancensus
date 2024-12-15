<script setup lang="ts">
import { ref, computed } from "vue";

interface Game {
  product: string;
}

const props = defineProps<{ games: Game[] }>();
const emits = defineEmits<{
  (event: "gameSelected", value: string): void;
}>();

const uniqueSortedGames = computed(() => {
  const uniqueGames = Array.from(
    new Map(props.games.map((game) => [game.product, game])).values(),
  );
  return uniqueGames.sort((a, b) => a.product.localeCompare(b.product));
});

const selectedGame = ref("");

const handleSelection = (event: Event) => {
  selectedGame.value = (event.target as HTMLSelectElement).value;
  emits("gameSelected", selectedGame.value);
};

const clearSelection = () => {
  selectedGame.value = "";
  emits("gameSelected", "");
};
</script>

<template>
  <div>
    <h2 class="mb-4 text-xl font-semibold">Select a Game</h2>
    <div class="flex items-center gap-2">
      <select
        v-model="selectedGame"
        @change="handleSelection"
        class="w-full rounded border bg-blue-50 px-2 py-1 text-gray-900 dark:border-gray-600 dark:bg-slate-700 dark:text-gray-100"
      >
        <option value="" disabled class="text-gray-400 dark:text-gray-500">
          Select a game
        </option>
        <option
          v-for="game in uniqueSortedGames"
          :key="game.product"
          :value="game.product"
          class="text-gray-900 dark:text-gray-100"
        >
          {{ game.product }}
        </option>
      </select>
      <button
        v-if="selectedGame"
        @click="clearSelection"
        class="cursor-pointer rounded bg-[#29377C] px-4 py-1 text-white transition hover:bg-[#4f5a99]"
      >
        Clear
      </button>
    </div>
  </div>
</template>
