import type { Config } from '@jest/types';

const jestConfig = async (): Promise<Config.InitialOptions> => {
  return {
      verbose: true,
      clearMocks: true,
      collectCoverage: true,
      collectCoverageFrom: ['**/*.ts', '**/*.tsx'],
      coverageThreshold: {
          global: {
              branches: 10,
              functions: 10,
              lines: 10,
              statements: 10,
          },
      },
      coverageDirectory: 'coverage/jest-unit-tests',
      coveragePathIgnorePatterns: [
          '<rootDir>/src/configs/',
          '<rootDir>/src/index.tsx',
          '<rootDir>/src/react-app-env.d.ts',
          '<rootDir>/src/reportWebVitals.ts',
          '<rootDir>/coverage/',
          '<rootDir>/node_modules/',
          '<rootDir>/cypress/',
          '<rootDir>/jest.config.ts',
      ],
      moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
      rootDir: '.',
      testEnvironment: 'jsdom',
      testMatch: ['**/*.test.tsx', '**/*.test.ts'],
      testPathIgnorePatterns: ['<rootDir>/cypress/'],
      // setupFiles: ['jest-extended', '<rootDir>/src/configs/test-utils/setup-tests.ts'],
      setupFilesAfterEnv: ['jest-extended', '<rootDir>/src/configs/test-utils/setup-tests.ts'],
      transform: {
          '^.+\\.tsx?$': 'ts-jest',
          '^.+\\.js$': 'babel-jest',
          '.+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub'
      },
      moduleNameMapper: {
          '^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub'
      }
  }
}

export default jestConfig;
