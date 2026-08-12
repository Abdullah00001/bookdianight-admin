import type { TEnv } from "@/types/system.types";
import { getEnv } from "@/utils/system.utils";

export const env: TEnv = {
  // Vite exposes the environment mode (development/production) via MODE
  NODE_ENV: import.meta.env.MODE,
  VITE_API_URL: getEnv("VITE_API_URL"),
};
