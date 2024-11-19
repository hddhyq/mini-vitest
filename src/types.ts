// 定义核心类型
interface TestCase {
  name: string;
  fn: () => void | Promise<void>;
}

interface TestSuite {
  name: string;
  tests: TestCase[];
  beforeEach?: () => void;
  afterEach?: () => void;
}