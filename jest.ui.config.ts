// jest.ui.config.ts
import nextJest from 'next/jest';
import type { Config } from '@jest/types'; // ✅ correct source for type-safe config

const createJestConfig = nextJest({ dir: './' });

const config: Config.InitialOptions = {
    testEnvironment: 'jsdom',
    testMatch: ['**/*.ui-test.ts?(x)'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    coverageProvider: 'v8',
};

export default createJestConfig(config);
