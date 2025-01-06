<script setup lang="ts">
import { useDarkMode } from "./utils/useDarkMode";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";

const { isDarkMode, toggleDarkMode } = useDarkMode();
</script>

<template>
  <div
    :class="[
      'min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 pt-14 text-gray-900',
      'dark:from-slate-700 dark:to-slate-800 dark:text-gray-100',
    ]"
  >
    <AppHeader :isDarkMode="isDarkMode" @toggleDarkMode="toggleDarkMode" />
    <router-view :isDarkMode="isDarkMode" />
    <AppFooter />
  </div>
</template>
