// Modules
import { spawnSync } from 'node:child_process'
import process from 'node:process'

const databaseUrl = 'postgres://bookingUser:bookingPassword@localhost:5002/roomly_test'

const composeFile = '../docker-compose.test.yml'
const jestExecutable = '../node_modules/jest/bin/jest.js'

const run = (command, args, options = {}) => {
  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    env: {
      ...process.env,
      DATABASE_URL: databaseUrl,
    },
    shell: process.platform === 'win32',
    stdio: 'inherit',
    ...options,
  })

  if (result.error) {
    throw result.error
  }

  if (result.status !== 0) {
    throw new Error(`${command} exited with code ${result.status ?? 1}`)
  }
}

let exitCode = 0

try {
  run('docker', ['compose', '-f', composeFile, 'up', '-d', '--wait'])

  run('npx', ['prisma', 'migrate', 'deploy'])

  run('node', [
    '--experimental-vm-modules',
    jestExecutable,
    '--config',
    'jest.integration.config.js',
    '--runInBand',
    '--verbose',
    '--passWithNoTests',
  ])
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  exitCode = 1
} finally {
  const stopResult = spawnSync('docker', ['compose', '-f', composeFile, 'down'], {
    cwd: process.cwd(),
    shell: process.platform === 'win32',
    stdio: 'inherit',
  })

  if (stopResult.error) {
    console.error(stopResult.error)
    exitCode = 1
  } else if (stopResult.status !== 0 && exitCode === 0) {
    exitCode = stopResult.status ?? 1
  }
}

process.exit(exitCode)
