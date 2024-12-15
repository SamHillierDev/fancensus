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
</script>

<template>
  <div>
    <h2 class="mb-4 text-xl font-semibold">Select a Game</h2>
    <select
      v-model="selectedGame"
      @change="handleSelection"
      class="w-full rounded border px-2 py-1"
    >
      <option value="" disabled>Select a game</option>
      <option
        v-for="game in uniqueSortedGames"
        :key="game.product"
        :value="game.product"
      >
        {{ game.product }}
      </option>
    </select>
  </div>
</template>
