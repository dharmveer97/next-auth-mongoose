import react from "eslint-plugin-react";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import typescriptParser from "@typescript-eslint/parser";
import globals from "globals";
import nextEslintPlugin from "@next/eslint-plugin-next";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx,mjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      ecmaVersion: "latest",
      sourceType: "module",
      parser: typescriptParser,
    },

    plugins: {
      react,
      prettier,
      nextEslintPlugin,
      "@typescript-eslint": typescriptEslint,
    },

    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "prettier/prettier": [
        "error",
        {
          singleQuote: true,
          trailingComma: "all",
          bracketSpacing: true,
          jsxBracketSameLine: false,
          singleQuote: true,
          jsxSingleQuote: true,
        },
      ],
      // Prettier
      "prettier/prettier": "error",

      // General
      "no-console": "warn",

      // React
      "react/react-in-jsx-scope": "off",
      "react/jsx-props-no-spreading": "off",
      "react/prop-types": "off",

      // React Native
      "react-native/no-inline-styles": "off",
      "react-native/split-platform-components": "off",

      // TypeScript
      "@typescript-eslint/no-unused-vars": ["warn"],
      "@typescript-eslint/no-explicit-any": "warn",

      "react/no-unstable-nested-components": ["off", { allowAsProps: true }],
      "react/no-unknown-property": ["error", { ignore: ["css", "tw"] }],
      "global-require": "off",
      "no-underscore-dangle": "off",
      "import/no-extraneous-dependencies": "off",
      "import/prefer-default-export": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-filename-extension": "off",
      "react/prop-types": "off",
      "react/forbid-prop-types": "off",
      "react/jsx-props-no-spreading": "off",
      "react/function-component-definition": "off",
      "jsx-a11y/anchor-is-valid": "off",
      "jsx-a11y/label-has-associated-control": "off",
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/no-static-element-interactions": "off",
    },
  },
];
