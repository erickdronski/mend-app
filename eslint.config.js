// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  {
    ignores: ["dist/*", ".expo/**", "supabase/functions/**"],
  },
  expoConfig,
  {
    rules: {
      // Reanimated shared values intentionally mutate `.value`; React Compiler's
      // immutability rule treats that pattern as ordinary React state.
      "react-hooks/immutability": "off",
      // Hydrating local async state and responding to deep links are valid app
      // effects in this codebase; keep lint focused on actionable failures.
      "react-hooks/set-state-in-effect": "off",
    },
  }
]);
