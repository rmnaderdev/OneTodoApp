import { useQuery } from "@tanstack/react-query";
import type { WeatherForecast } from "~/types/weatherforecast";


export const useForecastQuery = () => {
  return useQuery({
    queryKey: ["weatherForecast"],
    queryFn: async () => {
      const url = new URL(
        "/weatherforecast?count=10000",
        import.meta.env.VITE_API_HOST
      );
      const res = await fetch(url, { headers: { accept: "application/json" } });
      if (!res.ok) {
        throw new Error(`Failed to fetch todos: ${res.statusText}`);
      }
      return (await res.json()) as WeatherForecast[];
    },
  });
};