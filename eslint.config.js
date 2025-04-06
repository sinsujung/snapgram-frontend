import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";

export default {
  ignores: ["dist"],
  overrides: [
    {
      files: ["**/*.{js,jsx}"],
      languageOptions: {
        ecmaVersion: "latest",
        globals: globals.browser,
        parserOptions: {
          ecmaFeatures: { jsx: true },
          sourceType: "module",
        },
      },
      plugins: {
        "react-hooks": reactHooks,
      },
      rules: {
        ...js.configs.recommended.rules,
        ...reactHooks.configs.recommended.rules,
        "react/prop-types": "off",
        "no-unused-vars": "off",
      },
    },
  ],
};
