import { ApiClient } from "../generated/client";

export const useApiClient = () => {
  const apiHost = import.meta.env.VITE_API_HOST;
  return new ApiClient(apiHost);
};