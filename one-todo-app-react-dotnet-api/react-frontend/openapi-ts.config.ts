import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: '../backend/Backend.json',
  output: 'app/api/generated',
  plugins: [
    '@tanstack/react-query',
  ],
});