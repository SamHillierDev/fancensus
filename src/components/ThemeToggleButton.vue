<script setup lang="ts">
import { SunIcon, MoonIcon } from "@heroicons/vue/24/outline";

defineProps({
  isDarkMode: Boolean,
});

const emit = defineEmits(["toggleDarkMode"]);
</script>

<template>
  <button
    class="cursor-pointer rounded-full bg-blue-50 p-2 text-sm font-semibold text-[#1A224E] shadow-md transition hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
    @click="$emit('toggleDarkMode')"
    :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
    data-test-id="dark-mode-toggle"
  >
    <component :is="isDarkMode ? SunIcon : MoonIcon" class="h-6 w-6" />
  </button>
</template>
