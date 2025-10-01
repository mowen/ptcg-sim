// @ts-check

import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "**/*.test.ts"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
  },
);
