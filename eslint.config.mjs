import next from "eslint-config-next";

const config = [
  {
    ignores: ["**/node_modules/**", ".next/**"]
  },
  ...next,
  {
    rules: {
      "react/jsx-key": "warn"
    }
  }
];

export default config;
