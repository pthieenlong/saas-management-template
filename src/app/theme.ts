import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: {
          50:  { value: "#e6ecff" },
          100: { value: "#b3c2ff" },
          200: { value: "#809aff" },
          300: { value: "#4d72ff" },
          400: { value: "#264fff" },
          500: { value: "#0044ff" },
          600: { value: "#003de6" },
          700: { value: "#0035cc" },
          800: { value: "#002db3" },
          900: { value: "#001f80" },
        },
      },
    },
    semanticTokens: {
      colors: {
        // Wire the colorPalette tokens used across the app to the primary scale
        "colorPalette.solid": {
          value: { base: "{colors.primary.500}", _dark: "{colors.primary.400}" },
        },
        "colorPalette.subtle": {
          value: { base: "{colors.primary.50}", _dark: "{colors.primary.900}" },
        },
        "colorPalette.fg": {
          value: { base: "{colors.primary.700}", _dark: "{colors.primary.200}" },
        },
        "colorPalette.muted": {
          value: { base: "{colors.primary.100}", _dark: "{colors.primary.800}" },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
