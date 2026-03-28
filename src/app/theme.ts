import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        // Brand primary — warm teal inspired by natural materials
        primary: {
          50:  { value: "#eef6f4" },
          100: { value: "#cce8e2" },
          200: { value: "#99d1c5" },
          300: { value: "#66baa8" },
          400: { value: "#3da38c" },
          500: { value: "#1a8c75" },
          600: { value: "#157a65" },
          700: { value: "#106855" },
          800: { value: "#0b5644" },
          900: { value: "#063d30" },
        },
        // Warm neutral — replaces cold gray for a cozy interior feel
        neutral: {
          50:  { value: "#faf8f5" },
          100: { value: "#f2ede7" },
          200: { value: "#e5ddd3" },
          300: { value: "#cfc4b8" },
          400: { value: "#b8a99b" },
          500: { value: "#9e8e7e" },
          600: { value: "#7d6d5f" },
          700: { value: "#5e5048" },
          800: { value: "#3d342c" },
          900: { value: "#1f1a15" },
        },
        // Warm amber accent — evokes oak wood, honey, candlelight
        accent: {
          100: { value: "#fdf0d5" },
          300: { value: "#f9c86a" },
          500: { value: "#e89c2f" },
          700: { value: "#a0651a" },
        },
      },
    },
    semanticTokens: {
      colors: {
        // colorPalette wires CTA buttons, badges, focus rings to primary
        "colorPalette.solid":  { value: { base: "{colors.primary.500}", _dark: "{colors.primary.400}" } },
        "colorPalette.subtle": { value: { base: "{colors.primary.50}",  _dark: "{colors.primary.900}" } },
        "colorPalette.fg":     { value: { base: "{colors.primary.700}", _dark: "{colors.primary.200}" } },
        "colorPalette.muted":  { value: { base: "{colors.primary.100}", _dark: "{colors.primary.800}" } },

        // Surface tokens — use these for bg/border instead of hardcoded values
        "bg.canvas":    { value: { base: "{colors.neutral.50}",  _dark: "{colors.neutral.900}" } },
        "bg.surface":   { value: { base: "{colors.neutral.100}", _dark: "{colors.neutral.800}" } },
        "border.muted": { value: { base: "{colors.neutral.200}", _dark: "{colors.neutral.700}" } },
        "text.body":    { value: { base: "{colors.neutral.800}", _dark: "{colors.neutral.100}" } },
        "text.muted":   { value: { base: "{colors.neutral.500}", _dark: "{colors.neutral.400}" } },

        // Override Chakra's default blue colorPalette for all interactive components
        // to use primary (teal) instead. This is the v3-correct way since colorPalette
        // is a CSS variable scope, not a recipe variant.
        "colorPalette.50":  { value: "{colors.primary.50}" },
        "colorPalette.100": { value: "{colors.primary.100}" },
        "colorPalette.200": { value: "{colors.primary.200}" },
        "colorPalette.300": { value: "{colors.primary.300}" },
        "colorPalette.400": { value: "{colors.primary.400}" },
        "colorPalette.500": { value: "{colors.primary.500}" },
        "colorPalette.600": { value: "{colors.primary.600}" },
        "colorPalette.700": { value: "{colors.primary.700}" },
        "colorPalette.800": { value: "{colors.primary.800}" },
        "colorPalette.900": { value: "{colors.primary.900}" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
