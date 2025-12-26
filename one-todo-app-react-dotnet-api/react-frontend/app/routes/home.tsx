import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

// Example API response type
type WeatherForecast = {
  data: string;
  summary: string;
  temperatureC: number;
  temperatureF: number;
};

export default function Home() {
  const [forecast, setForecast] = useState<WeatherForecast[] | null>(null);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    const url = new URL("/weatherforecast", import.meta.env.VITE_API_HOST);
    const res = await fetch(url, { headers: { accept: "application/json" } });
    console.log("API Response Status:", res);
    if (!res.ok) {
      throw new Error(`Failed to fetch todos: ${res.statusText}`);
    }
    setForecast((await res.json()) as WeatherForecast[]);
  };

  return (
    <>
      <Welcome />
      {forecast ? (
        <div className="container mx-auto p-4">
          <h2 className="text-lg font-semibold">API Check</h2>
          <p className="text-gray-700 dark:text-gray-200">
            Loaded {Array.isArray(forecast) ? forecast.length : 0} forecasts
            from backend.
          </p>
        </div>
      ) : <p>Loading...</p>}
    </>
  );
}
