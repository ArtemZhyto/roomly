// Modules
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import globals from 'globals'

export default tseslint.config(
  {
    ignores: [`node_modules/**`, `service/dist/**`, `service/generated/**`],
  },

  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: [`**/*.{ts,js,mjs,cjs}`],

    languageOptions: {
      globals: {
        ...globals.node,
      },
    },

    rules: {
      [`quotes`]: [
        `error`,
        `single`,
        {
          allowTemplateLiterals: true,
        },
      ],

      [`semi`]: [`error`, `never`],

      [`@typescript-eslint/no-explicit-any`]: `error`,

      [`@typescript-eslint/no-unused-vars`]: [
        `error`,
        {
          argsIgnorePattern: `^_`,
          caughtErrorsIgnorePattern: `^_`,
          varsIgnorePattern: `^_`,
        },
      ],

      [`no-console`]: `warn`,
      [`prefer-const`]: `error`,
    },
  },

  {
    files: [`service/jest.config.js`, `service/jest.integration.config.js`],

    rules: {
      [`@typescript-eslint/no-require-imports`]: `off`,
    },
  },

  {
    files: [
      `service/prisma/**/*.ts`,
      `service/src/server.ts`,
      `service/src/errors/error-handler.middleware.ts`,
      `service/src/services/auth/issue-verification-code.service.ts`,
      `service/src/services/auth/password.service.ts`,
      `service/src/workers/**/*.ts`,
    ],

    rules: {
      [`no-console`]: `off`,
    },
  },
)
