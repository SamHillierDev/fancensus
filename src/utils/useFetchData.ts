import { useQuery } from "@tanstack/vue-query";
import { DATASET, DATASET_BACKUP } from "./constants";

export const useFetchData = () => {
  return useQuery({
    queryKey: ["dataset"],
    queryFn: async () => {
      try {
        const response = await fetch(DATASET);
        if (!response.ok) throw new Error("Failed to fetch from remote URL");
        return await response.json();
      } catch {
        const localResponse = await fetch(DATASET_BACKUP);
        if (!localResponse.ok) throw new Error("Failed to fetch local dataset");
        return await localResponse.json();
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
