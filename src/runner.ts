export class TestRunner {
  async runSuite(suite: TestSuite) {
    console.log(`\n🚀 Running suite: ${suite.name}`);

    for (const test of suite.tests) {
      try {
        if (suite.beforeEach) {
          await suite.beforeEach();
        }

        await test.fn();

        if (suite.afterEach) {
          await suite.afterEach();
        }

        console.log(`✅ ${test.name}`);
      } catch (error) {
        console.log(`❌ ${test.name}`);
        console.error(error);
      }
    }
  }
}