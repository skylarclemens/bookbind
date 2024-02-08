module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // suppress errors for missing 'import React' in files
    "react/react-in-jsx-scope": "off",
    // allow jsx syntax in js files (for next.js project)
    "react/jsx-filename-extension": [1, { "extensions": [".ts", ".tsx"] }], //should add ".ts" if typescript project
  },
}
