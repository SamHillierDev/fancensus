<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFetchData } from "../utils/useFetchData";
import { countryCodeToName } from "../utils/constants";
import AppLoading from "../components/AppLoading.vue";
import ArticleCard from "../components/ArticleCard.vue";

interface Article {
  countrycode: string;
  name: string;
  headline: string;
  product: string;
  date: string;
}

const route = useRoute();
const router = useRouter();
const countrycode = ref((route.params.countrycode as string).toLowerCase());
const productFilter = ref("");
const countryName = computed(
  () => countryCodeToName[countrycode.value.toUpperCase()] || countrycode.value,
);
const articles = ref<Article[]>([]);
const isLoading = ref(true);

const { data, isLoading: queryLoading } = useFetchData();

onMounted(() => {
  if (!data.value) {
    isLoading.value = true;
  }

  watch(
    () => queryLoading.value,
    (newVal) => {
      if (!newVal && data.value) {
        filterArticles();
        isLoading.value = false;
      }
    },
    { immediate: true },
  );

  watch(() => route.hash, filterArticles);
});

const filterArticles = () => {
  if (!data.value) return;

  const hashProduct = route.hash?.replace("#", "").toLowerCase();

  const filteredArticles = data.value.filter((item: Article) => {
    const matchesCountry = item.countrycode.toLowerCase() === countrycode.value;
    const matchesProduct =
      !hashProduct || item.product.toLowerCase() === hashProduct;

    return matchesCountry && matchesProduct;
  });

  if (!hashProduct) {
    productFilter.value = "";
  } else if (filteredArticles.length > 0) {
    const matchingProduct = filteredArticles.find(
      (item: Article) => item.product.toLowerCase() === hashProduct,
    );
    productFilter.value = matchingProduct ? matchingProduct.product : "";
  }

  articles.value = filteredArticles
    .sort(
      (a: Article, b: Article) =>
        new Date(b.date).getTime() - new Date(a.date).getTime(),
    )
    .map((article: Article) => ({
      ...article,
      headline: article.headline || "No headline available",
      name: article.name || "Unknown source",
      product: article.product || "No product specified",
      date: article.date || "No date specified",
    }));
};

const updateProductHash = (product: string) => {
  router.replace({ hash: `#${product.toLowerCase()}` });
};

const clearProductFilter = () => {
  productFilter.value = "";
  router.replace({ hash: "" });
};
</script>

<template>
  <main class="mx-auto max-w-6xl space-y-8 p-6">
    <section
      class="rounded-2xl bg-blue-50 p-4 shadow-md dark:bg-slate-900 dark:text-gray-100 dark:shadow-inner"
    >
      <h2
        class="mb-6 flex flex-wrap items-center gap-2 text-2xl font-semibold"
      >
        Articles for {{ countryName }}
        <span v-if="productFilter"> - {{ productFilter }} </span>
        <button
          v-if="productFilter"
          class="cursor-pointer rounded bg-[#29377C] px-2 py-1 text-sm text-white transition hover:bg-[#4f5a99]"
          @click="clearProductFilter"
        >
          Clear
        </button>
      </h2>
      <div v-if="isLoading" class="flex h-64 items-center justify-center">
        <AppLoading />
      </div>
      <div
        v-else-if="articles.length > 0"
        class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <ArticleCard
          v-for="(article, index) in articles"
          :key="index"
          :article="article"
          :onProductClick="updateProductHash"
        />
      </div>
      <div v-else class="text-center">
        <p class="text-lg text-gray-600 dark:text-gray-400">
          No articles available for this country
          <span v-if="productFilter"> and product</span>.
        </p>
      </div>
    </section>
  </main>
</template>
