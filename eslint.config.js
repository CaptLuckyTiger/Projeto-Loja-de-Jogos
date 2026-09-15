import eslint from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  {
    ignores: ['node_modules/**', 'dist/**', 'docs/**', 'legacy/**'],
  },
  eslint.configs.recommended,
  {
    files: ['src/**/*.{js,jsx}'],
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs['recommended-latest'].rules,
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { document: 'readonly', localStorage: 'readonly', window: 'readonly' },
    },
  },
];
