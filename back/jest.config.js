/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  projects: ['<rootDir>/service'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  verbose: true,
}
