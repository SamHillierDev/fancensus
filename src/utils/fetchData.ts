import { ref } from "vue";

export const useFetchData = (url: string) => {
  const data = ref([]);
  const fetchData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch data");
      data.value = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return { data, fetchData };
};
