<script setup lang="ts">
interface TableColumn {
  header: string;
  key: string;
}

defineProps<{
  columns: TableColumn[];
  rows: Record<string, any>[] | null;
}>();

defineEmits(["row-click"]);
</script>

<template>
  <table class="w-full border-collapse overflow-hidden rounded-lg text-left">
    <thead
      class="bg-blue-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    >
      <tr>
        <th
          v-for="column in columns"
          :key="column.key"
          class="border-b border-blue-200 px-4 py-2 dark:border-gray-700"
        >
          {{ column.header }}
        </th>
      </tr>
    </thead>
    <tbody class="bg-blue-50 dark:bg-gray-900">
      <template v-if="rows && rows.length > 0">
        <tr
          v-for="(row, rowIndex) in rows"
          :key="rowIndex"
          @click="$emit('row-click', row)"
          :class="[
            rowIndex % 2 === 0 ? 'bg-blue-100 dark:bg-gray-800' : '',
            'cursor-pointer hover:bg-blue-200 dark:hover:bg-gray-700',
          ]"
        >
          <td
            v-for="column in columns"
            :key="column.key"
            class="border-b border-blue-200 px-4 py-2 dark:border-gray-700"
          >
            {{ row[column.key] }}
          </td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td
            :colspan="columns.length"
            class="border-b border-blue-200 px-4 py-6 text-center text-gray-500 dark:border-gray-700 dark:text-gray-400"
          >
            Unable to fetch data
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>
