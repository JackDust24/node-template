import globals from 'globals';
import pluginJs from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import securityPlugin from 'eslint-plugin-security';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs', globals: globals.node },
    plugins: {
      prettier: prettierPlugin,
      security: securityPlugin,
    },
    rules: {
      'consistent-return': 'off',
      'no-console': 'error',
      ...prettierConfig.rules,
    },
  },
  pluginJs.configs.recommended, // ESLint recommended rules
  securityPlugin.configs.recommended,
  {
    rules: {
      'security/detect-object-injection': 'off',
    },
  },
];
