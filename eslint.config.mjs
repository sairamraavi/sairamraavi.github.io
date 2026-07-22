import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });
const config = [
  { ignores: [".next/**", "out/**", "node_modules/**"] },
  ...compat.extends("next/core-web-vitals"),
  { rules: { "@next/next/no-html-link-for-pages": "off" } },
];
export default config;
