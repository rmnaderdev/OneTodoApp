import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForecastQuery } from "~/api/useForecastQuery";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

// Example API response type

export default function Home() {
  const forecastQuery = useForecastQuery();

  const forecast = forecastQuery.data;

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
