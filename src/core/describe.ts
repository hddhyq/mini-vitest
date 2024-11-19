import { state } from './state';
import type { TestSuite } from './types';

export const describe = (name: string, fn: () => void) => {
  const suite: TestSuite = {
    name,
    tests: []
  };

  // 保存当前套件的引用
  const previousSuite = state.currentSuite;
  state.currentSuite = suite;

  fn();

  state.suites.push(suite);
  // 恢复之前的套件引用，支持嵌套
  state.currentSuite = previousSuite;
};