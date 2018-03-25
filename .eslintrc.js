module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  "parser": "vue-eslint-parser",
  "parserOptions": {
   "parser": "babel-eslint",
    "sourceType": "module",
    "allowImportExportEverywhere": false,
    "codeFrame": false,
    "ecmaVersion": 2017,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended",
    "plugin:prettier/recommended"
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    "import/no-unresolved": 0,
    "import/no-unassigned-import": 0,
    "semi": ["error", "never"],
    "no-console": "off",
    "space-before-function-paren": "off",
    // "indent": ["error", "tab"],
    "vue/max-attributes-per-line": "off",
    "vue/space-before-function-paren": "off",
    "space-before-function-paren": [
      "error",
      {
        "anonymous": "always",
        "named": "always",
        "asyncArrow": "always"
      }
    ],
    "prettier/prettier": ["error", { "semi": false }]}
}