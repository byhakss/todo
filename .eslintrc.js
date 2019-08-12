module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'prettier',
    'prettier/react',
  ],
  parser: 'babel-eslint',
  plugins: ['prettier', 'react'],
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/destructuring-assignment': 'off',
    'no-confusing-arrow': 'off',
    'no-use-before-define': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'no-nested-ternary': 'warn',
    'react/prop-types': 'warn',
    'prettier/prettier': [
      'error',
      {},
      {
        usePrettierrc: false,
      },
    ],
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
};
