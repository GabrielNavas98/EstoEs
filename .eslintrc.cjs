/* eslint-env node */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    project: './*tsconfig.json', 
  },
  root: true,
  rules: {
    '@typescript-eslint/no-unsafe-enum-comparison': 0
  }
};
