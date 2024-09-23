import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "no-useless-catch": "off",
      "@typescript-eslint/no-explicit-any": "off", 
      "no-useless-catch": "off", // Already present
      "@typescript-eslint/no-implicit-any-catch": "error", // Add this rule to enforce proper typing for catch
      "@typescript-eslint/no-unused-vars": "error", // Already present
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)
