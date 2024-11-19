import type { TestSuite } from './types';

export interface TestState {
  currentSuite: TestSuite | null;
  suites: TestSuite[];
}

export const createTestState = (): TestState => ({
  currentSuite: null,
  suites: []
});

// 全局状态
export const state = createTestState();