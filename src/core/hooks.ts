import { state } from './state';

export const beforeEach = (fn: () => void) => {
  if (!state.currentSuite) {
    throw new Error('beforeEach must be called within a describe block');
  }
  state.currentSuite.beforeEach = fn;
};

export const afterEach = (fn: () => void) => {
  if (!state.currentSuite) {
    throw new Error('afterEach must be called within a describe block');
  }
  state.currentSuite.afterEach = fn;
};