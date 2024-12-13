<script setup lang="ts">
import { defineProps } from "vue";
import FancensusLogo from "./FancensusLogo.vue";
import { SunIcon, MoonIcon } from "@heroicons/vue/24/outline";

defineProps({
  darkMode: Boolean,
});

const emit = defineEmits(["toggleDarkMode"]);
</script>

<template>
  <header
    class="fixed top-0 right-0 left-0 z-50 flex items-center justify-between bg-[#1A224E] px-6 py-3 text-white shadow-md dark:bg-slate-900"
  >
    <FancensusLogo />
    <button
      class="cursor-pointer rounded-full bg-blue-50 p-2 text-sm font-semibold text-[#1A224E] shadow-md transition hover:bg-slate-300 dark:hover:bg-slate-600 dark:bg-slate-700 dark:text-white"
      @click="$emit('toggleDarkMode')"
      :aria-label="darkMode ? 'Switch to light mode' : 'Switch to dark mode'"
    >
      <component :is="darkMode ? MoonIcon : SunIcon" class="h-6 w-6" />
    </button>
  </header>
</template>
