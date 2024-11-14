import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  {
    plugins: {
      prettier,
    },

    languageOptions: {
      ecmaVersion: 6,
    },

    rules: {
      'import/no-extraneous-dependencies': 'off',
      'prettier/prettier': ['error'],
      'func-names': 'off',
    },
  },
];
