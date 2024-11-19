import { state } from './state';
import type { TestCase } from './types';

export const test = (name: string, fn: () => void | Promise<void>) => {
  if (!state.currentSuite) {
    throw new Error('Test must be run in a describe block');
  }

  const testCase: TestCase = {
    name,
    fn: async () => {
      try {
        await fn();
      } catch (error) {
        throw error;
      }
    }
  };

  state.currentSuite.tests.push(testCase);
};

// it 作为 test 的别名
export const it = test;