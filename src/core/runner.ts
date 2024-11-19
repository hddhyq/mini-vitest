import type { TestCase, TestSuite, TestResult, SuiteResult } from './types';
import { state } from './state';

export const createRunner = () => {
  const runTest = async (
    test: TestCase,
    suite: TestSuite
  ): Promise<TestResult> => {
    const startTime = Date.now();
    try {
      if (suite.beforeEach) {
        await suite.beforeEach();
      }

      await test.fn();

      if (suite.afterEach) {
        await suite.afterEach();
      }

      return {
        name: test.name,
        status: 'passed',
        duration: Date.now() - startTime
      };
    } catch (error) {
      return {
        name: test.name,
        status: 'failed',
        error: error as Error,
        duration: Date.now() - startTime
      };
    }
  };

  const runSuite = async (suite: TestSuite): Promise<SuiteResult> => {
    const startTime = Date.now();
    console.log(`\n🚀 Running suite: ${suite.name}`);

    const results = await Promise.all(
      suite.tests.map(async (test) => {
        const result = await runTest(test, suite);
        console.log(
          `${result.status === 'passed' ? '✅' : '❌'} ${result.name}`
        );
        if (result.error) {
          console.error(result.error);
        }
        return result;
      })
    );

    return {
      name: suite.name,
      results,
      duration: Date.now() - startTime
    };
  };

  const clearState = () => {
    state.currentSuite = null;
    state.suites = [];
  };

  return {
    runSuite,
    runTest,
    clearState
  };
};