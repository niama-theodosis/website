/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  bracketSpacing: false,
  printWidth: 140,
  proseWrap: "always",
  semi: false,
  trailingComma: "es5",
  plugins: ["prettier-plugin-tailwindcss"],
}

export default config
