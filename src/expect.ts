export class Expectation<T> {
  constructor(private actual: T) {}

  toBe(expected: T) {
    if (this.actual !== expected) {
      throw new Error(`Expected ${expected} but received ${this.actual}`);
    }
  }

  toEqual(expected: T) {
    // 实现深度比较
    const isEqual = JSON.stringify(this.actual) === JSON.stringify(expected);
    if (!isEqual) {
      throw new Error(`Expected ${expected} but received ${this.actual}`);
    }
  }
}

export function expect<T>(actual: T) {
  return new Expectation(actual);
}