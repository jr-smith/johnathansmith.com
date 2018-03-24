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
  "rules": {
    "import/no-unresolved": 0,
    "import/no-unassigned-import": 0,
    "semi": ["error", "never"],
    "no-console": "off",
    // "indent": ["error", "tab"],
    "vue/max-attributes-per-line": "off",
    "space-before-function-paren": [
      "error",
      {
        "anonymous": "always",
        "named": "always",
        "asyncArrow": "always"
      }
    ],
    "prettier/prettier": ["error", { "semi": false }]
  }
}