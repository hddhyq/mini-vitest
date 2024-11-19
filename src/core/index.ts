import { TestSuite, TestCase } from './types';

export class MiniVitest {
  private currentSuite: TestSuite | null = null;
  private suites: TestSuite[] = [];

  describe(name: string, fn: () => void) {
    const suite: TestSuite = {
      name,
      tests: []
    };
    this.currentSuite = suite;
    fn();
    this.suites.push(suite);
    this.currentSuite = null;
  }

  test(name: string, fn: () => void | Promise<void>) {
    if (!this.currentSuite) {
      throw new Error('Test must be run in a describe block');
    }
    this.currentSuite.tests.push({
      name,
      fn: async () => {
        try {
          await fn();
        } catch (error) {
          throw error;
        }
      }
    });
  }

  beforeEach(fn: () => void) {
    if (!this.currentSuite) {
      throw new Error('beforeEach must be called within a describe block');
    }
    this.currentSuite.beforeEach = fn;
  }

  afterEach(fn: () => void) {
    if (!this.currentSuite) {
      throw new Error('afterEach must be called within a describe block');
    }
    this.currentSuite.afterEach = fn;
  }

  getSuites() {
    return this.suites;
  }
}

export const miniVitest = new MiniVitest();
export const { describe, test, beforeEach, afterEach } = miniVitest;

export async function runTest(test: Test, context: TestContext) {
  if (test.options?.isolated) {
    // 创建隔离的测试环境
    const isolatedContext = { ...context, isolated: true };
    // 在这里可以添加清理环境的逻辑

    try {
      await test.fn(isolatedContext);
    } finally {
      // 清理隔离环境
    }
  } else {
    await test.fn(context);
  }
}

export async function runTests(tests: Test[]) {
  const parallelTests = tests.filter(t => t.options?.parallel);
  const serialTests = tests.filter(t => !t.options?.parallel);

  // 并行执行的测试
  const parallelResults = await Promise.all(
    parallelTests.map(test => runTest(test, { isolated: false, parallel: true }))
  );

  // 串行执行的测试
  for (const test of serialTests) {
    await runTest(test, { isolated: false, parallel: false });
  }
}