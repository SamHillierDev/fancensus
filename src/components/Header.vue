<script setup>
import { ref } from "vue";
import FancensusLogo from "./FancensusLogo.vue";

const darkMode = ref(false);

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
  if (darkMode.value) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};
</script>

<template>
  <header
    class="fixed top-0 right-0 left-0 z-50 flex items-center justify-between bg-[#1A224E] px-6 py-3 text-white shadow-md dark:bg-gray-900"
  >
    <FancensusLogo />
    <button
      class="cursor-pointer rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#1A224E] shadow-md transition dark:bg-gray-700 dark:text-white"
      @click="toggleDarkMode"
    >
      {{ darkMode.value ? "Light Mode" : "Dark Mode" }}
    </button>
  </header>
</template>
