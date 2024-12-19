<script setup lang="ts">
import { ref, onMounted } from "vue";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";

const darkMode = ref(false);

const initializeTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    darkMode.value = true;
    document.documentElement.classList.add("dark");
  } else {
    darkMode.value = false;
    document.documentElement.classList.remove("dark");
  }
};

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
  if (darkMode.value) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
};

onMounted(initializeTheme);
</script>

<template>
  <div
    :class="[
      'min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 pt-14 text-gray-900',
      'dark:from-slate-700 dark:to-slate-800 dark:text-gray-100',
    ]"
  >
    <AppHeader :darkMode="darkMode" @toggleDarkMode="toggleDarkMode" />

    <router-view />

    <AppFooter />
  </div>
</template>
