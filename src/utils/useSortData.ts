export interface SortedData {
  labels: string[];
  dataset: number[];
}

export function useSortData<T>(
  data: T[],
  keyExtractor: (item: T) => string,
  order: "asc" | "desc" = "asc",
): SortedData {
  const groupedData = new Map<string, number>();

  data.forEach((item) => {
    const key = keyExtractor(item);
    groupedData.set(key, (groupedData.get(key) || 0) + 1);
  });

  const sortedData = Array.from(groupedData.entries()).sort((a, b) =>
    order === "asc" ? a[1] - b[1] : b[1] - a[1],
  );

  return {
    labels: sortedData.map(([label]) => label),
    dataset: sortedData.map(([, count]) => count),
  };
}
