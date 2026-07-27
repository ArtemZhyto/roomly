// Modules
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import globals from 'globals'

export default tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended, {
  files: [`**/*.{ts,js}`],
  languageOptions: {
    globals: {
      ...globals.node,
    },
  },
  rules: {
    [`quotes`]: [`error`, `single`, { allowTemplateLiterals: true }],
    [`semi`]: [`error`, `never`],
    [`@typescript-eslint/no-explicit-any`]: `error`,
    [`@typescript-eslint/no-unused-vars`]: `error`,
    [`no-console`]: `warn`,
    [`prefer-const`]: `error`,
  },
})
