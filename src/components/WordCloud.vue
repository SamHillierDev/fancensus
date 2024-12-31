<script setup lang="ts">
import { onMounted, watch, ref } from "vue";
import WordCloud from "wordcloud";

const props = defineProps<{ words: string[] }>();

const wordCloudContainer = ref<HTMLDivElement | null>(null);

const renderWordCloud = () => {
  if (wordCloudContainer.value) {
    const wordCounts = props.words.reduce<Record<string, number>>((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});

    let wordArray: [string, number][] = Object.entries(wordCounts).map(
      ([word, count]) => [word, count]
    );

    wordArray = wordArray.sort((a, b) => b[1] - a[1]).slice(0, 100);

    if (!wordArray.length) wordArray = [["No Data", 1]];

    WordCloud(wordCloudContainer.value, {
      list: wordArray,
      weightFactor: (size) => Math.log(size + 1) * 10,
      gridSize: 10,
      rotateRatio: 0.4,
      backgroundColor: "transparent",
      minSize: 14,
      drawOutOfBound: false,
      shuffle: false,
    });
  }
};

onMounted(renderWordCloud);
watch(() => props.words, renderWordCloud);
</script>

<template>
  <div ref="wordCloudContainer" class="h-64 w-full"></div>
</template>
