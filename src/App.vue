<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div
    :class="[
      'min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 pt-14 text-gray-900',
      'dark:from-gray-800 dark:to-gray-900 dark:text-gray-100',
    ]"
  >
    <Header />

    <router-view />

    <Footer />
  </div>
</template>
