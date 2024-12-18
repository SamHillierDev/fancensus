import { useQuery } from "@tanstack/vue-query";

export const useFetchData = (url: string) => {
  return useQuery({
    queryKey: [url],
    queryFn: async () => {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch data");
      return response.json();
    },
  });
};
