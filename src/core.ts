// 实现基础测试API
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
    this.currentSuite.tests.push({ name, fn });
  }

  // 添加异步测试支持
  async test(name: string, fn: () => void | Promise<void>) {
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
}