<script setup lang="ts">
defineProps<{
  isLoading: boolean;
}>();
</script>

<template>
  <section
    class="rounded-2xl bg-blue-50 p-4 shadow-md dark:bg-slate-800 dark:text-gray-100 dark:shadow-inner dark:shadow-slate-600"
  >
    <div v-if="isLoading" class="flex h-64 items-center justify-center">
      <div
        class="h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-500"
      ></div>
    </div>
    <slot v-else></slot>
  </section>
</template>
