<script setup lang="ts">
import FancensusLogo from "./FancensusLogo.vue";
import ThemeToggleButton from "./ThemeToggleButton.vue";

defineProps({
  isDarkMode: Boolean,
});

const emit = defineEmits(["toggleDarkMode"]);
</script>

<template>
  <header
    class="fixed top-0 right-0 left-0 z-50 flex items-center justify-between bg-[#1A224E] px-6 py-3 text-white shadow-md dark:bg-slate-900"
  >
    <FancensusLogo />
    <ThemeToggleButton
      :isDarkMode="isDarkMode"
      @toggleDarkMode="$emit('toggleDarkMode')"
    />
  </header>
</template>
