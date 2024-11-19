export const createExpectation = <T>(actual: T) => {
  return {
    toBe: (expected: T) => {
      if (actual !== expected) {
        throw new Error(`Expected ${expected} but received ${actual}`);
      }
      return true;
    },

    toEqual: (expected: T) => {
      const isEqual = JSON.stringify(actual) === JSON.stringify(expected);
      if (!isEqual) {
        throw new Error(
          `Expected ${JSON.stringify(expected)} but received ${JSON.stringify(actual)}`
        );
      }
      return true;
    },

    toBeDefined: () => {
      if (actual === undefined) {
        throw new Error('Expected value to be defined');
      }
      return true;
    },

    toBeNull: () => {
      if (actual !== null) {
        throw new Error(`Expected null but received ${actual}`);
      }
      return true;
    }
  };
};

export const expect = <T>(actual: T) => createExpectation(actual);