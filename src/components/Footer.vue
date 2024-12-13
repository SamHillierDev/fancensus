<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer
    class="mt-10 bg-[#1A224E] py-4 text-center text-white dark:bg-slate-900"
  >
    <p class="text-sm">
      © {{ currentYear }} Sam Hillier. All rights reserved.
    </p>
  </footer>
</template>
