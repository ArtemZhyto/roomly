// Modules
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import globals from 'globals'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: [`**/*.{ts,tsx,js,jsx}`],
    plugins: {
      react: reactPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: `detect` },
    },
    rules: {
      [`quotes`]: [`error`, `single`, { allowTemplateLiterals: true }],
      [`semi`]: [`error`, `never`],
      [`react/react-in-jsx-scope`]: `off`,
      [`react/prop-types`]: `off`,
      [`@typescript-eslint/triple-slash-reference`]: `off`,
      [`@typescript-eslint/no-explicit-any`]: `error`,
      [`no-console`]: `warn`,
      [`prefer-const`]: `error`,
    },
  },
  {
    ignores: [`**/next-env.d.ts`, `.next/**`, `node_modules/**`],
  },
)
