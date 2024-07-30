/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  
  testEnvironment: 'jest-environment-jsdom',
  collectCoverage: true,
  coverageReporters: ["json", "html"],
  clearMocks: true,
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    collectCoverageFrom: ["./**.ts","./**.tsx", "!./node_modules/**", "!./lib/**", "!./jest.setup.ts"],
    coveragePathIgnorePatterns: [
      "/node_modules/",
      "testconfig.js",
       "app/layout.tsx",
      "package.json",
      "package-lock.json"
    ],
    coverageThreshold: {
      global: {
        lines: 5
      }
    }
  
}
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)