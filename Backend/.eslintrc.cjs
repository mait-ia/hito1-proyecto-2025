const path = require('node:path');

const projectPath = path
  .resolve(__dirname, 'tsconfig.json')
  .replace(/\\/g, '/');

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: [projectPath],
    tsconfigRootDir: __dirname
  },
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier'
  ],
  env: {
    node: true,
    es2022: true
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: projectPath,
        alwaysTryTypes: true
      }
    }
  },
  rules: {
    'import/order': [
      'warn',
      {
        alphabetize: { order: 'asc', caseInsensitive: true },
        groups: [
          ['builtin', 'external'],
          ['internal'],
          ['parent', 'sibling', 'index']
        ],
        'newlines-between': 'always'
      }
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      { checksVoidReturn: false, checksConditionals: false }
    ],
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off'
  }
};

