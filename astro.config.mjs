import { defineConfig } from "astro/config";

if (!process.env.SITE_ORIGIN) {
  throw new Error("SITE_ORIGIN must be defined by the country environment file.");
}

export default defineConfig({
  site: process.env.SITE_ORIGIN,
  output: "static",
  build: {
    format: "file",
  },
  outDir: process.env.SITE_OUTPUT_DIR,
});
