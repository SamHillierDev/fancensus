<script setup lang="ts">
import { formatDate } from "../utils/formatDate";

interface Article {
  headline: string;
  name: string;
  product: string;
  date: string;
}

const props = defineProps<{
  article: Article;
  onProductClick: (product: string) => void;
}>();

const handleProductClick = () => {
  props.onProductClick(props.article.product);
};
</script>

<template>
  <article
    class="group cursor-pointer rounded-lg border border-gray-300 bg-blue-50 p-4 shadow-md hover:bg-blue-100 hover:shadow-lg dark:border-gray-700 dark:bg-slate-800 dark:hover:bg-slate-700"
  >
    <h3 class="mb-2 text-xl font-semibold text-blue-600 dark:text-blue-400">
      {{ article.headline }}
    </h3>
    <p class="mb-4 text-sm text-gray-600 hover:underline dark:text-gray-400">
      {{ article.name }}
    </p>
    <p
      class="cursor-pointer text-sm text-gray-800 hover:underline dark:text-gray-200"
      @click="handleProductClick"
    >
      {{ article.product }}
    </p>
    <p class="text-sm text-gray-800 dark:text-gray-200">
      {{ formatDate(article.date) }}
    </p>
  </article>
</template>
