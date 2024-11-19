import { describe, test, expect, createRunner, state, beforeEach } from '../src';

describe('Calculator', () => {
  let value = 0;

  beforeEach(() => {
    value = 0;
  });

  test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
  });

  test('object equality', () => {
    expect({ foo: 'bar' }).toEqual({ foo: 'bar' });
  });

  test('async test', async () => {
    const result = await Promise.resolve(42);
    expect(result).toBe(42);
  });

  test('async test 2', async () => {
    const result = await Promise.resolve(42);
    expect(result).toBe(42);
  });
});

// 运行测试
const runner = createRunner();
const suites = state.suites;
suites.forEach((suite) => runner.runSuite(suite));