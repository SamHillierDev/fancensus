<script setup lang="ts">
import { ref, onMounted } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

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
      'min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 pt-14 text-gray-900',
      'dark:from-gray-800 dark:to-gray-900 dark:text-gray-100',
    ]"
  >
    <Header :darkMode="darkMode" @toggleDarkMode="toggleDarkMode" />

    <router-view />

    <Footer />
  </div>
</template>
