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
    indent: ['warn', 4],
    'react/jsx-indent': ['warn', 4, { checkAttributes: true }],
    'react/react-in-jsx-scope': 'off',
    'react/destructuring-assignment': 'off',
    'no-use-before-define': 'off',
    'no-nested-ternary': 'warn',
    'react/prop-types': 'warn',
    'eslint-disable': 'no-unused-vars',
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
