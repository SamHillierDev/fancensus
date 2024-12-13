<script setup lang="ts">
interface TableColumn {
  header: string;
  key: string;
}

defineProps<{
  columns: TableColumn[];
  rows: Record<string, any>[];
}>();
</script>

<template>
  <table class="w-full border-collapse overflow-hidden rounded-lg text-left">
    <thead
      class="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    >
      <tr>
        <th
          v-for="column in columns"
          :key="column.key"
          class="border-b border-gray-200 px-4 py-2 dark:border-gray-700"
        >
          {{ column.header }}
        </th>
      </tr>
    </thead>
    <tbody class="bg-white dark:bg-gray-900">
      <tr
        v-for="(row, rowIndex) in rows"
        :key="rowIndex"
        :class="[
          rowIndex % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : '',
          'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700',
        ]"
      >
        <td
          v-for="column in columns"
          :key="column.key"
          class="border-b border-gray-200 px-4 py-2 dark:border-gray-700"
        >
          {{ row[column.key] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
