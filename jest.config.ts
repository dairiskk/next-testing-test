import nextJest from 'next/jest';
import type { Config } from '@jest/types';

const createJestConfig = nextJest({ dir: './' });

const config: Config.InitialOptions = {
  testEnvironment: 'node',
  testMatch: ['**/*.api-test.ts'],
  coverageProvider: 'v8',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};

export default createJestConfig(config);
