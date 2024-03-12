import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: true,
  minify: true,
  format: ["esm"],
});