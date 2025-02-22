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
        class="w-full rounded border border-slate-300 bg-blue-50 p-2 text-slate-900 shadow-inner shadow-slate-300 outline-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:shadow-slate-900 dark:outline dark:outline-slate-900"
      >
        <option value="" disabled class="text-slate-400 dark:text-slate-500">
          Select a game
        </option>
        <option
          v-for="game in uniqueSortedGames"
          :key="game.product"
          :value="game.product"
          class="text-slate-900 dark:text-slate-100"
        >
          {{ game.product }}
        </option>
      </select>
      <button
        v-if="selectedGame"
        @click="clearSelection"
        class="cursor-pointer rounded bg-[#29377C] px-4 py-2 text-white shadow-inner shadow-[#29507c] transition hover:bg-[#29467c] active:shadow-[#2a297c]"
      >
        Clear
      </button>
    </div>
  </div>
</template>
