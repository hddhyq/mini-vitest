export interface TestCase {
  name: string;
  fn: () => void | Promise<void>;
}

export interface TestSuite {
  name: string;
  tests: TestCase[];
  beforeEach?: () => void;
  afterEach?: () => void;
}

export interface TestResult {
  name: string;
  status: 'passed' | 'failed';
  error?: Error;
  duration: number;
}

export interface SuiteResult {
  name: string;
  results: TestResult[];
  duration: number;
}

export interface TestOptions {
  isolated?: boolean;
  parallel?: boolean;
}

export interface TestContext {
  isolated: boolean;
  parallel: boolean;
}