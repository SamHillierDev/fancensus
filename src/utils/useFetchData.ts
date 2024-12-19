import { useQuery } from "@tanstack/vue-query";
import { DATASET_URL } from "./constants";

export const useFetchData = () => {
  return useQuery({
    queryKey: ["dataset"],
    queryFn: async () => {
      const response = await fetch(DATASET_URL);
      if (!response.ok) throw new Error("Failed to fetch data");
      return response.json();
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
