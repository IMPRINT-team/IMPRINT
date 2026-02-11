module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },

  settings: {
    react: {
      version: "detect",
    },
  },

  plugins: ["react", "react-hooks", "jsx-a11y"],

  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ],

  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },

  ignorePatterns: ["node_modules/", "dist/"],
};