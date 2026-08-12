/**
 * Note: Since this is a Vite React frontend, we use `import.meta.env` instead of 
 * Node's `process.env`. Vite automatically loads `.env` files for us, so we don't 
 * need `dotenv` or `path` imports (which would cause errors in the browser).
 */
export const getEnv = (key: string): string => {
  // Use import.meta.env[key] for Vite projects
  const value = import.meta.env[key];
  
  if (value === undefined) {
    throw new Error(`Missing Environment Variable: ${key}`);
  }
  
  return value as string;
};
