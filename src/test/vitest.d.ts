/// <reference types="vitest" />
declare global {
  namespace Vi {
    interface JestAssertion<T = any>
      extends jest.Matchers<void, T>,
        Chai.Assertion {}
  }
}

export {}